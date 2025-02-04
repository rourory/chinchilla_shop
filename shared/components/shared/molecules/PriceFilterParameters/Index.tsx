import { Input } from "@/shared/components/ui/input";
import React from "react";
import RangeSlider from "@/shared/components/shared/atoms/RangeSlider";

interface PriceRange {
  from: number;
  to: number;
}

interface PriceFiterParametersProps {
  price: PriceRange;
  onChangePrice: (name: keyof PriceRange, value: number) => void;
}

const PriceFilterParameters: React.FC<PriceFiterParametersProps> = ({
  price,
  onChangePrice,
}) => {
  const setPriceWithRangeSlider = (values: number[]) => {
    onChangePrice("from", values[0]);
    onChangePrice("to", values[1]);
  };

  return (
    <div className="mt-5 border-y border-y-neural-100 py-6 pb-7">
      <p className="font-bold mb-3">Price:</p>
      <div className="flex gap-3 mb-5">
        <Input
          type="number"
          placeholder="0"
          min={0}
          max={30000}
          value={price.from}
          onChange={(e) => onChangePrice("from", Number(e.target.value))}
        />
        <Input
          type="number"
          min={100}
          max={30000}
          placeholder="1000"
          value={price.to}
          onChange={(e) => onChangePrice("to", Number(e.target.value))}
        />
      </div>
      <RangeSlider
        min={0}
        max={30000}
        step={10}
        value={[price.from, price.to]}
        onValueChange={setPriceWithRangeSlider}
      />
    </div>
  );
};

export default PriceFilterParameters;
