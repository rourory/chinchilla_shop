"use server";

import { PayOrderTemplate } from "./../shared/components/email/pay-order-template";
import { prisma } from "@/prisma/prisma-clent";
import { ConfirmAccountTemplate } from "@/shared/components/email/confirm-account-template";
import { CheckoutFormSchemaType } from "@/shared/components/form/schemas/checkout-form-schema";
import { createPayment } from "@/shared/lib/create-payment";
import { getUserSession } from "@/shared/lib/get-user-session";
import { sendEmail } from "@/shared/lib/send-email";
import { OrderStatus, Prisma } from "@prisma/client";
import { hashSync } from "bcrypt";
import { cookies } from "next/headers";

export async function createOrder(
  data: CheckoutFormSchemaType,
  totalAmount: number,
) {
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

    const order = await prisma.order.create({
      data: {
        fullName: data.lastName + " " + data.firstName,
        email: data.email,
        address: data.address,
        phone: data.phone,
        comment: data.comment || "",
        token: cartToken,
        totalAmount: totalAmount,
        status: OrderStatus.PENDING,
        items: JSON.stringify(userCart.cartItem),
        userId: userCart.user?.id,
      },
    });

    const paymentData = await createPayment({
      amount: totalAmount,
      description: `Order #${order.id}`,
      orderId: order.id.toString(),
      emailAddress: data.email,
    });

    if (!paymentData) throw new Error("Payment data not found");
    await prisma.cartItem.deleteMany({
      where: {
        cartId: userCart.id,
      },
    });

    await prisma.order.update({
      where: {
        id: order.id,
      },
      data: {
        paymentId: paymentData.id,
      },
    });

    const paymentUrl = paymentData.confirmation.confirmation_url;

    await sendEmail({
      address: data.email,
      subject: `Chinchilla Shop | Pay for the order #${order.id}`,
      template: PayOrderTemplate({
        orderId: order.id,
        totalAmount: totalAmount,
        paymentUrl: paymentUrl,
      }),
    });

    return paymentUrl;
  } catch (error) {
    console.log(`Server error while creating order`, error);
  }
}

export async function updateUserInfo(body: Prisma.UserUpdateInput) {
  try {
    const session = await getUserSession();
    if (!session) throw new Error("Unauthorized");

    const currentUser = await prisma.user.findFirst({
      where: {
        id: Number(session.id),
      },
    });

    if (!currentUser) throw new Error("User not found");

    await prisma.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        fullName: body.fullName,
        email: body.email,
        password: body.password
          ? hashSync(body.password as string, 10)
          : currentUser.password,
        phone: body.phone,
      },
    });
  } catch (error) {
    console.error("Error [UPDATE_USER]", error);
    throw error;
  }
}

export async function createUser(body: Prisma.UserCreateInput) {
  try {
    const user = await prisma.user.findFirst({
      where: {
        email: body.email,
      },
    });

    if (user) {
      if (!user.verified) {
        throw new Error("User is not verified");
      }

      throw new Error("User already exists");
    }

    const newUser = await prisma.user.create({
      data: {
        fullName: body.fullName,
        email: body.email,
        password: hashSync(body.password as string, 10),
        role: "USER",
        phone: body.phone,
      },
    });

    const code = Math.floor(100000 + Math.random() * 900000).toString();

    const verificationCode = await prisma.verificationCode.create({
      data: {
        code: code,
        userId: newUser.id,
      },
    });

    await sendEmail({
      address: body.email,
      subject: "Chinchilla Shop | Verify your email",
      template: ConfirmAccountTemplate({
        code: verificationCode.code,
        href: `http://192.168.95.13:3000/api/verify/?code=${verificationCode.code}`,
      }),
    });
  } catch (error) {
    console.log("Error [CREATE_USER]", error);
    throw error;
  }
}
