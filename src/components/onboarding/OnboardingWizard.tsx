"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import { StepGoogle } from "./StepGoogle";
import { StepBroker } from "./StepBroker";
import { StepComplete } from "./StepComplete";
import { OnboardingProgress } from "./OnboardingProgress";
import { th } from "zod/v4/locales";

export type OnboardingFormData = {
  // Step 1
  username: string;
  email: string;

  // Step 2
  phone: string;
  emailAddress: string;
  streetAddress: string;
  city: string;
  postalCode: string;
  state: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
};

type Props = {
  stepNo: number | undefined;
  initialUsername: string;
  initialEmail: string;
};

export function OnboardingWizard({
  stepNo,
  initialUsername,
  initialEmail,
}: Props) {
  const router = useRouter();
  console.log("Step no is: ", stepNo);
  const [step, setStep] = useState(stepNo || 1);

  const form = useForm<OnboardingFormData>({
    defaultValues: {
      username: initialUsername,
      email: initialEmail,

      phone: "",
      emailAddress: initialEmail,
      streetAddress: "",
      city: "",
      postalCode: "",
      state: "",
      firstName: initialUsername.split(" ")[0],
      lastName: initialUsername.split(" ")[1],
      dateOfBirth: "",
    },

    mode: "onBlur",
  });

  function goToStep(nextStep: number) {
    setStep(nextStep);
  }

  function handleComplete() {
    router.push("/dashboard");
    router.refresh();
  }

  return (
    <div className="mx-auto w-full max-w-4xl">
      <OnboardingProgress currentStep={step} />

      <div className="mt-8 overflow-hidden rounded-2xl border border-border bg-card">
        {step === 1 && (
          <StepGoogle form={form} onComplete={() => goToStep(2)} />
        )}

        {step === 2 && (
          <StepBroker
            form={form}
            onBack={() => goToStep(1)}
            onComplete={() => goToStep(3)}
          />
        )}

        {step === 3 && <StepComplete onFinish={handleComplete} />}
      </div>

      <div className="mt-6 rounded-2xl border border-border bg-card p-6">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-medium text-muted-foreground">
              Step {step} of 3
            </span>

            <h2 className="mt-1 text-xl font-semibold">
              Complete your registration
            </h2>
          </div>

          <div className="text-right">
            <span className="text-sm text-muted-foreground">Progress</span>

            <div className="text-3xl font-bold">
              {Math.round((step / 3) * 100)}%
            </div>
          </div>
        </div>

        <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full bg-primary transition-all duration-500"
            style={{
              width: `${(step / 3) * 100}%`,
            }}
          />
        </div>
      </div>
    </div>
  );
}
