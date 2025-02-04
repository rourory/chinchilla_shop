/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
import { cn } from "@/shared/lib/utils";
import React from "react";
import ProductImage from "../../atoms/ProductImage";
import Title from "../../atoms/Title";
import { Button } from "@/shared/components/ui/button";
import { Product } from "@prisma/client";
import ProductVariationSwitcher from "../../molecules/ProductVariationSwitcher";
import { WithExtraOptions, WithVariations } from "../ChooseProductModal";
import ExtraOptionCard from "../ExtraOptionCard";
import { useChooseProductFormData } from "@/shared/hooks/use-choose-product-form";
import { CartItemCreateDTO } from "@/app/api/user_cart/route";
import styles from "./choose-product-form.module.scss";

interface ChooseProductFormProps {
  product: Product & WithVariations & WithExtraOptions;
  onClickAddToCart?: (cartItem: CartItemCreateDTO) => void;
  loading: boolean;
  className?: string;
  type: "modal" | "page";
}

const ChooseProductForm: React.FC<ChooseProductFormProps> = ({
  product,
  onClickAddToCart,
  loading,
  className,
  type,
}) => {
  const {
    currentProductVariationId,
    selectedExtraOptions,
    setCurrentProductVariationId,
    addExtraOption,
    totaPrice,
  } = useChooseProductFormData(product);

  const handleClickAddToCart = React.useCallback(() => {
    const cartItem: CartItemCreateDTO = {
      productVariationId: currentProductVariationId,
      extraOptionIds: Array.from(selectedExtraOptions),
      quantity: 1,
    };
    onClickAddToCart?.(cartItem);
  }, [onClickAddToCart, currentProductVariationId, selectedExtraOptions]);

  return (
    <div
      className={cn(
        type == "modal" && "flex flex-1 justify-end",
        type == "page" && "relative flex flex-1 justify-end",
        className,
      )}
    >
      {product.productVariation.map((variation) => {
        return (
          <ProductImage
            key={variation.id}
            src={variation.imageUrl}
            className={cn(
              type == "modal" &&
                "absolute left-0 w-3/5 h-[70vh] max-h-[700px] min-h-[600px] transition-all duration-1000 opacity-0",
              type == "page" &&
                "absolute left-0 w-1/2 h-full transition-all duration-1000 opacity-0 rounded-3xl overflow-hidden",
              variation.id === currentProductVariationId && "opacity-100",
            )}
          />
        );
      })}
      <div className="w-2/5 bg-secondary p-7">
        <Title
          text={product.productName}
          size="md"
          className="font-extrabold mb-1"
        />
        <p className="text-gray-400">
          {
            product.productVariation.find(
              (v) => v.id === currentProductVariationId,
            )?.variationDescription
          }
        </p>
        <ProductVariationSwitcher
          className="mt-3"
          variations={product.productVariation}
          selectedValue={currentProductVariationId}
          onChangeVariant={(id) => setCurrentProductVariationId(id)}
        />
        <div className="flex flex-col h-[80%]">
          <div className="mt-10 bg-gray-50 p-5 rounded-md h-[100%] overflow-auto scrollbar">
            <div className={cn("grid gap-2", styles.grid_extra_option_cards)}>
              {product.extraOptions.map((option) => {
                return (
                  <ExtraOptionCard
                    key={`extra-option-card-${option.id}`}
                    elementKey={option.id}
                    imageUrl={option.imageUrl}
                    name={option.optionName}
                    price={option.price}
                    active={selectedExtraOptions.has(option.id)}
                    onClick={() => addExtraOption(option.id)}
                  />
                );
              })}
            </div>
          </div>
          <Button
            loading={loading}
            className="h-[55px] px-10 text-base rounded-[18px] w-full mt-10"
            onClick={handleClickAddToCart}
          >
            Add to cart for {totaPrice}$
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChooseProductForm;
