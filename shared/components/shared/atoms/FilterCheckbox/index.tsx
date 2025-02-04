/* eslint-disable @typescript-eslint/no-unused-vars */
import { Checkbox } from "@/shared/components/ui/checkbox";
import { cn } from "@/shared/lib/utils";
import React from "react";

export type FilterCheckboxProps = {
  className?: string;
  text: string;
  value: string;
  endAdortment?: React.ReactNode;
  onCheckedChange?: (checked: boolean) => void;
  checked?: boolean;
};

export default function FilterCheckbox({
  className,
  text,
  value,
  endAdortment,
  onCheckedChange,
  checked,
}: FilterCheckboxProps) {
  return (
    <div className={cn("flex items-center space-x-2", className)}>
      <Checkbox
        onCheckedChange={onCheckedChange}
        checked={checked}
        value={value}
        id={`checkbox-${String(value)}`}
        className="rounded-[8px] w-6 h-6"
      />
      <label
        htmlFor={`checkbox-${String(value)}`}
        className="leading-none cursor-pointer flex-1"
      >
        {text}
      </label>
    </div>
  );
}
