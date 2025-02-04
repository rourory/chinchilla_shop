import { cn } from "@/shared/lib/utils";
import { ExtraOption } from "@prisma/client";
import { BadgeX, CrossIcon } from "lucide-react";
import React from "react";

interface CartItemInfoProps {
  className?: string;
  itemName: string;
  extraOptions?: ExtraOption[];
  onDeleteOption?: (optionId: number) => void;
}

const CartItemInfo: React.FC<CartItemInfoProps> = ({
  className,
  itemName,
  extraOptions,
  onDeleteOption,
}) => {
  return (
    <div className={cn("", className)}>
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold flex-1 leading-6">{itemName}</h2>
      </div>
      <div className="flex flex-wrap">
        {extraOptions?.map((item, i) => (
          <span
            key={item.id}
            className="text-sm text-gray-500 flex flex-row items-center w-fit border-b hover:border-gray-200 border-white mr-1 cursor-default"
          >
            {`${item.optionName} `}
            <BadgeX
              size={14}
              className="mx-2 hover:scale-125 transition-all duration-100 cursor-pointer"
              onClick={() => onDeleteOption?.(item.id)}
            />
          </span>
        ))}
      </div>
    </div>
  );
};

export default CartItemInfo;
