"use client";
import React from "react";
import { X } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import CartItemImage from "../../atoms/CartItem/CartItemImage";
import CartItemInfo from "../../atoms/CartItem/CartItemInfo";
import CartItemPrice from "../../atoms/CartItem/CartItemPrice";
import { CountButton, CountButtonProps } from "../CountButton";
import { CartItemInfoProps } from "../CartDrawerItem";
import { useCalculatedPrice } from "@/shared/hooks/use-calculated-price";

interface Props extends CartItemInfoProps {
  onClickRemove: () => void;
  onClickCountButton: CountButtonProps["onClickCountButton"];
  onDeleteOption?: (cartItemId: number, optionId: number) => void;
  className?: string;
}

const CheckoutCartItem: React.FC<Props> = ({
  id,
  productVariation,
  extraOptions,
  quantity,
  className,
  onClickCountButton,
  onClickRemove,
  onDeleteOption,
}) => {
  const price = useCalculatedPrice(
    productVariation.price,
    quantity,
    extraOptions || [],
  );

  return (
    <div className={cn("flex items-center justify-between", className)}>
      <div className="flex items-center gap-5 flex-1">
        <CartItemImage src={productVariation.imageUrl} />
        <CartItemInfo
          itemName={productVariation.variationName || ""}
          onDeleteOption={(optionId) => onDeleteOption?.(id, optionId)}
          extraOptions={extraOptions}
        />
      </div>
      <CartItemPrice price={price} />
      <div className="flex items-center gap-5 ml-20">
        <CountButton
          onClickCountButton={onClickCountButton}
          quantity={quantity}
        />
        <button onClick={onClickRemove} type="button">
          <X
            className="text-gray-400 cursor-pointer hover:text-gray-600"
            size={20}
          />
        </button>
      </div>
    </div>
  );
};

export default CheckoutCartItem;
