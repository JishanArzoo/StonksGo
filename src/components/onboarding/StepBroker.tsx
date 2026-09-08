"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";

import { UseFormReturn } from "react-hook-form";

import { OnboardingFormData } from "./OnboardingWizard";

import { createBrokerageAccountAction } from "@/actions/brokerage/create-brokerage-account";

import { createBrokerageAccountSchema } from "@/lib/validation/brokerage";

type Props = {
  form: UseFormReturn<OnboardingFormData>;
  onBack: () => void;
  onComplete: () => void;
};

export function StepBroker({ form, onBack, onComplete }: Props) {
  const {
    register,
    getValues,
    setError,
    clearErrors,
    formState: { errors },
  } = form;

  async function handleSubmit() {
    clearErrors("root");

    const values = getValues();

    const brokerageValues = {
      phone: values.phone,
      emailAddress: values.emailAddress,
      streetAddress: values.streetAddress,
      city: values.city,
      postalCode: values.postalCode,
      state: values.state,
      firstName: values.firstName,
      lastName: values.lastName,
      dateOfBirth: values.dateOfBirth,
    };

    /*
     * Client-side validation.
     */

    const parsed = createBrokerageAccountSchema.safeParse(brokerageValues);

    if (!parsed.success) {
      for (const issue of parsed.error.issues) {
        const field = issue.path[0] as keyof OnboardingFormData;

        setError(field, {
          type: "manual",
          message: issue.message,
        });
      }

      return;
    }

    /*
     * Existing server action.
     */

    const result = await createBrokerageAccountAction(brokerageValues);

    if (!result.success) {
      setError("root", {
        type: "server",
        message: result.error,
      });

      if (result.fieldErrors) {
        for (const [field, messages] of Object.entries(result.fieldErrors)) {
          const message = messages?.[0];

          if (message) {
            setError(field as keyof OnboardingFormData, {
              type: "server",
              message,
            });
          }
        }
      }

      return;
    }

    /*
     * Only advance after the server action succeeds.
     */

    onComplete();
  }

  return (
    <div>
      <div className="p-6 sm:p-8 lg:p-10">
        <h1 className="text-3xl font-bold tracking-tight">
          Create your brokerage account
        </h1>

        <p className="mt-2 text-muted-foreground">
          Enter your information to create your StonksGo brokerage account.
        </p>

        {errors.root?.message && (
          <div className="mt-6 rounded-lg border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive">
            {errors.root.message}
          </div>
        )}

        <div className="mt-8 space-y-8">
          {/* Personal */}

          <section className="space-y-5">
            <h2 className="text-lg font-semibold">Personal information</h2>

            <div className="grid gap-5 sm:grid-cols-2">
              <Field
                label="First name"
                name="firstName"
                register={register}
                error={errors.firstName?.message}
              />

              <Field
                label="Last name"
                name="lastName"
                register={register}
                error={errors.lastName?.message}
              />
            </div>

            <Field
              label="Date of birth"
              name="dateOfBirth"
              type="date"
              register={register}
              error={errors.dateOfBirth?.message}
            />
          </section>

          {/* Contact */}

          <section className="space-y-5">
            <h2 className="text-lg font-semibold">Contact information</h2>

            <Field
              label="Email address"
              name="emailAddress"
              type="email"
              register={register}
              error={errors.emailAddress?.message}
              disabled={true}
            />

            <Field
              label="Phone number"
              name="phone"
              type="tel"
              register={register}
              error={errors.phone?.message}
            />
          </section>

          {/* Address */}

          <section className="space-y-5">
            <h2 className="text-lg font-semibold">Address</h2>

            <Field
              label="Street address"
              name="streetAddress"
              register={register}
              error={errors.streetAddress?.message}
            />

            <div className="grid gap-5 sm:grid-cols-2">
              <Field
                label="City"
                name="city"
                register={register}
                error={errors.city?.message}
              />

              <Field
                label="State"
                name="state"
                register={register}
                error={errors.state?.message}
              />
            </div>

            <Field
              label="Postal code"
              name="postalCode"
              register={register}
              error={errors.postalCode?.message}
            />
          </section>
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-border bg-muted/10 p-6 sm:p-8">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex h-12 items-center gap-2 rounded-lg border border-border px-6 text-sm font-semibold transition hover:bg-muted"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>

        <button
          type="button"
          onClick={handleSubmit}
          className="inline-flex h-12 items-center gap-2 rounded-lg bg-primary px-7 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
        >
          Continue
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

type FieldProps = {
  label: string;
  name: keyof OnboardingFormData;
  register: UseFormReturn<OnboardingFormData>["register"];
  error?: string;
  type?: React.HTMLInputTypeAttribute;
  disabled?: boolean;
};

function Field({
  label,
  name,
  register,
  error,
  type = "text",
  disabled,
}: FieldProps) {
  return (
    <div className="space-y-2">
      <label htmlFor={name} className="text-sm font-semibold">
        {label}
      </label>

      <input
        id={name}
        type={type}
        {...register(name)}
        className={[
          "h-12 w-full rounded-lg border",
          "bg-muted/30 px-4 text-sm",
          "outline-none transition",
          "focus:border-primary",
          "focus:ring-2 focus:ring-primary/20",
          "disabled:bg-muted disabled:opacity-100",

          error ? "border-destructive" : "border-border",
        ].join(" ")}
        disabled={disabled}
      />

      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}
