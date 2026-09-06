import { prisma } from "@/lib/db/index";
import { createAlpacaAccount } from "../alpaca/accounts";
import { CreateBrokerageAccountInput } from "../validation/brokerage";
import { createAchRelationship } from "../alpaca/funding";

type AchRelationshipResponse = {
  account_id: string;
  account_owner_name: string;
  bank_account_number: string;
  bank_account_type: string;
  bank_routing_number: string;
  created_at: Date;
  id: string;
  nickname: string;
  status: string;
  updated_at: Date;
};

export async function createBrokerageAccount(
  userId: string,
  input: CreateBrokerageAccountInput,
) {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  // Prevent duplicate brokerage account
  const existing = await prisma.brokerageAccount.findUnique({
    where: {
      id: userId,
    },
  });

  if (existing) {
    throw new Error("Brokerage account already exists");
  }

  const alpacaAccount = await createAlpacaAccount({
    contact: {
      emailAddress: input.emailAddress,
      phoneNumber: input.phone,
      streetAddress: input.streetAddress,
      city: input.city,
      postalCode: input.postalCode,
      state: input.state,
    },
    identity: {
      givenName: input.firstName,
      familyName: input.lastName,
      dateOfBirth: input.dateOfBirth,
    },
  });

  if (!alpacaAccount) {
    throw new Error("Something went wrong while creating brokerage account");
  }

  const achRelationship = await createAchRelationship<AchRelationshipResponse>(
    alpacaAccount?.id,
    {
      accountNo: alpacaAccount.account_number,
      name: `${input.firstName} ${input.lastName}`,
    },
  );

  if (!achRelationship) {
    throw new Error("Problem creating an ACH relationship");
  }

  const brokerageAccount = prisma.brokerageAccount.create({
    data: {
      userId,
      alpacaAccountId: alpacaAccount.id,
      accountNumber: alpacaAccount.account_number,
      achRelationshipId: achRelationship.id,
      status: "ACTIVE",
    },
  });
}
