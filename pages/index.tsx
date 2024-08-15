import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@clerk/nextjs";

import DefaultLayout from "@/layouts/default";

export default function IndexPage() {
  const router = useRouter();
  const { isSignedIn } = useAuth();

  return (
    <DefaultLayout>
      <div>HELLO WORLD</div>
    </DefaultLayout>
  );
}
