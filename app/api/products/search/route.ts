import { prisma } from "@/prisma/prisma-clent";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const query = req.nextUrl.searchParams.get("query") || "";

  const products = await prisma.product.findMany({
    where: {
      productName: {
        contains: query,
        mode: "insensitive",
      },
    },
    include: {
      productVariation: true,
    },
    take: 5,
  });
  return NextResponse.json(products);
}
