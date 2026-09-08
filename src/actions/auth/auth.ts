// app/actions/auth.ts
"use server";

import { redirect } from "next/navigation";
import { auth } from "@/lib/auth/auth";

export async function signInWithGoogle() {
  const result = await auth.api.signInSocial({
    body: {
      provider: "google",
      callbackURL: "/onboarding/brokerage",
    },
  });

  if (!result.url) {
    throw new Error("Failed to create Google OAuth URL");
  }

  redirect(result.url);
}
