// File: app/api/checkout/route.ts
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY as string, {
  apiVersion: "2024-06-20",
});

const formatAmountForStripe = (amount: number, currency: string) => {
  return Math.round(amount * 100);
};

// Handle the POST request
export async function POST(req: NextRequest) {
  try {
    const referer = req.headers.get("referer") || "";

    const params: Stripe.Checkout.SessionCreateParams = {
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "Pro subscription",
            },
            unit_amount: formatAmountForStripe(10, "usd"),
            recurring: {
              interval: "month",
              interval_count: 1,
            },
          },
          quantity: 1,
        },
      ],
      success_url: `${referer}/result?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${referer}/result?session_id={CHECKOUT_SESSION_ID}`,
    };

    const checkoutSession = await stripe.checkout.sessions.create(params);

    return NextResponse.json(checkoutSession, { status: 200 });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    return NextResponse.json({ error: { message: (error as Error).message } }, { status: 500 });
  }
}

// Handle the GET request
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const session_id = searchParams.get("session_id");

  try {
    if (!session_id) {
      throw new Error("Session ID is required");
    }

    const checkoutSession = await stripe.checkout.sessions.retrieve(session_id);

    return NextResponse.json(checkoutSession, { status: 200 });
  } catch (error) {
    console.error("Error retrieving checkout session:", error);
    return NextResponse.json({ error: { message: (error as Error).message } }, { status: 500 });
  }
}
