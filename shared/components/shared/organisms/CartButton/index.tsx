"use client";
import { Button } from "@/shared/components/ui/button";
import { cn } from "@/shared/lib/utils";
import { ArrowRight, Loader2, ShoppingCart } from "lucide-react";
import React from "react";
import CartDrawer from "../CartDrawer";
import { useCartStore } from "@/shared/store/cart";
import { useCart } from "@/shared/hooks/use-cart";

interface CartButtonProp {
  className?: string;
}

const CartButton: React.FC<CartButtonProp> = ({ className }) => {
  const { loading } = useCartStore();

  const { totalAmount, totalQuantity } = useCart();

  return (
    <CartDrawer className={cn("", className)}>
      <Button className={cn("group relative", { "w-[115px]": loading })}>
        {!loading ? (
          <b>{totalAmount}$</b>
        ) : (
          <>
            <Loader2 className="animate-spin" />$
          </>
        )}
        <span className="h-full w-[1px] bg-white/30 max-3" />
        <div className="flex items-center gap-1 transition duration-300 group-hover:opacity-0">
          <ShoppingCart size={16} className="relative" strokeWidth={2} />
          {!loading ? (
            <b>{totalQuantity}</b>
          ) : (
            <Loader2 className="animate-spin" />
          )}
        </div>
        <ArrowRight
          size={20}
          className="absolute right-5 transition duration-300 -translate-x-5 opacity-0 group-hover:opacity-100 group-hover:-translate-x-1"
        />
      </Button>
    </CartDrawer>
  );
};

export default CartButton;
