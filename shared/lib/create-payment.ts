import { PaymentData } from "@/@types/yookassa";
import axios from "axios";

interface CreatePaymentProps {
  amount: number;
  description: string;
  orderId: string;
  emailAddress: string;
}

export async function createPayment(details: CreatePaymentProps) {
  const { data } = await axios.post<PaymentData>(
    "https://api.yookassa.ru/v3/payments",
    {
      amount: {
        value: details.amount,
        currency: "RUB",
      },
      capture: true,
      description: details.description,
      metadata: {
        order_id: details.orderId,
        email_address: details.emailAddress,
      },
      confirmation: {
        type: "redirect",
        return_url: `${process.env.YOOKASSA_REDIRECT_URL}&orderId=${details.orderId}`,
      },
    },
    {
      auth: {
        username: process.env.YOOKASSA_STORE_ID || "",
        password: process.env.YOOKASSA_API_KEY as string,
      },
      headers: {
        "Content-Type": "application/json",
        "Idempotence-Key": Math.random().toString(36).substring(7),
      },
    },
  );

  return data;
}
