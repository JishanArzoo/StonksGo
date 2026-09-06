import { getSession } from "@/lib/auth/session";
import { createBrokerageAccount } from "@/lib/brokerage/create-account";
import { createBrokerageAccountSchema } from "@/lib/validation/brokerage";

export async function createBrokerageAccountAction(input: unknown) {
  const session = await getSession();

  if (!session?.user) {
    return {
      success: false,
      error: "Unauthorized",
    };
  }

  const parsed = createBrokerageAccountSchema.safeParse(input);

  if (!parsed.success) {
    return {
      success: false,
      error: "Invalid account information",
    };
  }

  try {
    const account = await createBrokerageAccount(session.user.id, parsed.data);

    return {
      success: true,
      account,
    };
  } catch (err) {
    console.error("Create brokerage account failed: ", err);
    return {
      success: false,
      error: "Unable to create brokerage account",
    };
  }
}
