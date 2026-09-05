import { redirect } from "next/navigation";

import { getSession } from "@/lib/auth/session";
import React from "react";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  if (!session?.user) {
    console.log(session);
    redirect("/login");
  }

  return <div>{children}</div>;
}
