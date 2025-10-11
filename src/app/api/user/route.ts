import { NextResponse } from "next/server";
import { prisma } from "../../lib/prisma";

export async function GET() {
  const users = await prisma.user.findMany();
  return NextResponse.json(users);
}

export async function POST(request: Request) {
  const body = await request.json();
  return NextResponse.json({ recebido: body });
}