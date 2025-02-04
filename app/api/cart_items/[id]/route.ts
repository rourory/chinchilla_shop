import { prisma } from "@/prisma/prisma-clent";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const id = Number(params.id);
    const token = req.cookies.get("cartToken")?.value;
    const data = (await req.json()) as { quantity: number };

    if (!token) {
      return NextResponse.json({ error: "Cart token not found" });
    }

    const cartItem = await prisma.cartItem.findFirst({
      where: {
        id,
      },
    });

    if (!cartItem) {
      return NextResponse.json({ error: "Cart item not found" });
    }

    const updatedCartItem = await prisma.cartItem.update({
      where: { id },
      data: { quantity: data.quantity },
      include: {
        productItem: { include: { product: true } },
        extraOptions: true,
      },
    });

    return NextResponse.json(updatedCartItem);
  } catch (error) {
    console.log("[USER_CART_PATCH] Something went wrong", error);
    return NextResponse.json(
      { message: "Something went wrong :(" },
      { status: 500 },
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const id = Number(params.id);
    const token = req.cookies.get("cartToken")?.value;

    if (!token) {
      return NextResponse.json({ error: "Cart token not found" });
    }

    await prisma.cartItem.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Item deleted successfully" });
  } catch (error) {
    console.log("[USER_CART_DELETE] Something went wrong", error);
    return NextResponse.json(
      { message: "Something went wrong :(" },
      { status: 500 },
    );
  }
}
