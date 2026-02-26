export const runtime = "nodejs";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { uploadFileToImageKit } from "@/lib/imagekit";

const DEFAULT_TEAM_IMAGE =
  "https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&q=80&w=800";
const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_IMAGE_TYPES = new Set([
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
]);

function sanitizeFileName(fileName: string) {
  return fileName.replace(/[^a-zA-Z0-9._-]/g, "-").replace(/-+/g, "-");
}

async function saveTeamImage(imageFile: File) {
  if (!ALLOWED_IMAGE_TYPES.has(imageFile.type)) {
    throw new Error("Only JPG, PNG, or WEBP image files are allowed");
  }
  if (imageFile.size === 0 || imageFile.size > MAX_IMAGE_SIZE) {
    throw new Error("Image size must be between 1 byte and 5MB");
  }

  const safeOriginalName = sanitizeFileName(imageFile.name || "team-image");
  const uniqueName = `${Date.now()}-${safeOriginalName}`.replace(/\s+/g, "-");

  const uploaded = await uploadFileToImageKit({
    file: imageFile,
    fileName: uniqueName,
    folder: "/laco/team",
    tags: ["team"],
  });

  return uploaded.url;
}

async function parsePayload(request: Request) {
  const contentType = request.headers.get("content-type") || "";

  if (contentType.includes("application/json")) {
    const body = await request.json();
    return {
      name: String(body.name || "").trim(),
      role: String(body.role || "").trim(),
      specialization: body.specialization ? String(body.specialization).trim() : undefined,
      linkedin: body.linkedin ? String(body.linkedin).trim() : undefined,
      email: body.email ? String(body.email).trim() : undefined,
      bio: body.bio ? String(body.bio) : undefined,
      imageUrl: body.imageUrl ? String(body.imageUrl).trim() : undefined,
      imageFile: null as File | null,
    };
  }

  const form = await request.formData();
  const imageCandidate = form.get("image");

  return {
    name: String(form.get("name") || "").trim(),
    role: String(form.get("role") || "").trim(),
    specialization: form.get("specialization") ? String(form.get("specialization")).trim() : undefined,
    linkedin: form.get("linkedin") ? String(form.get("linkedin")).trim() : undefined,
    email: form.get("email") ? String(form.get("email")).trim() : undefined,
    bio: form.get("bio") ? String(form.get("bio")) : undefined,
    imageUrl: form.get("imageUrl") ? String(form.get("imageUrl")).trim() : undefined,
    imageFile: imageCandidate instanceof File ? imageCandidate : null,
  };
}

// GET all team members
export async function GET() {
  try {
    const team = await prisma.team.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(team);
  } catch {
    return NextResponse.json({ error: "Failed to fetch team members" }, { status: 500 });
  }
}

// POST create a new team member
export async function POST(request: Request) {
  try {
    const { name, role, specialization, linkedin, email, bio, imageUrl, imageFile } =
      await parsePayload(request);

    if (!name || !role) {
      return NextResponse.json({ error: "Name and role are required" }, { status: 400 });
    }

    const savedImageUrl = imageFile
      ? await saveTeamImage(imageFile)
      : imageUrl || DEFAULT_TEAM_IMAGE;

    const member = await prisma.team.create({
      data: { name, role, specialization, linkedin, email, bio, imageUrl: savedImageUrl },
    });

    return NextResponse.json(member, { status: 201 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    return NextResponse.json({ error: "Failed to create team member" }, { status: 500 });
  }
}
