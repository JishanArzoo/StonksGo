import { prisma } from "@/lib/db/index";

export async function getBrokerageAccount(userId: string) {
  const brokerageAccount = await prisma.brokerageAccount.findUnique({
    where: {
      id: userId,
    },
  });

  return brokerageAccount;
}
