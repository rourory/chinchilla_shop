import {
  CartItem,
  ExtraOption,
  Product,
  ProductVariation,
} from "@prisma/client";
import { create } from "zustand";
import { ApiClients } from "../services/api-clients";
import { CartItemCreateDTO } from "@/app/api/user_cart/route";

export type ICartItem = CartItem & {
  productItem: ProductVariation & {
    product: Product;
  };
  extraOptions: ExtraOption[];
};

export interface CartState {
  loading: boolean;
  error: boolean;
  cartItems?: ICartItem[];
  fetchCartItems: () => Promise<void>;
  updateItemQuantity: (id: number, quantity: number) => Promise<void>;
  addCartItem: (cartItem: CartItemCreateDTO) => Promise<void>;
  removeCartItem: (id: number) => Promise<void>;
  removeCartItemExtraOption: (
    id: number,
    extraOptionId: number,
  ) => Promise<void>;
  _proceed: (proceed: () => Promise<void>) => Promise<void>;
}

export const useCartStore = create<CartState>()((set, getState) => ({
  cartItems: [],
  error: false,
  loading: true,
  totalAmount: 0,

  _proceed: async (proceed: () => Promise<void>) => {
    try {
      set({ loading: true, error: false });
      await proceed();
    } catch (error) {
      console.log(error);
      set({ error: true });
    } finally {
      setTimeout(() => {
        set({ loading: false });
      }, 300);
    }
  },

  fetchCartItems: async () => {
    getState()._proceed(async () => {
      const data = await ApiClients.cart.getCart();
      set({ cartItems: data.cartItem });
    });
  },

  removeCartItem: async (id: number) => {
    getState()._proceed(async () => {
      const deleted = await ApiClients.cart.deleteCartItem(id);
      if (deleted) {
        set((state) => {
          state.cartItems = state.cartItems?.filter((item) => item.id !== id);
          return state;
        });
      }
    });
  },

  //TODO(rrr): implement remocing extra options from cart items
  removeCartItemExtraOption: async (id, extraOptionId) => {
    console.log(id, extraOptionId);
  },

  updateItemQuantity: async (id, newQuantity) => {
    getState()._proceed(async () => {
      const data = await ApiClients.cart.updateCartItemQuantity(
        id,
        newQuantity,
      );
      set((state) => {
        if (state.cartItems) {
          const index = state.cartItems?.findIndex((item) => item.id == id);
          if (index >= 0) {
            state.cartItems[index] = data;
          }
        }
        return state;
      });
    });
  },
  addCartItem: async (cartItem) => {
    getState()._proceed(async () => {
      const updatedCart = await ApiClients.cart.addCartItem(cartItem);
      set({ cartItems: updatedCart.cartItem });
    });
  },
}));
