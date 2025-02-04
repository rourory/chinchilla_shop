import { prisma } from "@/prisma/prisma-clent";
import { NextResponse } from "next/server";

export async function GET() {
  const extraOptions = await prisma.extraOption.findMany();
  return NextResponse.json(extraOptions);
}
