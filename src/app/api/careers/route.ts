import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET all careers
export async function GET() {
  try {
    const careers = await prisma.career.findMany({
      where: { isActive: true },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(careers);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch careers" }, { status: 500 });
  }
}

// POST create a career
export async function POST(request: Request) {
  try {
    const { title, location, description, isActive } = await request.json();
    const career = await prisma.career.create({
      data: { title, location, description, isActive: isActive ?? true },
    });
    return NextResponse.json(career, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create career" }, { status: 500 });
  }
}
