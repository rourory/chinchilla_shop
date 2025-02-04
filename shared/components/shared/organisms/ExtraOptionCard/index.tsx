/* eslint-disable @next/next/no-img-element */
import { cn } from "@/shared/lib/utils";
import { CircleCheck } from "lucide-react";
import React from "react";
import styles from "./extra-option-card.module.scss";

interface ExtraOptionCardProps {
  className?: string;
  imageUrl: string;
  name: string;
  price: number;
  active?: boolean;
  onClick?: VoidFunction;
  elementKey: number;
}

const ExtraOptionCard: React.FC<ExtraOptionCardProps> = ({
  className,
  imageUrl,
  name,
  price,
  active,
  onClick,
  elementKey,
}) => {
  return (
    <div
      key={elementKey}
      className={cn(
        "border border-white flex items-center flex-col p-3 rounded-md text-center relative cursor-pointer shadow-md bg-white justify-between transition-all duration-200",
        { "border-primary": active },
        className,
      )}
      onClick={onClick}
    >
      {active && (
        <CircleCheck className="absolute top-2 right-2 text-primary" />
      )}
      <img
        width={100}
        height={100}
        src={imageUrl}
        alt={name}
        className="rounded-xl w-[100px] h-[100px] object-cover"
      />
      <div className="flex flex-col mt-6">
        <span className="text-xs mb-1">{name}</span>
        <span className="font-bold">{price} $</span>
      </div>
    </div>
  );
};

export default ExtraOptionCard;
