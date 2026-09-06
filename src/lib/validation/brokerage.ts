import { z } from "zod";

export const createBrokerageAccountSchema = z.object({
  phone: z.string().min(9),

  emailAddress: z.email().min(8),

  streetAddress: z.string().min(8).max(32),

  city: z.string().min(1),

  postalCode: z.string().min(1),

  state: z.string().min(1),

  firstName: z.string().min(1),

  lastName: z.string().min(1),

  dateOfBirth: z.string().min(1),
});

export type CreateBrokerageAccountInput = z.infer<
  typeof createBrokerageAccountSchema
>;
