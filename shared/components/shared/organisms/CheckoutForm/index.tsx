"use client";

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";

import CheckoutCart from "@/shared/components/shared/molecules/CheckoutCart";
import CheckoutPersonnelInformation from "@/shared/components/shared/molecules/CheckoutPersonnelInformation";
import CheckoutShippingAddress from "@/shared/components/shared/molecules/CheckoutShippingAddress";
import CheckoutStats from "@/shared/components/shared/molecules/CheckoutStats";

import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import {
  checkoutFormSchema,
  CheckoutFormSchemaType,
} from "@/shared/components/form/schemas/checkout-form-schema";

const CheckoutForm = () => {
  const form = useForm<CheckoutFormSchemaType>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
      phone: "",
      address: "",
      comment: "",
    },
  });

  const onSubmit: SubmitHandler<CheckoutFormSchemaType> = (data, ev) => {
    console.log(data);
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex gap-10">
          <div className="flex flex-col gap-10 flex-1 mb-20">
            <CheckoutCart />
            <CheckoutPersonnelInformation />
            <CheckoutShippingAddress />
          </div>
          <div className="w-[400px]">
            <CheckoutStats />
          </div>
        </div>
      </form>
    </FormProvider>
  );
};

export default CheckoutForm;
