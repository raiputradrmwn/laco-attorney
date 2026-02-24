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

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    await prisma.team.delete({
      where: { id },
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    if (hasPrismaErrorCode(error, "P2025")) {
      return NextResponse.json({ error: "Team member not found" }, { status: 404 });
    }

    return NextResponse.json({ error: "Failed to delete team member" }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { name, role, specialization, linkedin, email, bio, imageUrl } = await request.json();

    const updatedMember = await prisma.team.update({
      where: { id },
      data: { name, role, specialization, linkedin, email, bio, imageUrl },
    });

    return NextResponse.json(updatedMember, { status: 200 });
  } catch (error) {
    if (hasPrismaErrorCode(error, "P2025")) {
      return NextResponse.json({ error: "Team member not found" }, { status: 404 });
    }

    return NextResponse.json({ error: "Failed to update team member" }, { status: 500 });
  }
}
