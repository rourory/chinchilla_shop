"use client";

import { cn } from "@/shared/lib/utils";
import RequiredSymbol from "@/shared/components/shared/atoms/RequiredSymbol";
import { Input } from "@/shared/components/ui/input";
import ErrorText from "../shared/atoms/ErrorText";
import React from "react";
import ClearButton from "@/shared/components/shared/atoms/ClearButton";
import { useFormContext } from "react-hook-form";

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  required?: boolean;
  className?: string;
}

export const FormInput: React.FC<FormInputProps> = ({
  name,
  label,
  required,
  className,
  ...props
}) => {
  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext();

  const value = watch(name);
  const errorText = errors[name]?.message as string;

  return (
    <div className={cn("", className)}>
      {label && (
        <p className="font-medium mb-2">
          {label} {required && <RequiredSymbol />}
        </p>
      )}

      <div className="relative">
        <Input className="h-12 text-md" {...register(name)} {...props} />
        {value && (
          <ClearButton
            onClick={() => setValue(name, "")}
          />
        )}
      </div>

      {errorText && <ErrorText text={errorText} />}
    </div>
  );
};
