"use server";

import { prisma } from "@/prisma/prisma-clent";
import { CheckoutFormSchemaType } from "@/shared/components/form/schemas/checkout-form-schema";
import { OrderStatus } from "@prisma/client";
import { cookies } from "next/headers";

export async function createOrder(data: CheckoutFormSchemaType) {
  try {
    const cookieStore = cookies();
    const cartToken = cookieStore.get("cartToken")?.value;

    if (!cartToken) throw new Error("Cart token not found");

    const userCart = await prisma.cart.findFirst({
      include: {
        user: true,
        cartItem: {
          include: {
            extraOptions: true,
            productItem: {
              include: {
                product: true,
              },
            },
          },
        },
      },
      where: {
        token: cartToken,
      },
    });
    if (!userCart) throw new Error("Cart not found");
    if (userCart?.cartItem.length == 0) throw new Error("Cart is empty");

    await prisma.order.create({
      data: {
        fullName: data.lastName + " " + data.firstName,
        email: data.email,
        address: data.address,
        phone: data.phone,
        comment: data.comment || "",
        token: cartToken,
        totalAmount: data.totalAmount,
        status: OrderStatus.PENDING,
        items: JSON.stringify(userCart.cartItem),
        userId: userCart.user?.id,
      },
    });

    await prisma.cartItem.deleteMany({
      where: {
        cartId: userCart.id,
      },
    });


  } catch (error) {}

  return "https://ik3mag.by/";
}

//re_BricmpPA_4zNLS8EkjX8pM36upm3U4JXP
