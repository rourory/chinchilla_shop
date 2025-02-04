import { ExtraOption } from "@prisma/client";
import { useSearchParams } from "next/navigation";
import React from "react";
import { useSet } from "react-use";

interface PriceRange {
  from: number;
  to: number;
}

interface FiterItem {
  value: string;
  text: string;
}

interface UseFiltersReturnProps {
  price: PriceRange;
  filterItems: FiterItem[];
  selectedFiterItemsOptions: Set<string>;
  changePrice: (name: keyof PriceRange, value: number) => void;
  setSelectedFiterItemsOptions: (key: string) => void;
}

const useFilters = (extraOptions: ExtraOption[]): UseFiltersReturnProps => {
  const searchParams = useSearchParams();

  const [price, setPrice] = React.useState<PriceRange>({
    from: Number(searchParams.get("priceFrom")) || 0,
    to: Number(searchParams.get("priceTo")) || 30000,
  });
  const [selectedFiterItemsOptions, { toggle }] = useSet(
    new Set<string>(searchParams.get("extraOptions")?.split(",")),
  );

  const filterItems = React.useMemo(() => {
    return extraOptions.map((item) => ({
      value: item.id.toString(),
      text: item.optionName,
    }));
  }, [extraOptions]);

  const changePrice = (name: keyof PriceRange, value: number) => {
    setPrice((prev) => ({ ...prev, [name]: value }));
  };

  return React.useMemo(() => {
    return {
      price,
      filterItems,
      selectedFiterItemsOptions,
      changePrice,
      setSelectedFiterItemsOptions: toggle,
    };
  }, [price, filterItems, selectedFiterItemsOptions]);
};

export default useFilters;
