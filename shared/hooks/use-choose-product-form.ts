import {
  WithExtraOptions,
  WithVariations,
} from "./../components/shared/organisms/ChooseProductModal/index";
import { Product } from "@prisma/client";
import React from "react";
import { useSet } from "react-use";

export const useChooseProductFormData = (
  product: Product & WithExtraOptions & WithVariations,
) => {
  const [currentProductVariationId, setCurrentProductVariationId] =
    React.useState<number>(product.productVariation[0].id);
  const [selectedExtraOptions, { toggle: addExtraOption }] = useSet(
    new Set<number>([]),
  );

  const totaPrice = React.useMemo(() => {
    const variationPrice =
      product.productVariation.find(
        (variation) => variation.id === currentProductVariationId,
      )?.price || 0;

    let extraOptionsPrice = 0;
    selectedExtraOptions.forEach(
      (v) =>
        (extraOptionsPrice +=
          product.extraOptions.find((opt) => opt.id === v)?.price || 0),
    );
    return variationPrice + extraOptionsPrice;
  }, [product, currentProductVariationId, selectedExtraOptions]);

  return {
    currentProductVariationId,
    selectedExtraOptions,
    totaPrice,
    setCurrentProductVariationId,
    addExtraOption,
  };
};
