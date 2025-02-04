"use client";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/shared/components/ui/dialog";
import React from "react";
import { ExtraOption, Product, ProductVariation } from "@prisma/client";
import { cn } from "@/shared/lib/utils";
import ProductFormContent from "../ProductFormContent";
import { useRouter } from "next/navigation";

export type WithVariations = {
  productVariation: ProductVariation[];
};

export type WithExtraOptions = {
  extraOptions: ExtraOption[];
};

interface ChooseProductModalProps {
  product: Product & WithVariations & WithExtraOptions;
  className?: string;
}

const ChooseProductModal: React.FC<ChooseProductModalProps> = ({
  className,
  product,
}) => {
  const router = useRouter();

  return (
    <Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
      <DialogContent
        className={cn(
          "p-0 w-[60vw] max-w-[1260px] min-w-[1060px] min-h-[600px] max-h-[700px] h-[70vh]   bg-white overflow-hidden border-none",
          className,
        )}
      >
        <DialogTitle title={product.productName} hidden />
        <ProductFormContent product={product} />
      </DialogContent>
    </Dialog>
  );
};

export default ChooseProductModal;
