"use client";
import { Product } from "@prisma/client";
import React from "react";
import { WithVariations, WithExtraOptions } from "../ChooseProductModal";
import { useCartStore } from "@/shared/store/cart";
import { CartItemCreateDTO } from "@/app/api/user_cart/route";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import ChooseProductForm from "../ChooseProductForm";

interface ProductFormContentProps {
  className?: string;
  product: Product & WithVariations & WithExtraOptions;
  type?: "modal" | "page";
}

const ProductFormContent: React.FC<ProductFormContentProps> = ({
  className,
  product,
  type = "modal",
}) => {
  const router = useRouter();
  const cart = useCartStore();

  const onClickAddToCart = React.useCallback(
    async (cartItem: CartItemCreateDTO) => {
      try {
        await cart.addCartItem(cartItem);
        if (type == "modal") router.back();
        toast.success("Item added to cart!");
      } catch (error) {
        toast.error("Unable to add item to cart :(");
        console.error(error);
      }
    },
    [cart, router],
  );

  return (
    <ChooseProductForm
      className={className}
      type={type}
      product={product}
      onClickAddToCart={onClickAddToCart}
      loading={cart.loading}
    />
  );
};

export default ProductFormContent;
