"use client";
import {
  formRegisterSchema,
  RegisterSchemaType,
} from "@/shared/components/form/schemas/login-form-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "@prisma/client";
import { signOut } from "next-auth/react";
import React from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Container } from "../../atoms/Container";
import Title from "../../atoms/Title";
import { FormInput } from "@/shared/components/form/form-input";
import { Button } from "@/shared/components/ui/button";
import { updateUserInfo } from "@/app/actions";

interface ProfileFormProps {
  user: User;
}

const ProfileForm: React.FC<ProfileFormProps> = ({ user }) => {
  const form = useForm({
    resolver: zodResolver(formRegisterSchema),
    defaultValues: {
      fullName: user?.fullName,
      email: user?.email,
      password: "",
      confirmPassword: "",
      phone: user?.phone,
    },
  });

  const onSubmit: SubmitHandler<RegisterSchemaType> = async (data) => {
    try {
      await updateUserInfo({
        email: data.email,
        fullName: data.fullName,
        password: data.password,
        phone: data.phone,
      });
      toast.success("Profile updated successfully", { icon: "🎉" });
    } catch (err) {
      return toast.error("Error while updating profile", { icon: "🚫" });
    }
  };

  const onClickSignOut = () => {
    signOut({ callbackUrl: "/" });
  };

  return (
    <Container className="mt-10 min-w-[700px]">
      <Title text="Personal information" size="md" className="font-bold" />
      <FormProvider {...form}>
        <form
          className="flex flex-col gap-5 w-96 mt-10"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormInput name="email" label="E-Mail" required />
          <FormInput name="fullName" label="Full name" required />
          <FormInput name="phone" label="Phone number" required />

          <FormInput
            type="password"
            name="password"
            label="New password"
            required
          />
          <FormInput
            type="password"
            name="confirmPassword"
            label="Confirm password"
            required
          />
          <Button
            loading={form.formState.isSubmitting}
            className="text-base mt-10"
            type="submit"
          >
            Save
          </Button>
          <Button
            onClick={onClickSignOut}
            variant="secondary"
            loading={form.formState.isSubmitting}
            className="text-base"
            type="button"
          >
            SignOut
          </Button>
        </form>
      </FormProvider>
    </Container>
  );
};

export default ProfileForm;
