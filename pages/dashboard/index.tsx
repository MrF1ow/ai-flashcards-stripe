"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/router";

import DefaultLayout from "@/layouts/default";

export default function Dashboard() {
  return (
    <DefaultLayout>
      <div>Dashboard</div>
    </DefaultLayout>
  );
}
