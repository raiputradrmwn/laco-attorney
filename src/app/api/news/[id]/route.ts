import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

const DEFAULT_NEWS_IMAGE =
  "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=1600";

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
    const { title, category, slug, imageUrl, content } = await request.json();

    if (!title || !content) {
      return NextResponse.json(
        { error: "Title and content are required" },
        { status: 400 }
      );
    }

    const uniqueSlug = await createUniqueSlug(title, slug, id);
    const updatedNews = await prisma.news.update({
      where: { id },
      data: {
        title,
        category: category || "General",
        slug: uniqueSlug,
        imageUrl: imageUrl || DEFAULT_NEWS_IMAGE,
        content,
      },
    });

    return NextResponse.json(updatedNews, { status: 200 });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2025") {
      return NextResponse.json({ error: "News not found" }, { status: 404 });
    }

    return NextResponse.json({ error: "Failed to update news" }, { status: 500 });
  }
}
