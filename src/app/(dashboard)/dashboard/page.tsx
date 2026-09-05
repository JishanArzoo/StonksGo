import { getSession } from "@/lib/auth/session";
import Image from "next/image";

export default async function Dashboard() {
  const session = await getSession();

  return (
    <>
      <h1 className="text-2xl">
        Welcome, You are authenticated and have a valid session if you are
        seeing this page
      </h1>
      <p>Hello {session?.user.name}</p>
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
