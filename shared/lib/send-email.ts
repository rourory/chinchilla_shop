import { CreateEmailResponseSuccess, Resend } from "resend";
import React from "react";

interface SendEmailFunctionProps {
  address: string;
  subject: string;
  template: React.ReactNode;
}

export const sendEmail: (
  props: SendEmailFunctionProps,
) => Promise<CreateEmailResponseSuccess | null> = async (props) => {
  const resend = new Resend(process.env.RESEND_API_KEY);

  const { data, error } = await resend.emails.send({
    from: "onboarding@resend.dev",
    to: [props.address],
    subject: props.subject,
    react: props.template,
  });

  if (error) throw error;
  return data;
};
