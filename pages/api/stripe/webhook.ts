
import type { NextApiRequest, NextApiResponse } from 'next';
import { buffer } from 'micro';
import Stripe from 'stripe';

// Disable the default body parser so we can verify the Stripe signature stream
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).end('Method Not Allowed');
  }

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  const stripeKey = process.env.STRIPE_SECRET_KEY;

  // ---------------------------------------------------------
  // DEMO MODE SAFETY CHECK
  // If keys are missing or placeholders, just return 200 OK.
  // This stops the server from crashing if a webhook accidentally hits it.
  // ---------------------------------------------------------
  if (!stripeKey || !webhookSecret || stripeKey.includes('placeholder')) {
    console.log("WaitLess: Webhook received. Running in Demo Mode (No verification).");
    return res.status(200).json({ received: true, mode: 'demo' });
  }

  const stripe = new Stripe(stripeKey, {
    apiVersion: '2024-04-10' as any,
  });

  let event: Stripe.Event;

  try {
    const buf = await buffer(req);
    const sig = req.headers['stripe-signature'];

    if (!sig) {
      throw new Error("Missing Stripe Signature");
    }

    event = stripe.webhooks.constructEvent(buf, sig, webhookSecret);
  } catch (err: any) {
    console.error(`Webhook Error: ${err.message}`);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the specific event
  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object as Stripe.Checkout.Session;
      console.log(`WaitLess: Payment successful for Session ID: ${session.id}`);
      break;
    default:
      console.log(`WaitLess: Unhandled event type ${event.type}`);
  }

  res.status(200).json({ received: true });
}
