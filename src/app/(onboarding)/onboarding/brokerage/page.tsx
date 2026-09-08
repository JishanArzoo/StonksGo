import { redirect } from "next/navigation";

import { getSession } from "@/lib/auth/session";
import { OnboardingWizard } from "@/components/onboarding/OnboardingWizard";

export default async function OnboardingPage({
  searchParams,
}: {
  searchParams: Promise<{ step?: number }>;
}) {
  // const { step } = await searchParams;
  const session = await getSession();
  let steps;

  if (!session?.user?.id) {
    console.log("session does not exists");
  } else {
    if (steps == undefined) {
      steps = 2;
    }
  }

  return (
    <main className="min-h-screen bg-background px-4 py-8 sm:px-6 lg:px-8">
      <OnboardingWizard
        stepNo={steps}
        initialUsername={session?.user.name ?? ""}
        initialEmail={session?.user.email ?? ""}
      />
    </main>
  );
}
