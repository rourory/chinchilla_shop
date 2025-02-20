/* eslint-disable @next/next/no-img-element */
import {
  formLoginSchema,
  LoginFormSchemaType,
} from "@/shared/components/form/schemas/login-form-schema";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import Title from "../../atoms/Title";
import { FormInput } from "@/shared/components/form/form-input";
import { Button } from "@/shared/components/ui/button";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";

interface LoginFormProps {
  className?: string;
  onClose?: VoidFunction;
}

const LoginForm: React.FC<LoginFormProps> = ({ className, onClose }) => {
  const form = useForm<LoginFormSchemaType>({
    resolver: zodResolver(formLoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<LoginFormSchemaType> = async (data) => {
    try {
      console.log(data);
      const resp = await signIn("credentials", {
        ...data,
        redirect: false,
      });
      if (!resp?.ok) throw new Error("Error while logging in");
      onClose?.();
      toast.success("Logged in successfully", { icon: "🎉" });
    } catch (error) {
      console.log(error);
      toast.error("Error while logging in", { icon: "🚫" });
    }
  };

  return (
    <FormProvider {...form}>
      <form
        className="flex flex-col gap-5"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="flex justify-between items-center">
          <div className="mr-2">
            <Title text="Login" size="md" className="font-bold" />
            <p className="text-gray-400">Enter your email to login</p>
          </div>
          <img src="/phone-icon.png" alt="Phone icon" width={60} height={60} />
        </div>

        <FormInput name="email" label="E-Mail" required />
        <FormInput name="password" label="Password" type="password" required />

        <Button
          loading={form.formState.isSubmitting}
          className="h-12 text-base"
          type="submit"
        >
          {"Login"}
        </Button>
      </form>
    </FormProvider>
  );
};

export default LoginForm;
