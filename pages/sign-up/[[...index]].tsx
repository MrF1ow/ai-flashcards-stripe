import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <SignUp forceRedirectUrl={process.env.NEXT_PUBLIC_CLERK_REDIRECT_URL} />
  );
}
