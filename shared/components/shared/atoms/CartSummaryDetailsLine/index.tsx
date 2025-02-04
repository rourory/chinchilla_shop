import { Skeleton } from "@/shared/components/ui/skeleton";
import { cn } from "@/shared/lib/utils";
import React from "react";

interface CartSummaryDetailsLineProps {
  className?: string;
  title: string;
  icon: React.ReactNode;
  value?: string | number;
}

const CartSummaryDetailsLine: React.FC<CartSummaryDetailsLineProps> = ({
  className,
  title,
  icon,
  value,
}) => {
  return (
    <div className={cn("flex my-4", className)}>
      <span className=" flex flex-1 text-lg text-neutral-500">
        <div className="flex items-center gap-2 ">
          {icon}
          {title}
        </div>
        <div className="flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2" />
      </span>
      {value ? (
        <span className="font-bold text-lg">{value} $</span>
      ) : (
        <Skeleton className="h-7 w-10" />
      )}
    </div>
  );
};

export default CartSummaryDetailsLine;
