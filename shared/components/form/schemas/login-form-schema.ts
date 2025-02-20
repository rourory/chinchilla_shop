import { z } from "zod";

const passwordSchema = z
  .string()
  .min(5, { message: "Password must be at least 5 characters" });

const nameSchema = z
  .string()
  .min(2, { message: "This field must be at least 2 characters" });

export const formLoginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: passwordSchema,
});

export const formRegisterSchema = formLoginSchema
  .merge(
    z.object({
      fullName: nameSchema,
      phone: z
        .string()
        .min(10, { message: "Phone number must be at least 10 characters" }),
      confirmPassword: passwordSchema,
    }),
  )
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type LoginFormSchemaType = z.infer<typeof formLoginSchema>;
export type RegisterSchemaType = z.infer<typeof formRegisterSchema>;
