import { getBrokerageAccountByUserId } from "@/actions/brokerage/get-brokerage-account";
import { getSession } from "@/lib/auth/session";
import { BrokerageAccountSchema } from "@/lib/validation/types";
import Image from "next/image";

export default async function Dashboard() {
  const session = await getSession();
  const brokerageAccount =
    await getBrokerageAccountByUserId<BrokerageAccountSchema>();
  return (
    <>
      <h1 className="text-2xl">
        Welcome, You are authenticated and have a valid session if you are
        seeing this page
      </h1>
      <p>Hello {session?.user.name}</p>
      <p>Your Alpaca Brokerage Account No: {brokerageAccount?.accountNumber}</p>
      <Image
        src={session?.user.image ?? ""}
        alt="user-profile"
        className="rounded-full"
        width={200}
        height={200}
      />
    </>
  );
}
