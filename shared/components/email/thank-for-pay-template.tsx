import { ICartItem } from "@/shared/store/cart";
import * as React from "react";

interface ThankForPayTemplateProps {
  orderId: number;
  items: ICartItem[];
}

export const ThankForPayTemplate: React.FC<ThankForPayTemplateProps> = (
  props,
) => (
  <div>
    <h1>Thank for pay!</h1>
    <p>Your order #{props.orderId} has paid. The list of goods:</p>
    <hr />
    <ul>
      {props.items.map((item) => (
        <li key={item.id}>
          {item.productItem.variationName} -{" "}
          {item.productItem.variationDescription} - {item.productItem.price}$ (
          {item.quantity} pcs.)
        </li>
      ))}
    </ul>
  </div>
);
