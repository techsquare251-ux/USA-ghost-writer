import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z
    .string()
    .regex(/^\+?[\d\s\-()]{7,}$/, "Invalid phone number"),
  email: z.string().email("Invalid email address"),
  service: z.string().optional(),
  message: z.string().optional(),
  smsConsent: z.boolean(),
  context: z.string().optional(),
});

export type ContactFormValues = z.infer<typeof contactSchema>;
