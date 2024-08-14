import { Link } from "@nextui-org/link";
import { Snippet } from "@nextui-org/snippet";
import { Code } from "@nextui-org/code";
import { button as buttonStyles } from "@nextui-org/theme";
import { Button } from "@nextui-org/button";
import { useRouter } from "next/router";

import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import { GithubIcon } from "@/components/icons";
import DefaultLayout from "@/layouts/default";

export default function IndexPage() {
  const router = useRouter();
  const handleSignIn = () => {
    router.push("/sign-in");
  };
  const handleSignUp = () => {
    router.push("/sign-up");
  };
  return (
    <DefaultLayout>
      <Button variant="shadow" size="lg" onClick={handleSignIn}>
        Sign In
      </Button>
      <Button variant="shadow" size="lg" onClick={handleSignUp}>
        Sign Up
      </Button>
    </DefaultLayout>
  );
}
