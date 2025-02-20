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
import { useCart } from "@/shared/hooks/use-cart";
import { User } from "@prisma/client";

interface CheckoutFormProps {
  user: User | null;
}

const CheckoutForm: React.FC<CheckoutFormProps> = (props) => {
  const [submitting, setSubmitting] = React.useState(false);

  const { totalAmountWithTaxesAndDelivery } = useCart();

  const form = useForm<CheckoutFormSchemaType>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      email: props.user?.email,
      firstName: "",
      lastName: "",
      phone: props.user?.phone,
      address: "",
      comment: "",
    },
  });

  const onSubmit: SubmitHandler<CheckoutFormSchemaType> = async (data, ev) => {
    try {
      setSubmitting(true);
      const url = await createOrder(data, totalAmountWithTaxesAndDelivery);

      if (url) {
        toast.success("Order created successfully. Moving on to payment...", {
          icon: "🎉",
        });
        setTimeout(() => {
          location.href = url;
        }, 1500);
      } else {
        throw new Error("Failed to create an order");
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
