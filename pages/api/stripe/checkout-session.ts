import type { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).end('Method Not Allowed');
  }

  try {
    const { userEmail } = req.body;

    const protocol = req.headers['x-forwarded-proto'] || 'http';
    const host = req.headers.host;
    const origin = req.headers.origin || (host ? `${protocol}://${host}` : 'http://localhost:3000');

    const HARDCODED_STRIPE_SECRET_KEY = "INSERT_STRIPE_SECRET_KEY_HERE"; 
    const HARDCODED_PRICE_ID = "INSERT_STRIPE_PRICE_ID_HERE";          

    const stripeSecret = process.env.STRIPE_SECRET_KEY || HARDCODED_STRIPE_SECRET_KEY;
    const priceId = process.env.STRIPE_PRICE_ID || HARDCODED_PRICE_ID;

    const isKeyMissing = !stripeSecret || stripeSecret.includes('INSERT_') || stripeSecret === "";
    const isPriceMissing = !priceId || priceId.includes('INSERT_') || priceId === "";

    if (isKeyMissing || isPriceMissing) {
      console.log("WaitLess: Stripe keys are missing or invalid. Activating Demo Mode.");
      await new Promise(resolve => setTimeout(resolve, 1000));

      return res.status(200).json({
        url: `${origin}/dashboard?session_id=demo_${Date.now()}`,
        mode: 'demo',
        message: 'Stripe keys are missing in pages/api/stripe/checkout-session.ts'
      });
    }

    const stripe = new Stripe(stripeSecret, {
        apiVersion: '2024-04-10' as any,
    });

    if (!userEmail) {
      return res.status(400).json({ message: 'User email is required.' });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${origin}/dashboard?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/#pricing`,
      subscription_data: {
        trial_period_days: 5,
      },
      metadata: {
        userId: userEmail,
      },
    });

    res.status(200).json({ id: session.id, url: session.url, mode: 'live' });
  } catch (err: any) {
    console.error('Stripe Session Error:', err.message);
    
    return res.status(400).json({
        mode: 'error',
        message: err.message || "Failed to create Stripe session."
    });
  }
}