import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET all careers
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const includeAll = searchParams.get("all") === "true";
    const includeApplications = searchParams.get("includeApplications") === "true";

    const careers = await prisma.career.findMany({
      where: includeAll ? undefined : { isActive: true },
      orderBy: { createdAt: "desc" },
      include: includeApplications
        ? {
            applications: {
              orderBy: { createdAt: "desc" },
            },
            _count: {
              select: { applications: true },
            },
          }
        : {
            _count: {
              select: { applications: true },
            },
          },
    });

    return NextResponse.json(careers);
  } catch {
    return NextResponse.json({ error: "Failed to fetch careers" }, { status: 500 });
  }
}

// POST create a career
export async function POST(request: Request) {
  try {
    const { title, department, location, description, isActive } = await request.json();

    if (!title || !location) {
      return NextResponse.json(
        { error: "Title and location are required" },
        { status: 400 }
      );
    }

    const career = await prisma.career.create({
      data: {
        title,
        department: department || null,
        location,
        description: description || null,
        isActive: isActive ?? true,
      },
      include: {
        _count: {
          select: { applications: true },
        },
      },
    });

    return NextResponse.json(career, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed to create career" }, { status: 500 });
  }
}
