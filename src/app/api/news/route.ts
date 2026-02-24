import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET all news
export async function GET() {
  try {
    const news = await prisma.news.findMany({
      orderBy: { publishedAt: "desc" },
    });
    return NextResponse.json(news);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch news" }, { status: 500 });
  }
}

// POST create news
export async function POST(request: Request) {
  try {
    const { title, category, slug, imageUrl, content } = await request.json();
    const newsItem = await prisma.news.create({
      data: { title, category, slug, imageUrl, content },
    });
    return NextResponse.json(newsItem, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create news" }, { status: 500 });
  }
}
