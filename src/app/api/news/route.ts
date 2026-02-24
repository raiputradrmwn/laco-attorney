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

async function createUniqueSlug(title: string, requestedSlug?: string) {
  const baseSlug = createSlug(requestedSlug || title) || `news-${Date.now()}`;
  let slug = baseSlug;
  let counter = 1;

  while (true) {
    const existing = await prisma.news.findUnique({ where: { slug } });

    if (!existing) return slug;

    slug = `${baseSlug}-${counter}`;
    counter += 1;
  }
}

// GET all news
export async function GET() {
  try {
    const news = await prisma.news.findMany({
      orderBy: { publishedAt: "desc" },
    });
    return NextResponse.json(news);
  } catch {
    return NextResponse.json({ error: "Failed to fetch news" }, { status: 500 });
  }
}

// POST create news
export async function POST(request: Request) {
  try {
    const { title, category, slug, imageUrl, content } = await request.json();

    if (!title || !content) {
      return NextResponse.json(
        { error: "Title and content are required" },
        { status: 400 }
      );
    }

    const uniqueSlug = await createUniqueSlug(title, slug);
    const newsItem = await prisma.news.create({
      data: {
        title,
        category: category || "General",
        slug: uniqueSlug,
        imageUrl: imageUrl || DEFAULT_NEWS_IMAGE,
        content,
      },
    });

    return NextResponse.json(newsItem, { status: 201 });
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return NextResponse.json(
        { error: "News slug already exists, please try another title" },
        { status: 409 }
      );
    }

    return NextResponse.json({ error: "Failed to create news" }, { status: 500 });
  }
}
