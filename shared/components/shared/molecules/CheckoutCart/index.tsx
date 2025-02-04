"use client";

import React from "react";
import { WhiteBlock } from "../../organisms/WhiteBlock";
import CheckoutCartItem from "../CheckoutCartItem";
import { useCart } from "@/shared/hooks/use-cart";
import { Skeleton } from "@/shared/components/ui/skeleton";
import CartItemDivider from "../../atoms/CartItemDivider";

const CheckoutCart = () => {
  const {
    cartItems,
    removeCartItem,
    removeCartItemExtraOption,
    onUpdateQuantity,
  } = useCart();

  return (
    <WhiteBlock title="1. Cart">
      <div className="flex flex-col gap-5">
        {cartItems && cartItems.length > 0
          ? cartItems?.map((item, index) => (
              <React.Fragment key={item.id}>
                <CheckoutCartItem
                  id={item.id}
                  onClickRemove={() => removeCartItem(item.id)}
                  onDeleteOption={removeCartItemExtraOption}
                  productVariation={item.productItem}
                  quantity={item.quantity}
                  extraOptions={item.extraOptions}
                  onClickCountButton={(type) => {
                    if (type === "plus") {
                      onUpdateQuantity(item.id, item.quantity + 1);
                    } else {
                      onUpdateQuantity(item.id, item.quantity - 1);
                    }
                  }}
                />
                {index < cartItems.length - 1 && (
                  <CartItemDivider key={`${item.id}.divider`} />
                )}
              </React.Fragment>
            ))
          : [1, 2, 3].map((v, i) => (
              <>
                <Skeleton key={i} className="h-[64px]" />
                {i < 2 && <CartItemDivider key={`${i}.divider`} />}
              </>
            ))}
      </div>
    </WhiteBlock>
  );
};

export default CheckoutCart;
