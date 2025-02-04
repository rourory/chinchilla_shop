import { ExtraOption } from "@prisma/client";
import React from "react";

export const useCalculatedPrice = (
  price: number,
  quantity: number,
  extraOptions: ExtraOption[],
) => {
  return React.useMemo(() => {
    let total = price * quantity;
    extraOptions.forEach((option) => {
      total += option.price * quantity;
    });
    return total;
  }, [price, extraOptions, quantity]);
};
