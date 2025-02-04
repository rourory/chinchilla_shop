"use client";
import { cn } from "@/shared/lib/utils";
import Categories from "@/shared/components/shared/molecules//Categories";
import SortPopup from "@/shared/components/shared/atoms/SortPopup";
import { Container } from "@/shared/components/shared/atoms/Container";
import React from "react";
import { useIntersection } from "react-use";
import Image from "next/image";
import { CategoriesWithProductsAndVariationsAndExtraOptions } from "@/shared/lib/findProducts";

interface Props {
  className?: string;
  categories: CategoriesWithProductsAndVariationsAndExtraOptions;
}

const TopBar: React.FC<Props> = ({ className, categories }) => {
  const obscuredDivRef = React.useRef(null);
  const intersection = useIntersection(obscuredDivRef, { threshold: 0 });

  return (
    <>
      <div className="obscured-div" ref={obscuredDivRef} />
      <div
        className={cn(
          "sticky top-0 py-5 shadow-lg shadow-black/5 z-10 backdrop-blur",
          className,
        )}
      >
        <Container className="flex justify-between">
          <div className="flex">
            <Image
              src={"/chinchilla-blue.png"}
              alt="Logo"
              width={100}
              height={100}
              className={cn(
                "transition duration-300 absolute top-1 opacity-0",
                !intersection?.isIntersecting && "opacity-100",
              )}
            />
            <Categories
              className={cn(
                "transition duration-300 ml-[70px]",
                !intersection?.isIntersecting &&
                  "translate-x-20 translate-y-2 scale-[1.2]",
              )}
              categories={categories}
            />
          </div>
          <SortPopup />
        </Container>
      </div>
    </>
  );
};

export default TopBar;
