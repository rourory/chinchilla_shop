import { z } from "zod";

export type CheckoutFormSchemaType = z.infer<typeof checkoutFormSchema>;

export const checkoutFormSchema = z.object({
  firstName: z
    .string()
    .min(2, { message: "First name must be at least 2 characters" }),
  lastName: z
    .string()
    .min(2, { message: "Last name must be at least 2 characters" }),
  email: z.string().email({ message: "Invalid email address" }),
  phone: z
    .string()
    .min(10, { message: "Phone number must be at least 10 characters" }),
  address: z
    .string()
    .min(5, { message: "Address must be at least 5 characters" }),
  comment: z.string().optional(),
  totalAmount: z
    .number()
    .min(0, { message: "Total amount must be at least 0" }),
});
