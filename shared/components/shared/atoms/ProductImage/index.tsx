/* eslint-disable @next/next/no-img-element */
import { cn } from "@/shared/lib/utils";
import React from "react";

interface ProductImageProps {
  className?: string;
  src: string;
  rounded?: boolean;
}

const ProductImage: React.FC<ProductImageProps> = ({
  className,
  src,
  rounded = false,
}) => {
  return (
    <div className={cn("w-[300px] h-[300px]", className)}>
      <img
        src={src}
        alt="Product image"
        className={cn(
          "transition-all z-10 duration-300",
          "w-full h-full object-cover",
          rounded && "rounded-xl",
        )}
      />
    </div>
  );
};

export default ProductImage;
