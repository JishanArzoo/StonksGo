import { z } from "zod";

export const onboardingProfileSchema = z.object({
  username: z
    .string()
    .min(2, "Username must be at least 2 characters.")
    .max(50, "Username must be less than 50 characters."),

  email: z.email("Please enter a valid email address."),
});

export type OnboardingProfileInput = z.infer<typeof onboardingProfileSchema>;
