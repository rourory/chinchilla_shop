"use client";
import { cn } from "@/shared/lib/utils";
import React from "react";
import { Input } from "@/shared/components/ui/input";
import { Skeleton } from "@/shared/components/ui/skeleton";
import FilterCheckbox, { FilterCheckboxProps } from "@/shared/components/shared/atoms/FilterCheckbox";

type Props = {
  className?: string;
  title: string;
  items: FilterCheckboxProps[];
  defaultItems: FilterCheckboxProps[];
  limit?: number;
  loading?: boolean;
  searchInputPlaceholder?: string;
  onCllickCheckbox?: (id: string) => void;
  selectedOptions?: Set<string>;
};

const CheckboxFiltersGroup: React.FC<Props> = ({
  className,
  title,
  items,
  defaultItems,
  limit = 5,
  loading,
  searchInputPlaceholder = "Search...",
  onCllickCheckbox,
  selectedOptions,
}) => {
  const [showAll, setShowAll] = React.useState<boolean>(false);
  const [searchValue, setSearchValue] = React.useState<string>("");

  if (loading) {
    return (
      <div className="flex flex-col gap-4 mt-5">
        <div className={cn("", className)}>
          <p className="font-bold mb-3">{title}</p>
          {Array.from({ length: limit }).map((_, i) => (
            <Skeleton key={i} className="h-6 mb-4" />
          ))}
          <Skeleton key={"showAllSketelon"} className="w-1/3 h-6 mb-4" />
        </div>
      </div>
    );
  }

  const filterOptionsList = showAll
    ? items.filter((item) =>
        item.text.toLowerCase().includes(searchValue.toLowerCase()),
      )
    : defaultItems.slice(0, limit);

  const onChangeSearchInput = (value: string) => {
    setSearchValue(value);
  };

  return (
    <div className="flex flex-col gap-4 mt-5">
      <div className={cn("", className)}>
        <p className="font-bold mb-3">{title}</p>
        {showAll && (
          <div className="mb-5">
            <Input
              onChange={(e) => onChangeSearchInput(e.target.value)}
              placeholder={searchInputPlaceholder}
              className="bg-gray-50 border-none"
            />
          </div>
        )}

        <div className="flex flex-col gap-4 max-h-96 pr-2 overflow-auto scrollbar">
          {filterOptionsList.map((item, _) => {
            return (
              <FilterCheckbox
                key={item.text}
                text={item.text}
                value={item.value}
                endAdortment={item.endAdortment}
                checked={selectedOptions?.has(item.value)}
                onCheckedChange={(_) => {
                  onCllickCheckbox?.(item.value);
                }}
              />
            );
          })}
        </div>

        {items.length > limit && (
          <div className={showAll ? "border-t border-t-neutral-100 mt-4" : ""}>
            <button
              onClick={() => setShowAll(!showAll)}
              className="text-primary mt-3"
            >
              {showAll ? "Hide" : "Show all"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckboxFiltersGroup;
