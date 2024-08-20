import type { NextApiRequest, NextApiResponse } from 'next'
import Stripe from "stripe";

const formatAmountForStripe = (amount: number, currency: string) => {
  return Math.round(amount * 100);
};

const stripe = new Stripe(
  process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY as string,
  {
    apiVersion: "2024-06-20",
  }
);

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  try {
    const referer = req.headers.referer || "";

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

    res.status(200).json(checkoutSession);
  } catch (error) {
    console.error("Error creating checkout session:", error);
    res.status(500).json({ error: { message: (error as Error).message } });
  }
}

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  const { query } = req;
  const session_id = query.session_id as string;

  try {
    if (!session_id) {
      throw new Error("Session ID is required");
    }

    const checkoutSession = await stripe.checkout.sessions.retrieve(session_id);

    res.status(200).json(checkoutSession);
  } catch (error) {
    console.error("Error retrieving checkout session:", error);
    res.status(500).json({ error: { message: (error as Error).message } });
  }
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "POST":
      return POST(req, res);
    case "GET":
      return GET(req, res);
    default:
      res.status(405).json({ error: "Method not allowed" });
  }
}
