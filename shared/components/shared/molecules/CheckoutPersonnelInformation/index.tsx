"use client";

import React from "react";
import { WhiteBlock } from "@/shared/components/shared/organisms/WhiteBlock";
import { FormInput } from "@/shared/components/form/form-input";
import { useCart } from "@/shared/hooks/use-cart";

const CheckoutPersonnelInformation = () => {
  const { cartItems } = useCart();

  return (
    <WhiteBlock
      className={
        cartItems && cartItems.length > 0
          ? ""
          : "opacity-50 pointer-events-none"
      }
      title="2. Personnel information"
    >
      <div className="grid grid-cols-2 gap-5">
        <FormInput name="firstName" className="text-base" placeholder="Name" />
        <FormInput
          name="lastName"
          className="text-base"
          placeholder="Last Name"
        />
        <FormInput name="email" className="text-base" placeholder="E-Mail" />
        <FormInput
          name="phone"
          className="text-base"
          placeholder="Phone number"
        />
      </div>
    </WhiteBlock>
  );
};

export default CheckoutPersonnelInformation;
