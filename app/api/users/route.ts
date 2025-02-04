import { prisma } from "@/prisma/prisma-clent";
import { User } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const users = await prisma.user.findMany();
  return NextResponse.json(users);
}

export async function POST(req: NextRequest) {
  const body = (await req.json()) as User;
  const user = await prisma.user.create({
    data: body,
  });
  return NextResponse.json(user);
}
