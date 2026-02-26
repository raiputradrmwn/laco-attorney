import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET all practice areas
export async function GET() {
  try {
    const practices = await prisma.practiceArea.findMany({
      orderBy: { order: "asc" },
    });
    return NextResponse.json(practices);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch practice areas" },
      { status: 500 }
    );
  }
}

// POST create a new practice area
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const slug = String(body.slug || "").trim();
    const icon = String(body.icon || "").trim();
    const order = Number(body.order ?? 0);
    const isActive = body.isActive !== false;

    if (!slug || !icon) {
      return NextResponse.json(
        { error: "Slug and icon are required" },
        { status: 400 }
      );
    }

    const practice = await prisma.practiceArea.create({
      data: { slug, icon, order, isActive },
    });

    return NextResponse.json(practice, { status: 201 });
  } catch (error) {
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      (error as { code?: string }).code === "P2002"
    ) {
      return NextResponse.json(
        { error: "A practice area with that slug already exists" },
        { status: 409 }
      );
    }
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    return NextResponse.json(
      { error: "Failed to create practice area" },
      { status: 500 }
    );
  }
}
