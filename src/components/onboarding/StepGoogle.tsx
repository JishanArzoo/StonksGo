"use client";

import { ArrowRight, Mail, UserRound } from "lucide-react";
import { UseFormReturn } from "react-hook-form";

import { OnboardingFormData } from "./OnboardingWizard";

import { onboardingProfileSchema } from "@/lib/validation/onboarding";
import { signInWithGoogle } from "@/actions/auth/auth";

type Props = {
  form: UseFormReturn<OnboardingFormData>;
  onComplete: () => void;
};

export function StepGoogle({ form, onComplete }: Props) {
  const {
    register,
    getValues,
    setError,
    formState: { errors },
  } = form;

  // async function handleContinue() {
  //   const values = getValues();

  //   const result = onboardingProfileSchema.safeParse({
  //     username: values.username,
  //     email: values.email,
  //   });

  //   if (!result.success) {
  //     for (const issue of result.error.issues) {
  //       const field = issue.path[0] as "username" | "email";

  //       setError(field, {
  //         type: "manual",
  //         message: issue.message,
  //       });
  //     }

  //     return;
  //   }

  //   /*
  //    * Call your existing Google onboarding
  //    * server action here.
  //    *
  //    * Example:
  //    *
  //    * const result =
  //    *   await googleOnboardingAction({
  //    *     username: values.username,
  //    *     email: values.email,
  //    *   });
  //    *
  //    * if (!result.success) {
  //    *   setError("root", {
  //    *     message: result.error,
  //    *   });
  //    *
  //    *   return;
  //    * }
  //    */
  //   signInWithGoogle();

  //   // onComplete();
  // }
  async function GoogleContinue() {
    signInWithGoogle();
  }

  return (
    <div>
      <div className="p-6 sm:p-8 lg:p-10">
        <h1 className="text-3xl font-bold tracking-tight">
          Create your account
        </h1>

        <p className="mt-2 text-muted-foreground">
          Start your journey by setting up your basic credentials.
        </p>

        {errors.root?.message && (
          <div className="mt-6 rounded-lg border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive">
            {errors.root.message}
          </div>
        )}

        <div className="mt-8 space-y-6">
          {/* Username */}

          <div className="space-y-2">
            <label htmlFor="username" className="text-sm font-semibold">
              Username
            </label>

            <div className="relative">
              <UserRound className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />

              <input
                id="username"
                {...register("username")}
                placeholder="Your username"
                autoComplete="username"
                className={[
                  "h-12 w-full rounded-lg border",
                  "bg-muted/30 pl-12 pr-4",
                  "text-sm outline-none",
                  "focus:border-primary",
                  "focus:ring-2 focus:ring-primary/20",

                  errors.username ? "border-destructive" : "border-border",
                ].join(" ")}
              />
            </div>

            {errors.username && (
              <p className="text-xs text-destructive">
                {errors.username.message}
              </p>
            )}
          </div>

          {/* Email */}

          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-semibold">
              Email Address
            </label>

            <div className="relative">
              <Mail className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />

              <input
                id="email"
                type="email"
                {...register("email")}
                autoComplete="email"
                placeholder="you@example.com"
                className={[
                  "h-12 w-full rounded-lg border",
                  "bg-muted/30 pl-12 pr-4",
                  "text-sm outline-none",
                  "focus:border-primary",
                  "focus:ring-2 focus:ring-primary/20",

                  errors.email ? "border-destructive" : "border-border",
                ].join(" ")}
              />
            </div>

            {errors.email && (
              <p className="text-xs text-destructive">{errors.email.message}</p>
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-end border-t border-border bg-muted/10 p-6 sm:p-8">
        <button
          type="button"
          onClick={GoogleContinue}
          className="inline-flex h-12 items-center gap-2 rounded-lg bg-primary px-7 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
        >
          Continue
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
