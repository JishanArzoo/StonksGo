"use client";

import { authClient } from "@/lib/auth/auth-client";

export function GoogleSignInButton() {
  const handleSignIn = async () => {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/dashboard",
    });
  };

  return (
    <button
      type="button"
      onClick={handleSignIn}
      className="bg-amber-400 rounded-xs"
    >
      Continue with Google
    </button>
  );
}
