"use client";

import { cn } from "@/shared/lib/utils";
import { ProductVariation } from "@prisma/client";
import React from "react";

interface ProductVariationSwitcherProps {
  className?: string;
  variations: ProductVariation[];
  onChangeVariant?: (value: ProductVariation["id"]) => void;
  selectedValue: ProductVariation["id"];
}
const ProductVariationSwitcher: React.FC<ProductVariationSwitcherProps> = ({
  className,
  variations,
  onChangeVariant,
  selectedValue,
}) => {
  return (
    <div
      className={cn(
        "flex justify-between bg-[#e3e3e9] rounded-3xl p-1 select-none",
        className,
      )}
    >
      {variations.map((variation) => (
        <button
          key={variation.id}
          onClick={() => onChangeVariant?.(variation.id)}
          className={cn(
            "flex items-center justify-center cursor-pointer h-[30px] px-5 flex-1 rounded-3xl transition-all duration-400 text-sm",
            {
              "bg-white shadow": variation.id === selectedValue,
              "text-gray-500 opacity-50 pointer-events-none":
                variation.diasabled == true,
            },
          )}
        >
          {variation.variationName}
        </button>
      ))}
    </div>
  );
};

export default ProductVariationSwitcher;
