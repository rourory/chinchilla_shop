"use client";

import React from "react";

import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/shared/components/ui/sheet";
import Link from "next/link";
import { Button } from "@/shared/components/ui/button";
import { ArrowRight } from "lucide-react";
import CartDrawerItem from "../../molecules/CartDrawerItem";
import { cn } from "@/shared/lib/utils";
import Title from "../../atoms/Title";
import { useCart } from "@/shared/hooks/use-cart";

interface CartDrawerProp {
  className?: string;
}

const CartDrawer: React.FC<React.PropsWithChildren<CartDrawerProp>> = ({
  children,
  className,
}) => {
  const [redirecting, setRedirecting] = React.useState(false);

  const {
    cartItems,
    removeCartItem,
    removeCartItemExtraOption,
    onUpdateQuantity,
    totalAmount
  } = useCart();

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>

      <SheetContent className="flex flex-col justify-between pb-0 bg-secondary">
        <SheetHeader>
          <SheetTitle>
            {cartItems != undefined && cartItems.length !== 0 && (
              <>
                There are{" "}
                <span className="font-bold">
                  {cartItems?.length || 0} items
                </span>{" "}
                in your cart
              </>
            )}
          </SheetTitle>
        </SheetHeader>
        <div
          className={cn(
            "-mx-3 mt-5 overflow-auto flex-1",
            cartItems?.length === 0 && "content-center pb-20",
          )}
        >
          {(cartItems === undefined || cartItems?.length === 0) && (
            <div className="flex flex-col items-center justify-center w-72 mx-auto">
              <img src="/empty-box.png" alt="Empty cart" />
              <Title
                size="sm"
                className="text-center font-bold my-2"
                text="Your cart is empty"
              />
              <p className="text-center text-neutral-500">
                {"There isn't any item in your cart."}
              </p>
              <p className="text-center text-neutral-500 mb-5">
                {"Add at leats one product to your cart"}
              </p>
            </div>
          )}
          {cartItems?.map((item) => (
            <CartDrawerItem
              id={item.id}
              key={item.id}
              onUpdateQuantity={onUpdateQuantity}
              onDelete={removeCartItem}
              onDeleteOption={removeCartItemExtraOption}
              productVariation={item.productItem}
              quantity={item.quantity}
              extraOptions={item.extraOptions}
            />
          ))}
        </div>
        <SheetFooter
          className={cn(
            "-mx-6 bg-white p-8",
            (cartItems === undefined || cartItems?.length === 0) && "hidden",
          )}
        >
          <div className="w-full">
            <div className="flex mb-4">
              <span className="flex flex-1 text-lg text-neutral-500">
                Total
                <div className="flex-1 border-b border-dashed bodrer-b-neutral-200 relative -top-1 mx-2" />
              </span>
              <span className="font-bold text-lg">{totalAmount} $</span>
            </div>
            <Link href={"/checkout"}>
              <Button
                onClick={() => setRedirecting(true)}
                loading={redirecting}
                type="submit"
                className="w-full h-12 text-base"
              >
                Order
                <ArrowRight className="w-5 ml-2" />
              </Button>
            </Link>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default CartDrawer;
