import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { uploadFileToImageKit } from "@/lib/imagekit";

const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_IMAGE_TYPES = new Set([
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
]);

function hasPrismaErrorCode(error: unknown, code: string) {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    (error as { code?: string }).code === code
  );
}

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

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    await prisma.team.delete({
      where: { id },
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    if (hasPrismaErrorCode(error, "P2025")) {
      return NextResponse.json({ error: "Team member not found" }, { status: 404 });
    }

    return NextResponse.json({ error: "Failed to delete team member" }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { name, role, specialization, linkedin, email, bio, imageUrl, imageFile } =
      await parsePayload(request);

    if (!name || !role) {
      return NextResponse.json({ error: "Name and role are required" }, { status: 400 });
    }

    // Only update imageUrl if a new file is uploaded or a new URL is provided
    const newImageUrl = imageFile ? await saveTeamImage(imageFile) : imageUrl;

    const updateData: Record<string, unknown> = {
      name,
      role,
      specialization,
      linkedin,
      email,
      bio,
    };

    if (newImageUrl !== undefined) {
      updateData.imageUrl = newImageUrl;
    }

    const updatedMember = await prisma.team.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json(updatedMember, { status: 200 });
  } catch (error) {
    if (hasPrismaErrorCode(error, "P2025")) {
      return NextResponse.json({ error: "Team member not found" }, { status: 404 });
    }

    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ error: "Failed to update team member" }, { status: 500 });
  }
}
