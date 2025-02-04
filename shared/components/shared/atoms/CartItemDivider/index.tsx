import React from "react";

interface CartItemDividerProps {
  key: React.Key | null | undefined;
}
const CartItemDivider: React.FC<CartItemDividerProps> = ({ key }) => {
  return <div className="h-[1px] w-full bg-gray-200" key={key} />;
};

export default CartItemDivider;
