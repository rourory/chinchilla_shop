import { prisma } from "@/prisma/prisma-clent";
import { CartItem } from "@prisma/client";
import { CartItemCreateDTO } from "./route";

export async function findExistedCartItem(
  cartId: number,
  data: CartItemCreateDTO,
) {
  const existedCartItem = await prisma.cartItem.findFirst({
    where: {
      AND: [
        { cartId: cartId },
        { productItemId: data.productVariationId },
        {
          extraOptions: {
            every: { id: { in: data.extraOptionIds } },
          },
        },
      ],
    },
  });
  return existedCartItem;
}

export async function updateOrCreateCartItem(
  cartId: number,
  data: CartItemCreateDTO,
) {
  return await prisma.cartItem.create({
    data: {
      cartId: cartId,
      productItemId: data.productVariationId,
      quantity: data.quantity,
      extraOptions: {
        connect: data.extraOptionIds?.map((o) => ({ id: o })),
      },
    },
  });
}

export async function createCartIfNotExist(token: string) {
  let cart;
  if (token) cart = await findCartByToken(token);
  if (!cart) cart = await createNewCartWithRandomToken();
  return cart;
}

export async function createNewCartWithRandomToken() {
  const { token } = await prisma.cart.create({
    data: {
      token: crypto.randomUUID(),
    },
  });
  const cart = await findCartByToken(token);
  if (cart) return cart;
  throw new Error("Error during creating new cart");
}

export async function findCartByToken(token: string) {
  const cart = await prisma.cart.findFirst({
    where: {
      token,
    },
    include: {
      cartItem: {
        orderBy: {
          createdAt: "desc",
        },
        include: {
          productItem: {
            include: {
              product: true,
            },
          },
          extraOptions: true,
        },
      },
    },
  });
  return cart;
}
