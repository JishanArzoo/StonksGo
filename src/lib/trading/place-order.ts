import { prisma } from "@/lib/db/index";
import { createAlpacaOrder } from "../alpaca/orders";
import { PlaceOrderInput } from "../validation/order";

export async function placeOrder(userId: string, input: PlaceOrderInput) {
  // 1. Find brokerage account
  const brokerageAccount = await prisma.brokerageAccount.findUnique({
    where: {
      userId,
    },
  });

  if (!brokerageAccount) {
    throw new Error("Brokerage account not found");
  }

  //NOTE: A provision of BrokerageAccount.status !== "ACTIVE" can be given here

  //

  //TODO: A isMarketOpen condition has to be placed here at some point in future

  //TODO: Input validation to be performed here at some point in future

  const order = await createAlpacaOrder({
    accountId: brokerageAccount.alpacaAccountId,
    symbol: input.symbol,
    qty: input.qty,
    side: input.side,
  });

  return order;
}
