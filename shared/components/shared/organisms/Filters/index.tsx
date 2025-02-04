"use client";
import { cn } from "@/shared/lib/utils";
import React from "react";
import Title from "@/shared/components/shared/atoms/Title";
import CheckboxFiltersGroup from "@/shared/components/shared/molecules/CheckboxFiltersGroup";
import { useExtraOptionFilterData } from "@/shared/hooks/use-extra-option-filter-data";
import qs from "qs";
import { useRouter } from "next/navigation";
import PriceFilterParameters from "@/shared/components/shared/molecules/PriceFilterParameters/Index";
import useFilters from "@/shared/hooks/use-filters";

type FiltersComponentProps = { className?: string };

export default function Filters({ className }: FiltersComponentProps) {
  const router = useRouter();

  const { extraOptions } = useExtraOptionFilterData();

  const {
    price,
    filterItems,
    selectedFiterItemsOptions,
    changePrice,
    setSelectedFiterItemsOptions,
  } = useFilters(extraOptions);

  const setFilterValuesToBrowsersRouterField = React.useCallback(() => {
    const filter = {
      priceFrom: price.from,
      priceTo: price.to,
      extraOptions: Array.from(selectedFiterItemsOptions),
    };
    router.push(`?${qs.stringify(filter, { arrayFormat: "comma" })}`, {
      scroll: false,
    });
  }, [price, selectedFiterItemsOptions, router]);

  React.useEffect(() => {
    setFilterValuesToBrowsersRouterField();
  }, [setFilterValuesToBrowsersRouterField]);

  return (
      <div className={cn("", className)}>
        <Title text="Filtration" size="sm" className="mb-5 font-bold" />
        <PriceFilterParameters price={price} onChangePrice={changePrice} />
        <CheckboxFiltersGroup
          title="Features"
          className="mt-5"
          limit={6}
          defaultItems={filterItems.slice(0, 6)}
          items={filterItems}
          loading={extraOptions.length === 0}
          onCllickCheckbox={setSelectedFiterItemsOptions}
          selectedOptions={selectedFiterItemsOptions}
        />
      </div>
  );
}
