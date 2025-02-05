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
import { createOrder } from "@/app/actions";
import toast from "react-hot-toast";
const CheckoutForm = () => {
  const [submitting, setSubmitting] = React.useState(false);

  const form = useForm<CheckoutFormSchemaType>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
      phone: "",
      address: "",
      comment: "",
      totalAmount: 0,
    },
  });

  const onSubmit: SubmitHandler<CheckoutFormSchemaType> = async (data, ev) => {
    try {
      setSubmitting(true);
      const url = await createOrder(data);

      toast.success("Order created successfully. Moving on to payment...", {
        icon: "🎉",
      });

      if (url) {
        setTimeout(() => {
          location.href = url;
        }, 2500);
      }
    } catch (err) {
      console.log(err);
      toast.error("Failed to create an order", { icon: "🚫" });
    } finally {
      setSubmitting(false);
    }
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
            <CheckoutStats submitting={submitting} />
          </div>
        </div>
      </form>
    </FormProvider>
  );
};

export default CheckoutForm;
