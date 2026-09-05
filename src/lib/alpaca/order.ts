import { alpacaRequest } from "./client";

export type CreateAlapacaOrderInput = {
  accountId: string;
  symbol: string;
  qty: string;
  side: "buy" | "sell";
  type?: "market" | "limit" | "stop" | "stop_limit";
  time_in_force?: string;
  commission_type?: string;
};

export type AlpacaOrder = {
  id: string;
  client_order_id: string;
  status: string;
  symbol: string;
  qty?: string;
  filled_qty?: string;
  side: string;
  type: string;
  time_in_force: string;
};

export async function createAlpacaOrder(input: CreateAlapacaOrderInput) {
  return alpacaRequest<AlpacaOrder>(
    `trading/accounts/${input.accountId}/orders`,
    {
      method: "POST",

      body: JSON.stringify({
        symbol: input.symbol,
        qty: input.qty,
        side: input.side,
        type: input.type,
        time_in_force: input.time_in_force,
      }),
    },
  );
}

//NOTE: AI GENERATED 👇 TODO: Yet to fill the body
export async function getAlpacaOrder(accountId: string, orderId: string) {
  // GET order
}

export async function listAlpacaOrders(accountId: string) {
  // GET orders
}

export async function cancelAlpacaOrder(accountId: string, orderId: string) {
  // DELETE order
}
