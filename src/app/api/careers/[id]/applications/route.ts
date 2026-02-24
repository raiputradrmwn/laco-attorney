import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { mkdir, writeFile } from "fs/promises";
import path from "path";

const MAX_CV_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_MIME_TYPES = new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
]);
const ALLOWED_EXTENSIONS = new Set([".pdf", ".doc", ".docx"]);

function sanitizeFileName(fileName: string) {
  return fileName.replace(/[^a-zA-Z0-9._-]/g, "-").replace(/-+/g, "-");
}

function getExtension(file: File) {
  const nameExt = path.extname(file.name || "").toLowerCase();
  if (nameExt) return nameExt;

  if (file.type === "application/pdf") return ".pdf";
  if (file.type === "application/msword") return ".doc";
  if (
    file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  ) {
    return ".docx";
  }

  return "";
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const applications = await prisma.careerApplication.findMany({
      where: { careerId: id },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(applications, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch career applications" },
      { status: 500 }
    );
  }
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const career = await prisma.career.findUnique({ where: { id } });

    if (!career || !career.isActive) {
      return NextResponse.json(
        { error: "Career is not available for application" },
        { status: 404 }
      );
    }

    const formData = await request.formData();
    const fullName = String(formData.get("fullName") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const phone = String(formData.get("phone") || "").trim();
    const coverLetter = String(formData.get("coverLetter") || "").trim();
    const cvFile = formData.get("cv");

    if (!fullName || !email) {
      return NextResponse.json(
        { error: "Full name and email are required" },
        { status: 400 }
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 });
    }

    if (!(cvFile instanceof File)) {
      return NextResponse.json(
        { error: "CV file is required" },
        { status: 400 }
      );
    }

    const extension = getExtension(cvFile);
    const isAllowedFileType =
      ALLOWED_MIME_TYPES.has(cvFile.type) || ALLOWED_EXTENSIONS.has(extension);

    if (!isAllowedFileType) {
      return NextResponse.json(
        { error: "Only PDF, DOC, or DOCX files are allowed" },
        { status: 400 }
      );
    }

    if (cvFile.size === 0 || cvFile.size > MAX_CV_SIZE) {
      return NextResponse.json(
        { error: "CV file size must be between 1 byte and 5MB" },
        { status: 400 }
      );
    }

    const uploadDir = path.join(process.cwd(), "public", "uploads", "cv");
    await mkdir(uploadDir, { recursive: true });

    const safeOriginalName = sanitizeFileName(cvFile.name || "cv");
    const timeTag = Date.now();
    const uniqueName = `${timeTag}-${safeOriginalName}`;
    const filePath = path.join(uploadDir, uniqueName);

    const bytes = await cvFile.arrayBuffer();
    const buffer = Buffer.from(bytes);
    await writeFile(filePath, buffer);

    const cvUrl = `/uploads/cv/${uniqueName}`;
    const application = await prisma.careerApplication.create({
      data: {
        careerId: id,
        fullName,
        email,
        phone: phone || null,
        coverLetter: coverLetter || null,
        cvUrl,
        cvFileName: cvFile.name || uniqueName,
      },
    });

    return NextResponse.json(application, { status: 201 });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2003") {
      return NextResponse.json({ error: "Career not found" }, { status: 404 });
    }

    return NextResponse.json(
      { error: "Failed to submit career application" },
      { status: 500 }
    );
  }
}
