import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { mkdir, writeFile } from "fs/promises";
import path from "path";

const DEFAULT_NEWS_IMAGE =
  "/uploads/news/default-news.jpg";
const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_IMAGE_TYPES = new Set([
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
]);

function createSlug(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

async function createUniqueSlug(title: string, requestedSlug?: string, excludeId?: string) {
  const baseSlug = createSlug(requestedSlug || title) || `news-${Date.now()}`;
  let slug = baseSlug;
  let counter = 1;

  while (true) {
    const existing = await prisma.news.findUnique({ where: { slug } });

    if (!existing || existing.id === excludeId) return slug;

    slug = `${baseSlug}-${counter}`;
    counter += 1;
  }
}

type ParsedNewsPayload = {
  title: string;
  category: string;
  slug?: string;
  content: string;
  imageUrl?: string;
  imageFile?: File | null;
};

function sanitizeFileName(fileName: string) {
  return fileName.replace(/[^a-zA-Z0-9._-]/g, "-").replace(/-+/g, "-");
}

async function saveNewsImage(imageFile: File) {
  if (!ALLOWED_IMAGE_TYPES.has(imageFile.type)) {
    throw new Error("Only JPG, PNG, or WEBP image files are allowed");
  }

  if (imageFile.size === 0 || imageFile.size > MAX_IMAGE_SIZE) {
    throw new Error("Image size must be between 1 byte and 5MB");
  }

  const uploadDir = path.join(process.cwd(), "public", "uploads", "news");
  await mkdir(uploadDir, { recursive: true });

  const safeOriginalName = sanitizeFileName(imageFile.name || "news-image");
  const uniqueName = `${Date.now()}-${safeOriginalName}`;
  const outputPath = path.join(uploadDir, uniqueName);

  const bytes = await imageFile.arrayBuffer();
  await writeFile(outputPath, Buffer.from(bytes));

  return `/uploads/news/${uniqueName}`;
}

async function parsePayload(request: Request): Promise<ParsedNewsPayload> {
  const contentType = request.headers.get("content-type") || "";

  if (contentType.includes("application/json")) {
    const body = await request.json();
    return {
      title: String(body.title || "").trim(),
      category: String(body.category || "General").trim(),
      slug: body.slug ? String(body.slug).trim() : undefined,
      content: String(body.content || ""),
      imageUrl: body.imageUrl ? String(body.imageUrl).trim() : undefined,
      imageFile: null,
    };
  }

  const form = await request.formData();
  const imageCandidate = form.get("image");

  return {
    title: String(form.get("title") || "").trim(),
    category: String(form.get("category") || "General").trim(),
    slug: form.get("slug") ? String(form.get("slug")).trim() : undefined,
    content: String(form.get("content") || ""),
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

    await prisma.news.delete({
      where: { id },
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2025") {
      return NextResponse.json({ error: "News not found" }, { status: 404 });
    }

    return NextResponse.json({ error: "Failed to delete news" }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { title, category, slug, imageUrl, content, imageFile } = await parsePayload(request);

    if (!title || !content) {
      return NextResponse.json(
        { error: "Title and content are required" },
        { status: 400 }
      );
    }

    const uniqueSlug = await createUniqueSlug(title, slug, id);
    const currentNews = await prisma.news.findUnique({ where: { id } });
    const nextImageUrl = imageFile
      ? await saveNewsImage(imageFile)
      : imageUrl || currentNews?.imageUrl || DEFAULT_NEWS_IMAGE;

    const updatedNews = await prisma.news.update({
      where: { id },
      data: {
        title,
        category: category || "General",
        slug: uniqueSlug,
        imageUrl: nextImageUrl,
        content,
      },
    });

    return NextResponse.json(updatedNews, { status: 200 });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2025") {
      return NextResponse.json({ error: "News not found" }, { status: 404 });
    }

    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ error: "Failed to update news" }, { status: 500 });
  }
}
