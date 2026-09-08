"use server";

import { getSession } from "@/lib/auth/session";
import { createBrokerageAccount } from "@/lib/brokerage/create-account";
import { createBrokerageAccountSchema } from "@/lib/validation/brokerage";
import { z } from "zod";

export type CreateBrokerageAccountActionState =
  | {
      success: true;
      brokerageAccount: {
        id: string;
        alpacaAccountId: string;
        accountNumber: string | null;
        achRelationshipId: string | null;
        status: string;
      };
    }
  | {
      success: false;
      error: string;
      fieldErrors?: Record<string, string[] | undefined> | undefined;
    };

export async function createBrokerageAccountAction(
  input: unknown,
): Promise<CreateBrokerageAccountActionState> {
  // Authenticate the request on the server.
  const session = await getSession();

  if (!session?.user?.id) {
    return {
      success: false,
      error: "You must be signed in to create a brokerage account.",
    };
  }

  // Validate the client input again on the server.
  const parsed = createBrokerageAccountSchema.safeParse(input);

  if (!parsed.success) {
    return {
      success: false,
      error: "Please correct the highlighted fields.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  try {
    const brokerageAccount = await createBrokerageAccount(
      session.user.id,
      parsed.data,
    );

    return {
      success: true,
      brokerageAccount: {
        id: brokerageAccount.id,
        alpacaAccountId: brokerageAccount.alpacaAccountId,
        accountNumber: brokerageAccount.accountNumber,
        achRelationshipId: brokerageAccount.achRelationshipId,
        status: brokerageAccount.status,
      },
    };
  } catch (error) {
    console.error("createBrokerageAccountAction:", error);

    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Something went wrong while creating your brokerage account.",
    };
  }
}
