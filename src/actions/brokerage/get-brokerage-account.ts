"use server";

import { getSession } from "@/lib/auth/session";
import { getBrokerageAccount } from "@/lib/brokerage/get-account";
import { prisma } from "@/lib/db/index";
import { BrokerageAccountSchema } from "@/lib/validation/types";

export async function getBrokerageAccountByUserId<
  T,
>(): Promise<BrokerageAccountSchema> {
  const session = await getSession();
  if (!session?.user.id) {
    throw new Error("User not authenticated");
  }
  const userId = session.user.id;
  const brokerageAccount = await getBrokerageAccount(userId);

  //   console.log(brokerageAccount);
  if (!brokerageAccount) {
    throw new Error(`No brokerage account found for user ${session.user.name}`);
  }

  return brokerageAccount;
}
