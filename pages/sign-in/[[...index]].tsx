import { SignIn } from "@clerk/nextjs";

export default function SignUpPage() {
    return <SignIn forceRedirectUrl={process.env.NEXT_PUBLIC_CLERK_REDIRECT_URL}/>;
}