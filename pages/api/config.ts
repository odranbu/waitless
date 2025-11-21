
import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // ==========================================================================================
  //  ↓↓↓ INSERT YOUR STRIPE PUBLIC KEY BELOW ↓↓↓
  // ==========================================================================================
  // Stripe Dashboard -> Developers -> API Keys -> Publishable Key (pk_test_...)
  const HARDCODED_PUBLISHABLE_KEY = "INSERT_STRIPE_PUBLISHABLE_KEY_HERE"; 
  // ==========================================================================================

  // This endpoint exposes the Publishable Key to the client-side app (_app.tsx).
  // It checks .env files first, then falls back to the hardcoded variable above.
  const finalKey = process.env.STRIPE_PUBLISHABLE_KEY || 
                   process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || 
                   HARDCODED_PUBLISHABLE_KEY;

  res.status(200).json({
    publishableKey: finalKey && !finalKey.includes('INSERT_') ? finalKey : "",
  });
}
