import { Cart } from "@prisma/client";
import { ApiRoutes } from "./api-routes";
import { axiosInstance } from "./fetcher-instance";
import { ICartItem } from "../store/cart";
import { CartItemCreateDTO } from "@/app/api/user_cart/route";

type WithCartItems = {
  cartItem: ICartItem[];
};

export const getCart = async (): Promise<Cart & WithCartItems> => {
  const { data } = await axiosInstance.get<Cart & WithCartItems>(
    ApiRoutes.USER_CART,
  );
  return data;
};

export const updateCartItemQuantity = async (
  id: number,
  quantity: number,
): Promise<ICartItem> => {
  const { data } = await axiosInstance.patch<ICartItem>(
    `${ApiRoutes.CART_ITEMS}/${id}`,
    {
      quantity,
    },
  );
  return data;
};

export const deleteCartItem = async (id: number): Promise<boolean> => {
  const result = await axiosInstance.delete(`${ApiRoutes.CART_ITEMS}/${id}`);
  return result.status == 200;
};

export const addCartItem = async (cartItem: CartItemCreateDTO) => {
  const { data } = await axiosInstance.post<Cart & WithCartItems>(
    ApiRoutes.USER_CART,
    cartItem,
  );
  return data;
};
