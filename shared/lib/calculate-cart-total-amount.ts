import { ICartItem } from "../store/cart";

export const calculateCartTotalAmout = (cartItems?: ICartItem[]) => {
  if (!cartItems) return undefined;
  return cartItems.reduce((acc, item) => {
    const extraOptionPrices = item.extraOptions.reduce(
      (extraOptionAcc, option) => {
        return extraOptionAcc + option.price;
      },
      0,
    );
    return acc + (item.productItem.price + extraOptionPrices) * item.quantity;
  }, 0);
};
