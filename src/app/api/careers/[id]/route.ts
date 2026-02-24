import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

function hasPrismaErrorCode(error: unknown, code: string) {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    (error as { code?: string }).code === code
  );
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { title, department, location, description, isActive } = await request.json();

    if (!title || !location) {
      return NextResponse.json(
        { error: "Title and location are required" },
        { status: 400 }
      );
    }

    const updatedCareer = await prisma.career.update({
      where: { id },
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

    return NextResponse.json(updatedCareer, { status: 200 });
  } catch (error) {
    if (hasPrismaErrorCode(error, "P2025")) {
      return NextResponse.json({ error: "Career not found" }, { status: 404 });
    }

    return NextResponse.json({ error: "Failed to update career" }, { status: 500 });
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    await prisma.career.delete({
      where: { id },
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    if (hasPrismaErrorCode(error, "P2025")) {
      return NextResponse.json({ error: "Career not found" }, { status: 404 });
    }

    return NextResponse.json({ error: "Failed to delete career" }, { status: 500 });
  }
}
