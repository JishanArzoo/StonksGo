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
    taxIdType?: string;
    givenName: string;
    familyName: string;
    dateOfBirth: string;
    countryOfTaxResidence?: string;
    fundingSource?: string[];
    taxId?: string;
  };

  disclosures?: unknown;
  trustedContact?: unknown;
  agreements?: unknown[];
  beneficiaries?: unknown[];
  documents?: unknown[];

  accountType?: "trading" | "ira";
};

export type AlpacaAccount = {
  id: string;
  account_number?: string;
  status: string;
};

export async function createAlpacaAccount(
  input: CreateAlpacaAccountInput,
): Promise<AlpacaAccount> {
  return alpacaRequest<AlpacaAccount>("/accounts", {
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
        tax_id_type: "USA_SSN",
        given_name: input.identity.givenName,
        family_name: input.identity.familyName,
        date_of_birth: input.identity.dateOfBirth,
        country_of_tax_residence: "IND",
        funding_source: ["savings"],
        tax_id: "111-55-4321",
      },

      disclosures: {
        is_control_person: true,
        is_affiliated_exchange_or_finra: true,
        is_politically_exposed: true,
        immediate_family_exposed: true,
        context: [
          {
            context_type: "CONTROLLED_FIRM",
            company_name: "StonksGo",
            company_street_address: "Del21",
            company_city: "del",
            company_state: "hr",
            company_country: "Ind",
            company_compliance_email: "stonksgo@gmeail.comba",
            given_name: "Stonks",
            family_name: "Go",
          },
        ],
      },
      trusted_contact: {
        given_name: "hq",
        family_name: "myapp",
        street_address: ["street"],
        phone_number: "hq@gmyeaiill.com",
        email_address: "jane.doe@example.com",
        city: "del",
        state: "del",
        postal_code: "110001",
        country: "USA",
      },
      agreements: [
        {
          agreement: "account_agreement",
          signed_at: "2019-09-11T18:09:33Z",
          ip_address: "185.13.21.99",
        },
        {
          agreement: "customer_agreement",
          signed_at: "2019-09-11T18:09:33Z",
          ip_address: "185.13.21.99",
        },
        {
          agreement: "margin_agreement",
          signed_at: "2019-09-11T18:09:33Z",
          ip_address: "185.13.21.99",
        },
      ],
      beneficiaries: [
        {
          given_name: "Unknown",
          middle_name: "P",
          family_name: "Doe",
          date_of_birth: "1970-01-01",
          tax_id: "xxx-xx-xxxx",
          tax_id_type: "USA_SSN",
          relationship: "spouse",
          type: "primary",
          share_pct: "100",
        },
      ],
      documents: [
        {
          document_type: "account_approval_letter",
          content: "/9j/Cg==",
          mime_type: "image/jpeg",
        },
      ],

      account_type: "trading",
    }),
  });
}
