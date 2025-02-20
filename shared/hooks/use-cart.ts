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

  const deliveryPrice = 20;

  const taxes = React.useMemo(() => {
    if (totalAmount) return Math.round((totalAmount / 100) * 5);
    return 0;
  }, [totalAmount]);

  const totalAmountWithTaxesAndDelivery = React.useMemo(() => {
    if (totalAmount && taxes) return totalAmount + taxes + deliveryPrice;
    return taxes + deliveryPrice;
  }, [taxes]);

  return {
    cartItems,
    fetchCartItems,
    updateItemQuantity,
    removeCartItem,
    removeCartItemExtraOption,
    onUpdateQuantity,
    totalAmount,
    totalQuantity,
    deliveryPrice,
    taxes,
    totalAmountWithTaxesAndDelivery,
  };
};
