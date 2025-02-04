import { cn } from "@/shared/lib/utils";
import React from "react";

interface CartItemPriceProps {
  className?: string;
  price: number;
}

const CartItemPrice: React.FC<CartItemPriceProps> = ({ className, price }) => {
  return <h2 className={cn("font-bold", className)}>{price} $</h2>;
};

export default CartItemPrice;
