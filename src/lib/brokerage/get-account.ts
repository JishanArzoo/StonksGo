import { prisma } from "@/lib/db/index";
import { BrokerageAccountSchema } from "../validation/types";

export async function getBrokerageAccount(userId: string) {
  const brokerageAccount = await prisma.brokerageAccount.findUnique({
    where: {
      userId,
    },
  });
  return brokerageAccount;
}
