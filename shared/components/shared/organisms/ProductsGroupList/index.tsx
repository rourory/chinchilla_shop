"use client";
import { cn } from "@/shared/lib/utils";
import React from "react";
import Title from "@/shared/components/shared/atoms/Title";
import ProductCard from "@/shared/components/shared/molecules/ProductCard";
import { useIntersection } from "react-use";
import { useCategoryStore } from "@/shared/store/category";
import { ProductsWithVariationsAndExtraOptions } from "@/shared/lib/findProducts";
import styles from './product-group-list.module.scss'

type ProductGroupListProps = {
  title: string;
  items: ProductsWithVariationsAndExtraOptions;
  categoryId: number;
  className?: string;
  listClassName?: string;
};

const ProductsGroupList: React.FC<ProductGroupListProps> = ({
  title,
  items,
  categoryId,
  className,
  listClassName,
}) => {
  const setActiveCategoryId = useCategoryStore((state) => state.setActiveId);
  const intersectionRef = React.useRef(null);
  const intersection = useIntersection(intersectionRef, {
    threshold: 0.3,
  });
  React.useEffect(() => {
    if (intersection?.isIntersecting) {
      setActiveCategoryId(categoryId);
    }
  }, [categoryId, intersection?.isIntersecting, title, setActiveCategoryId]);

  return (
    <div className={cn("mt-5", className)} ref={intersectionRef} id={title}>
      <Title text={title} size="lg" className="font-extrabold mb-5" />

      <div className={cn("grid gap-[15px]",styles.product_list_grid ,listClassName)}>
        {items.map((product, i) => {
          return (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.productName}
              description={
                product.productVariation[0]?.variationDescription || ""
              }
              price={product.productVariation[0]?.price}
              imageUrl={product.productVariation[0]?.imageUrl}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ProductsGroupList;
