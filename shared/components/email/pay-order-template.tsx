import * as React from "react";

interface PayOrderTemplateProps {
  orderId: number;
  totalAmount: number;
  paymentUrl: string;
}

export const PayOrderTemplate: React.FC<PayOrderTemplateProps> = (props) => (
  <div>
    <h1>Order #{props.orderId}</h1>
    <p>
      Pay the order. Total sum: <b>{props.totalAmount} $</b>. Follow{" "}
      <a href={props.paymentUrl}>the link</a> to pay the order!
    </p>
  </div>
);
