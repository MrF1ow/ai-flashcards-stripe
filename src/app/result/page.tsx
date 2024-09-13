"use client";

import { useSearchParams } from "next/navigation";
import React, { useEffect, useState, Suspense } from "react";
import { CircularProgress } from "@nextui-org/progress";
import { StripeCustomCheckoutSession } from "@stripe/stripe-js";

import { title } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";

const ResultPageContent = () => {
  const searchParams = useSearchParams();
  const session_id = searchParams.get("session_id");

  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState<StripeCustomCheckoutSession | null>(
    null
  );
  const [error, setError] = useState<string | object | null>(null);

  useEffect(() => {
    const fetchCheckoutSession = async () => {
      if (!session_id) return;
      try {
        const res = await fetch(
          `/api/checkout?session_id=${session_id}`
        );
        const sessionData = await res.json();

        if (res.ok) {
          setSession(sessionData);
        } else {
          setError(sessionData.error);
        }
      } catch (err) {
        setError("An error occurred while retrieving the session.");
      } finally {
        setLoading(false);
      }
    };

    fetchCheckoutSession();
  }, [session_id]);

  if (loading) {
    return (
      <DefaultLayout>
        <div className="flex justify-center items-center h-[80vh]">
          <CircularProgress size="lg" />
          <div className="p-8">
            <h1 className={title({ size: "sm" })}>Loading ...</h1>
          </div>
        </div>
      </DefaultLayout>
    );
  }

  if (error) {
    return (
      <DefaultLayout>
        <div className="flex justify-center items-center h-[80vh]">
          <div className="p-8">
            <h1 className={title({ size: "sm" })}>
              {typeof error === "string" ? error : JSON.stringify(error)}
            </h1>
          </div>
        </div>
      </DefaultLayout>
    );
  }

  if (!session) {
    return (
      <DefaultLayout>
        <div className="flex justify-center items-center h-[80vh]">
          <div className="p-8">
            <h1 className={title({ size: "sm" })}>
              No session found with the ID {session_id}.
            </h1>
          </div>
        </div>
      </DefaultLayout>
    );
  }

  return (
    <DefaultLayout>
      <div className="flex justify-center items-center h-[80vh]">
        {session.status.type === "complete" ? (
          session.status.paymentStatus === "paid" ? (
            <div className="p-8">
              <h1 className={title({ size: "sm" })}>
                Thank you for your purchase! Your session ID is {session_id}.
              </h1>
            </div>
          ) : (
            <div className="p-8">
              <h1 className={title({ size: "sm" })}>
                Your payment was not successful. Please try again.
              </h1>
            </div>
          )
        ) : (
          <div className="p-8">
            <h1 className={title({ size: "sm" })}>
              Session status: {session.status.type}
            </h1>
          </div>
        )}
      </div>
    </DefaultLayout>
  );
};

const ResultPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResultPageContent />
    </Suspense>
  );
};

export default ResultPage;
