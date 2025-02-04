"use client";
import { Button } from "@/shared/components/ui/button";
import { CategoriesWithProductsAndVariationsAndExtraOptions } from "@/shared/lib/findProducts";
import { cn } from "@/shared/lib/utils";
import { useCategoryStore } from "@/shared/store/category";
import { useRouter } from "next/navigation";
import React from "react";

type Props = {
  className?: string;
  categories: CategoriesWithProductsAndVariationsAndExtraOptions;
};

const Categories: React.FC<Props> = ({ className, categories }) => {
  const activeCategoryId = useCategoryStore((state) => state.activeId);
  const router = useRouter();

  return (
    <div
      className={cn(
        "inline-flex gap-1 bg-gray-50 p-1 rounded-md items-center h-fit",
        className,
      )}
    >
      {categories.map((cat, index) => {
        return (
          cat.products.length > 0 && (
            <Button
              key={cat.id}
              variant={"outline"}
              className={cn(
                "transition duration-150",
                activeCategoryId == cat.id &&
                  "shadow-md shadow-gray-20 bg-primary border-primary text-primary-foreground",
              )}
              onClick={() => router.push(`#${cat.categoryName}`)}
            >
              {cat.categoryName}
            </Button>
          )
        );
      })}
    </div>
  );
};

export default Categories;
