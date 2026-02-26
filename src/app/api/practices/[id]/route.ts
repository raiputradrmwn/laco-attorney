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

// PUT update a practice area
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    const slug = body.slug !== undefined ? String(body.slug).trim() : undefined;
    const icon = body.icon !== undefined ? String(body.icon).trim() : undefined;
    const order = body.order !== undefined ? Number(body.order) : undefined;
    const isActive =
      body.isActive !== undefined ? Boolean(body.isActive) : undefined;

    const updateData: Record<string, unknown> = {};
    if (slug !== undefined) updateData.slug = slug;
    if (icon !== undefined) updateData.icon = icon;
    if (order !== undefined) updateData.order = order;
    if (isActive !== undefined) updateData.isActive = isActive;

    const updated = await prisma.practiceArea.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json(updated);
  } catch (error) {
    if (hasPrismaErrorCode(error, "P2025")) {
      return NextResponse.json(
        { error: "Practice area not found" },
        { status: 404 }
      );
    }
    if (hasPrismaErrorCode(error, "P2002")) {
      return NextResponse.json(
        { error: "A practice area with that slug already exists" },
        { status: 409 }
      );
    }
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    return NextResponse.json(
      { error: "Failed to update practice area" },
      { status: 500 }
    );
  }
}

// DELETE a practice area
export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    await prisma.practiceArea.delete({ where: { id } });

    return NextResponse.json({ success: true });
  } catch (error) {
    if (hasPrismaErrorCode(error, "P2025")) {
      return NextResponse.json(
        { error: "Practice area not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { error: "Failed to delete practice area" },
      { status: 500 }
    );
  }
}
