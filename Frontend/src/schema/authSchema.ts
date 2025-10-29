import { z } from "zod";

export const loginSchema = z.object({
  identifier: z
    .string()
    .min(1, "Email or phone is required")
    .refine(
      (value) =>
        /^\S+@\S+\.\S+$/.test(value) || /^[0-9]{10}$/.test(value),
      "Enter a valid email or 10-digit phone number"
    ),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters"),
});

export type LoginSchemaType = z.infer<typeof loginSchema>;
