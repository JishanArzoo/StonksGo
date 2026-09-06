import { alpacaRequest } from "./client";

export type CreateAchRelationshipInput = {
  name: string;
  accountNo: string | undefined;
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

export async function listAchRelationships(accountId: string) {
  return alpacaRequest(`/accounts/${accountId}/ach_relationships`);
}

export async function createTransfer(
  accountId: string,
  input: CreateTransferInput,
) {
  return alpacaRequest(`/accounts/${accountId}/transfers`, {
    method: "POST",
    body: JSON.stringify(input),
  });
}
