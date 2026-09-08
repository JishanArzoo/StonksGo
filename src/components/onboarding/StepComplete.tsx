"use client";

import { ArrowRight, CheckCircle2 } from "lucide-react";

type Props = {
  onFinish: () => void;
};

export function StepComplete({ onFinish }: Props) {
  return (
    <div className="p-8 sm:p-12">
      <div className="mx-auto flex max-w-xl flex-col items-center text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
          <CheckCircle2 className="h-8 w-8" />
        </div>

        <h1 className="mt-6 text-3xl font-bold">You're all set!</h1>

        <p className="mt-3 text-muted-foreground">
          Your StonksGo account and brokerage profile have been successfully set
          up.
        </p>

        <button
          type="button"
          onClick={onFinish}
          className="mt-8 inline-flex h-12 items-center gap-2 rounded-lg bg-primary px-7 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
        >
          Go to Dashboard
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
