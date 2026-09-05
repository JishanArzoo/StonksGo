import { GoogleSignInButton } from "@/components/auth/GoogleSignInButton";

export default function LoginPage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-0 ">
      <h1>Welcome to StonksGo</h1>
      <p>Sign in to access your brokerage account.</p>

      <GoogleSignInButton />
    </main>
  );
}
