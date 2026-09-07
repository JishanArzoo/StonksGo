import { redirect } from "next/navigation";

import { getSession } from "@/lib/auth/session";
import { prisma } from "@/lib/db";
import { BrokerageOnboardingForm } from "@/components/brokerage/BrokerageOnboardingForm";

export default async function BrokerageOnboardingPage() {
  const session = await getSession();

  // User must be authenticated.
  if (!session?.user?.id) {
    redirect("/login");
  }

  // Don't let a user register twice.
  const existingBrokerageAccount = await prisma.brokerageAccount.findUnique({
    where: {
      userId: session.user.id,
    },
  });

  if (existingBrokerageAccount) {
    redirect("/dashboard");
  }

  return (
    <main className="min-h-screen px-6 py-12">
      <BrokerageOnboardingForm />
    </main>
  );
}
