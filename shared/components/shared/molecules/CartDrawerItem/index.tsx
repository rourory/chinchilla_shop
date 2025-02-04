import { cn } from "@/shared/lib/utils";
import React from "react";
import { CountButton } from "../CountButton";
import CartItemImage from "@/shared/components/shared/atoms/CartItem/CartItemImage";
import { ExtraOption, ProductVariation } from "@prisma/client";
import CartItemInfo from "../../atoms/CartItem/CartItemInfo";
import { Trash2Icon } from "lucide-react";
import CartItemPrice from "@/shared/components/shared/atoms/CartItem/CartItemPrice";
import { useCalculatedPrice } from "@/shared/hooks/use-calculated-price";

export interface CartItemInfoProps {
  id: number;
  quantity: number;
  extraOptions?: ExtraOption[];
  productVariation: ProductVariation;
}

interface CartDrawerItemProps extends CartItemInfoProps {
  onUpdateQuantity: (id: number, quantity: number) => void;
  onDelete: (id: number) => void;
  onDeleteOption?: (cartItemId: number, optionId: number) => void;
  className?: string;
}

const CartDrawerItem: React.FC<CartDrawerItemProps> = ({
  id,
  productVariation,
  quantity,
  extraOptions = [],
  onUpdateQuantity,
  onDelete,
  onDeleteOption,
  className,
}) => {

  const price = useCalculatedPrice(productVariation.price, quantity, extraOptions)

  // const price = React.useMemo(() => {
  //   let price = productVariation.price * quantity;
  //   extraOptions.forEach((option) => {
  //     price += option.price * quantity;
  //   });
  //   return price;
  // }, [productVariation, extraOptions, quantity]);

  return (
    <div className={cn("flex bg-white p-5 gap-6 rounded-sm mb-3", className)}>
      <CartItemImage src={productVariation.imageUrl} />
      <div className="flex-1">
        <CartItemInfo
          onDeleteOption={(optionId) => onDeleteOption?.(id, optionId)}
          itemName={productVariation.variationName!}
          extraOptions={extraOptions}
        />
        <hr className="my-3" />
        <div className="flex items-center justify-between">
          <CountButton
            quantity={quantity}
            onClickCountButton={(type) => {
              if (type === "plus") {
                onUpdateQuantity(id, quantity + 1);
              } else {
                onUpdateQuantity(id, quantity - 1);
              }
            }}
          />
          <div className="flex items-center gap-3">
            <CartItemPrice price={price} />
            <Trash2Icon
              onClick={() => onDelete(id)}
              className="text-gray-400 cursor-pointer hover:text-gray-600"
              size={16}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartDrawerItem;
