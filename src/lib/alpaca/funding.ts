import { alpacaRequest } from "./client";

export type CreateAchRelationshipInput = {
  bank_account_type: string;
  account_owner_name: string;
  bank_account_number: string | undefined;
  bank_routing_number: string;
};

export type CreateTransferInput = {
  ACHRelID: string;
  amount: number;
};

export async function createAchRelationship<T>(
  accountId: string,
  input: CreateAchRelationshipInput,
): Promise<T> {
  return alpacaRequest(`/accounts/${accountId}/ach_relationships`, {
    method: "POST",
    body: JSON.stringify(input),
  });
}

//TODO: More routes
// export async function listAchRelationships(accountId: string) {
//   return alpacaRequest(`/accounts/${accountId}/ach_relationships`);
// }

// export async function createTransfer(
//   accountId: string,
//   input: CreateTransferInput,
// ) {
//   return alpacaRequest(`/accounts/${accountId}/transfers`, {
//     method: "POST",
//     body: JSON.stringify(input),
//   });
// }
