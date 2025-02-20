"use client";

import { SearchParams } from "@/shared/lib/findProducts";
import { ApiClients } from "@/shared/services/api-clients";
import React from "react";
import toast from "react-hot-toast";

interface PayConfirmatorProps {
  searchParams: SearchParams;
}
const PayConfirmator: React.FC<PayConfirmatorProps> = ({ searchParams }) => {
  const { payResult, orderId } = searchParams;

  React.useEffect(() => {
    if (payResult === "succeeded" && orderId) {
      ApiClients.checkout
        .confirmPaidOrder(orderId, payResult)
        .then((status) => {
          if (status === 200) {
            toast.success("Congratulations! Your order was paid successfully", {
              icon: "🎉",
            });
          }
        });
    }
  }, []);

  return <></>;
};

export default PayConfirmator;
