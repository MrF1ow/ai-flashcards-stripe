"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/router";

import DefaultLayout from "@/layouts/default";

export default function Dashboard() {
  const { isSignedIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Redirect to home if not signed in, but only after client-side rendering
    if (!isSignedIn) {
      router.push("/");
    }
  }, [isSignedIn, router]);

  return (
    <DefaultLayout>
      <div>Dashboard</div>
    </DefaultLayout>
  );
}
