"use client";

import React from "react";
import { WhiteBlock } from "@/shared/components/shared/organisms/WhiteBlock";
import CartSummaryDetailsLine from "@/shared/components/shared/atoms/CartSummaryDetailsLine";
import { ArrowRight, Package, Percent, Truck } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { useCart } from "@/shared/hooks/use-cart";
import { Skeleton } from "@/shared/components/ui/skeleton";
import { Controller, useFormContext } from "react-hook-form";
import { Input } from "@/shared/components/ui/input";

interface CheckoutStatsProps {
  className?: string;
  submitting: boolean;
}

const CheckoutStats: React.FC<CheckoutStatsProps> = ({ submitting }) => {
  const { control } = useFormContext();
  const { totalAmount } = useCart();
  const deliveryPrice = 20;

  const taxes = React.useMemo(() => {
    if (totalAmount) return Math.round((totalAmount / 100) * 5);
  }, [totalAmount]);
  const totalAmountWithTaxesAndDelivery = React.useMemo(() => {
    if (totalAmount && taxes) return totalAmount + taxes + deliveryPrice;
  }, [taxes]);

  return (
    <WhiteBlock className="p-6 sticky top-4">
      <div className="flex flex-col gap-1">
        <span className="text-xl">Total:</span>
        <span className="text-[36px] font-extrabold">
          {totalAmountWithTaxesAndDelivery ? (
            <>{totalAmountWithTaxesAndDelivery.toString()} $</>
          ) : (
            <Skeleton className="h-[54px] w-full" />
          )}
        </span>
      </div>

      <CartSummaryDetailsLine
        icon={<Package size={18} className="text-gray-400" />}
        title={"Products amount:"}
        value={totalAmount}
      />
      <CartSummaryDetailsLine
        icon={<Percent size={18} className="text-gray-400" />}
        title="Taxes:"
        value={taxes}
      />
      <CartSummaryDetailsLine
        icon={<Truck size={18} className="text-gray-400" />}
        title="Delivery:"
        value={deliveryPrice}
      />
      <Controller
        control={control}
        name="totalAmount"
        render={() => <Input hidden value={totalAmountWithTaxesAndDelivery} />}
      />
      <Button
        loading={submitting}
        type="submit"
        disabled={!totalAmount}
        className="w-full h-14 rounded-2xl mt-6 text-base font-bold"
      >
        Move on to payment
        <ArrowRight className="w-5 ml-2" />
      </Button>
    </WhiteBlock>
  );
};

export default CheckoutStats;
