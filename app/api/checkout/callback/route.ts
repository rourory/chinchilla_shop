import { PaymentCallbackData } from "@/@types/yookassa";
import { prisma } from "@/prisma/prisma-clent";
import { ThankForPayTemplate } from "@/shared/components/email/thank-for-pay-template";
import { sendEmail } from "@/shared/lib/send-email";
import { ICartItem } from "@/shared/store/cart";
import { OrderStatus } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as PaymentCallbackData;
    const order = await prisma.order.findFirst({
      where: {
        id: Number(body.object.metadata.order_id),
      },
    });

    if (!order) {
      throw new Error("Order not found");
    }

    const isSucceded = body.object.status === "succeeded";

    await prisma.order.update({
      where: {
        id: order.id,
      },
      data: {
        status: isSucceded ? OrderStatus.SUCCEEDED : OrderStatus.CANCELLED,
      },
    });

    const items = JSON.parse(order.items as string) as ICartItem[];

    if (isSucceded) {
      await sendEmail({
        address: order.email,
        subject: "Chichilla shop | Order has been paid",
        template: ThankForPayTemplate({ orderId: order.id, items: items }),
      });
    }

    return new NextResponse("OK", { status: 200 });
  } catch (error) {
    console.log("[CHECKOUT_CALLBACK] Something went wrong", error);
    return new NextResponse("Something went wrong", { status: 500 });
  }
}
