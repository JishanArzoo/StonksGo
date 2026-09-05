import axios, { AxiosError } from "axios";
import { alpacaRequest } from "./client";
// import { alpacaRequest } from "./client";

interface RegisterUserParams {
  email: string;
  phone: number;
  streetAddress: string;
  city: string;
  pinCode: string;
  state: string;
  firstName: string;
  lastName: string;
  dob: string;
  taxResidence: string;
  taxID: string;
}

export type CreateAlpacaAccountInput = {
  contact: {
    emailAddress: string;
    phoneNumber: string;
    streetAddress: string;
    city: string;
    postalCode: string;
    state: string;
  };

  identity: {
    taxIdType: string;
    givenName: string;
    familyName: string;
    dateOfBirth: string;
    countryOfTaxResidence: string;
    fundingSource: string[];
    taxId: string;
  };

  disclosures?: unknown;
  trustedContact?: unknown;
  agreements?: unknown[];
  beneficiaries?: unknown[];
  documents?: unknown[];

  accountType: "trading" | "ira";
};

export type AlpacaAccount = {
  id: string;
  account_number?: string;
  status: string;
};

export async function createAlpacaAccount(
  input: CreateAlpacaAccountInput,
): Promise<AlpacaAccount> {
  return alpacaRequest<AlpacaAccount>("accounts", {
    method: "POST",
    body: JSON.stringify({
      contact: {
        email_address: input.contact.emailAddress,
        phone_number: input.contact.phoneNumber,
        street_address: [input.contact.streetAddress],
        city: input.contact.city,
        postal_code: input.contact.postalCode,
        state: input.contact.state,
      },

      identity: {
        tax_id_type: input.identity.taxIdType,
        given_name: input.identity.givenName,
        family_name: input.identity.familyName,
        date_of_birth: input.identity.dateOfBirth,
        country_of_tax_residence: input.identity.countryOfTaxResidence,
        funding_source: input.identity.fundingSource,
        tax_id: input.identity.taxId,
      },

      disclosures: input.disclosures,
      trusted_contact: input.trustedContact,
      agreements: input.agreements,
      beneficiaries: input.beneficiaries,
      documents: input.documents,

      account_type: input.accountType,
    }),
  });
}
