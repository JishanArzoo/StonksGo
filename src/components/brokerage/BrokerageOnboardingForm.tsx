"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { createBrokerageAccountAction } from "@/actions/brokerage/create-brokerage-account";

type FormData = {
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

const initialFormData: FormData = {
  phone: "",
  emailAddress: "",
  streetAddress: "",
  city: "",
  postalCode: "",
  state: "",
  firstName: "",
  lastName: "",
  dateOfBirth: "",
};

export function BrokerageOnboardingForm() {
  const router = useRouter();

  const [formData, setFormData] = useState<FormData>(initialFormData);

  const [fieldErrors, setFieldErrors] = useState<
    Record<string, string[] | undefined>
  >({});

  const [error, setError] = useState<string | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));

    // Clear the error for this field as the user edits it.
    setFieldErrors((current) => ({
      ...current,
      [name]: undefined,
    }));

    setError(null);
  }

  async function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    setIsSubmitting(true);
    setError(null);
    setFieldErrors({});

    try {
      const result = await createBrokerageAccountAction(formData);

      if (!result.success) {
        setError(result.error);
        setFieldErrors(result.fieldErrors ?? {});
        return;
      }

      // Registration succeeded.
      router.push("/dashboard");
      router.refresh();
    } catch (error) {
      console.error(error);

      setError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  function getFieldError(field: keyof FormData) {
    return fieldErrors[field]?.[0];
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto w-full max-w-2xl space-y-8"
    >
      <div>
        <h1 className="text-2xl font-semibold">Open your brokerage account</h1>

        <p className="mt-2 text-sm text-muted-foreground">
          Enter your information to create your StonksGo brokerage account.
        </p>
      </div>

      {error && (
        <div
          role="alert"
          className="rounded-md border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-600"
        >
          {error}
        </div>
      )}

      {/* Personal information */}
      <section className="space-y-4">
        <h2 className="text-lg font-medium">Personal information</h2>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field
            label="First name"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            error={getFieldError("firstName")}
            autoComplete="given-name"
          />

          <Field
            label="Last name"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            error={getFieldError("lastName")}
            autoComplete="family-name"
          />
        </div>

        <Field
          label="Date of birth"
          name="dateOfBirth"
          type="date"
          value={formData.dateOfBirth}
          onChange={handleChange}
          error={getFieldError("dateOfBirth")}
          autoComplete="bday"
        />
      </section>

      {/* Contact information */}
      <section className="space-y-4">
        <h2 className="text-lg font-medium">Contact information</h2>

        <Field
          label="Email address"
          name="emailAddress"
          type="email"
          value={formData.emailAddress}
          onChange={handleChange}
          error={getFieldError("emailAddress")}
          autoComplete="email"
        />

        <Field
          label="Phone number"
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={handleChange}
          error={getFieldError("phone")}
          autoComplete="tel"
        />
      </section>

      {/* Address */}
      <section className="space-y-4">
        <h2 className="text-lg font-medium">Address</h2>

        <Field
          label="Street address"
          name="streetAddress"
          value={formData.streetAddress}
          onChange={handleChange}
          error={getFieldError("streetAddress")}
          autoComplete="street-address"
        />

        <div className="grid gap-4 sm:grid-cols-2">
          <Field
            label="City"
            name="city"
            value={formData.city}
            onChange={handleChange}
            error={getFieldError("city")}
            autoComplete="address-level2"
          />

          <Field
            label="State"
            name="state"
            value={formData.state}
            onChange={handleChange}
            error={getFieldError("state")}
            autoComplete="address-level1"
          />
        </div>

        <Field
          label="Postal code"
          name="postalCode"
          value={formData.postalCode}
          onChange={handleChange}
          error={getFieldError("postalCode")}
          autoComplete="postal-code"
        />
      </section>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-md bg-primary px-4 py-3 text-sm font-medium text-primary-foreground disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isSubmitting
          ? "Creating brokerage account..."
          : "Create brokerage account"}
      </button>
    </form>
  );
}

type FieldProps = {
  label: string;
  name: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  type?: React.HTMLInputTypeAttribute;
  autoComplete?: string;
};

function Field({
  label,
  name,
  value,
  onChange,
  error,
  type = "text",
  autoComplete,
}: FieldProps) {
  return (
    <div className="space-y-2">
      <label htmlFor={name} className="text-sm font-medium">
        {label}
      </label>

      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        autoComplete={autoComplete}
        className={`w-full rounded-md border bg-background px-3 py-2 text-sm outline-none transition focus:ring-2 ${
          error
            ? "border-red-500 focus:ring-red-500/20"
            : "focus:ring-primary/20"
        }`}
        required
      />

      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  );
}
