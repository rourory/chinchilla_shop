"use client";

import React from "react";
import { WhiteBlock } from "@/shared/components/shared/organisms/WhiteBlock";
import { FormTextarea } from "@/shared/components/form/form-textarea";
import AddressInput from "../AddressInput";
import { Controller, useFormContext } from "react-hook-form";
import ErrorText from "../../atoms/ErrorText";
import { useCart } from "@/shared/hooks/use-cart";

const CheckoutShippingAddress = () => {
  const { control } = useFormContext();
  const { cartItems } = useCart();
  return (
    <WhiteBlock
      title="3. Shipping address"
      className={
        cartItems && cartItems.length > 0
          ? ""
          : "opacity-50 pointer-events-none"
      }
    >
      <div className="flex flex-col gap-5">
        <Controller
          control={control}
          name="address"
          render={({ field, fieldState }) => (
            <div>
              <AddressInput onChange={field.onChange} value={field.value} />
              {fieldState.error && (
                <ErrorText text={fieldState.error.message || ""} />
              )}
            </div>
          )}
        />

        <FormTextarea
          placeholder="Comments"
          rows={5}
          className="text-base"
          name="comment"
        />
      </div>
    </WhiteBlock>
  );
};

export default CheckoutShippingAddress;
