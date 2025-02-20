import * as React from "react";

interface ConfirmAccountTemplateProps {
  code: string;
  href: string;
}

export const ConfirmAccountTemplate: React.FC<ConfirmAccountTemplateProps> = (
  props,
) => (
  <div>
    <h1>Thanks for registration!</h1>
    <h2>Please, confirm your account</h2>
    <p>
      Your confirmation code: <b>{props.code}</b>
    </p>
    <p>
      <a href={props.href}>Confirm account</a>
    </p>
  </div>
);
