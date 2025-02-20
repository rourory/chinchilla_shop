import { FormInput } from "@/shared/components/form/form-input";
import {
  formRegisterSchema,
  RegisterSchemaType,
} from "@/shared/components/form/schemas/login-form-schema";
import { Button } from "@/shared/components/ui/button";
import { cn } from "@/shared/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import Title from "../../atoms/Title";
import toast from "react-hot-toast";
import { createUser } from "@/app/actions";

interface RegisterFormProps {
  className?: string;
  onClose?: VoidFunction;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ className, onClose }) => {
  const form = useForm<RegisterSchemaType>({
    resolver: zodResolver(formRegisterSchema),
    defaultValues: {
      email: "",
      fullName: "",
      password: "",
      phone: "",
      confirmPassword: "",
    },
  });

  const onSubmit: SubmitHandler<RegisterSchemaType> = async (data) => {
    try {
      await createUser(data);

      toast.error("User created successfully. Confirm your account please", {
        icon: "🎉",
      });

      onClose?.();
    } catch (error) {
      return toast.error("Error while updating profile", { icon: "🚫" });
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
            <Title text="Registration" size="md" className="font-bold" />
            <p className="text-gray-400">Enter your email to login</p>
          </div>
          <img src="/phone-icon.png" alt="Phone icon" width={60} height={60} />
        </div>
        <div>
          <FormInput name="email" label="E-Mail" required />
          <FormInput name="fullName" label="Full Name" required />
          <FormInput name="phone" label="Phone number" required />
          <FormInput
            name="password"
            label="Password"
            type="password"
            required
          />
          <FormInput
            name="confirmPassword"
            label="Confirm password"
            type="password"
            required
          />
        </div>
        <Button
          loading={form.formState.isSubmitting}
          className="h-12 text-base"
          type="submit"
        >
          {"Register"}
        </Button>
      </form>
    </FormProvider>
  );
};

export default RegisterForm;
