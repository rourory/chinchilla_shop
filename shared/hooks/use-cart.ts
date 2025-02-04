import React from "react";
import { useCartStore } from "../store/cart";
import { calculateCartTotalAmout } from "../lib/calculate-cart-total-amount";

export const useCart = () => {
  const {
    cartItems,
    fetchCartItems,
    updateItemQuantity,
    removeCartItem,
    removeCartItemExtraOption,
    loading,
  } = useCartStore((state) => state);

  const totalAmount = React.useMemo(() => {
    return calculateCartTotalAmout(cartItems);
  }, [cartItems, loading]);

  const totalQuantity = React.useMemo(() => {
    if (!cartItems) return 0;
    return cartItems.reduce((acc, item) => acc + item.quantity, 0);
  }, [cartItems, loading]);

  React.useEffect(() => {
    fetchCartItems();
  }, []);

  const onUpdateQuantity = React.useCallback(
    async (id: number, quantity: number) => {
      const res = await updateItemQuantity(id, quantity);
    },
    [cartItems],
  );

  return {
    cartItems,
    fetchCartItems,
    updateItemQuantity,
    removeCartItem,
    removeCartItemExtraOption,
    onUpdateQuantity,
    totalAmount,
    totalQuantity,
  };
};
