// src/lib/alpaca/positions.ts

import { alpacaRequest } from "./client";

export type AlpacaPosition = {
  asset_id: string;
  symbol: string;
  qty: string;
  avg_entry_price: string;
  market_value: string;
  cost_basis: string;
  unrealized_pl: string;
  unrealized_plpc: string;
  current_price: string;
  change_today: string;
};

export async function listAlpacaPositions(accountId: string) {
  return alpacaRequest<AlpacaPosition[]>(
    `/v1/trading/accounts/${accountId}/positions`,
  );
}

export async function getAlpacaPosition(accountId: string, symbol: string) {
  return alpacaRequest<AlpacaPosition>(
    `/v1/trading/accounts/${accountId}/positions/${symbol}`,
  );
}

//NOTE: Provision for a future close position function

// export async function closeAlpacaPosition(accountId: string, symbol: string) {
//   return alpacaRequest(
//     `/v1/trading/accounts/${accountId}/positions/${symbol}`,
//     {
//       method: "DELETE",
//     },
//   );
// }
