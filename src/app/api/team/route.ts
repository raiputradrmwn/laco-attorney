import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET all team members
export async function GET() {
  try {
    const team = await prisma.team.findMany();
    return NextResponse.json(team);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch team members" }, { status: 500 });
  }
}

// POST create a new team member
export async function POST(request: Request) {
  try {
    const { name, role, bio, imageUrl } = await request.json();
    const member = await prisma.team.create({
      data: { name, role, bio, imageUrl },
    });
    return NextResponse.json(member, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create team member" }, { status: 500 });
  }
}
