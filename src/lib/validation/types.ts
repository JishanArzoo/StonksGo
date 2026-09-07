import { BrokerageAccountStatus } from "@/generated/prisma/enums";

export type BrokerageAccountSchema = {
  id: string;
  userId: string;
  alpacaAccountId: string;
  accountNumber: string | null;
  achRelationshipId: string | null;
  status: BrokerageAccountStatus;
  createdAt: Date;
  updatedAt: Date;
};
