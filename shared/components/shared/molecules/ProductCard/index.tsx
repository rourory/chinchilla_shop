/* eslint-disable @next/next/no-img-element */
import { cn } from "@/shared/lib/utils";
import Link from "next/link";
import React from "react";
import Title from "@/shared/components/shared/atoms/Title";
import { Button } from "@/shared/components/ui/button";
import { Plus } from "lucide-react";

export type ProductCardProps = {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  description: string;
  className?: string;
};

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  price,
  description,
  imageUrl,
  className,
}) => {
  return (
    <div
      className={cn(
        "rounded-lg hover:scale-[1.02] transition-all duration-200 shadow-sm shadow-slate-200 hover:shadow-md hover:shadow-slate-400",
        className,
      )}
    >
      <Link href={`/product/${id}`}>
        <div className="flex justify-center items-center bg-secondary rounded-t-lg h-[280px] overflow-clip">
          <img
            className="w-full h-full object-cover"
            src={imageUrl}
            alt={name}
          />
        </div>
        <div className="p-5">
          <Title text={name} size="sm" className="mb-1 mt-3 font-bold" />

          <p className="text-sm text-gray-400">{description}</p>

          <div className="flex justify-between items-center mt-4">
            <span className="text-[20px]">
              {">"} <b>{price} $</b>
            </span>

            <Button variant={"secondary"} className="text-base font-bold">
              <Plus className="w-5 h-5 mr-1" />
              Add
            </Button>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
