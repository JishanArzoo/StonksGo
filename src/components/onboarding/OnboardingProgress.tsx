import { Check, Rocket, UserRound } from "lucide-react";

type Props = {
  currentStep: number;
};

const steps = [
  {
    number: 1,
    label: "ACCOUNT",
    icon: UserRound,
    align: "left",
  },
  {
    number: 2,
    label: "PROFILE",
    icon: UserRound,
    align: "center",
  },
  {
    number: 3,
    label: "FINALIZE",
    icon: Rocket,
    align: "right",
  },
];

export function OnboardingProgress({ currentStep }: Props) {
  return (
    <div className="w-full">
      <div className="flex items-start">
        {steps.map((item, index) => {
          const Icon = item.icon;

          const active = currentStep === item.number;

          const completed = currentStep > item.number;

          return (
            <div
              key={item.number}
              className="flex flex-1 items-start justify-center"
            >
              {index < steps.length && (
                <div
                  className={[
                    "mx-3 mt-7 h-px flex-1",
                    "transition-colors duration-300",

                    currentStep > item.number ? "bg-primary" : "bg-border",
                  ].join(" ")}
                />
              )}
              <div className="flex flex-col items-center">
                <div
                  className={[
                    "flex h-14 w-14 items-center justify-center rounded-full border",
                    "transition-all duration-300",

                    active
                      ? "border-primary bg-primary/10 text-primary ring-8 ring-primary/5"
                      : completed
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border bg-card text-muted-foreground",
                  ].join(" ")}
                >
                  {completed ? (
                    <Check className="h-5 w-5" />
                  ) : (
                    <Icon className="h-5 w-5" />
                  )}
                </div>

                <span
                  className={[
                    "mt-4 text-xs font-semibold tracking-wide",
                    active || completed
                      ? "text-foreground"
                      : "text-muted-foreground",
                  ].join(" ")}
                >
                  {item.label}
                </span>
              </div>

              {index < steps.length && (
                <div
                  className={[
                    "mx-3 mt-7 h-px flex-1",
                    "transition-colors duration-300",

                    currentStep > item.number ? "bg-primary" : "bg-border",
                  ].join(" ")}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
