import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { randomUUID } from "crypto";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const news = await prisma.news.findUnique({
      where: { slug: decodeURIComponent(slug) },
    });

    if (!news) {
      return NextResponse.json({ error: "News not found" }, { status: 404 });
    }

    try {
      await prisma.$executeRaw`
        INSERT INTO "NewsView" ("id", "newsId", "viewedAt")
        VALUES (${randomUUID()}, ${news.id}, NOW())
      `;
    } catch (error) {
      console.error("Failed to track news view", error);
    }

    return NextResponse.json(news, { status: 200 });
  } catch {
    return NextResponse.json({ error: "Failed to fetch news detail" }, { status: 500 });
  }
}
