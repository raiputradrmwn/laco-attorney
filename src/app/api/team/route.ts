import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET all team members
export async function GET() {
  try {
    const team = await prisma.team.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(team);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch team members" }, { status: 500 });
  }
}

// POST create a new team member
export async function POST(request: Request) {
  try {
    const { name, role, specialization, linkedin, email, bio, imageUrl } = await request.json();
    const member = await prisma.team.create({
      data: { name, role, specialization, linkedin, email, bio, imageUrl: imageUrl || "https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&q=80&w=800" },
    });
    return NextResponse.json(member, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create team member" }, { status: 500 });
  }
}
