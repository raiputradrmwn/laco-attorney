import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

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

    return NextResponse.json(news, { status: 200 });
  } catch {
    return NextResponse.json({ error: "Failed to fetch news detail" }, { status: 500 });
  }
}
