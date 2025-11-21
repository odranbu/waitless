
import React, { useEffect, useState } from 'react';
import '../index.css';
import { AuthProvider } from '../context/AuthContext';
import { loadStripe, Stripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

function MyApp({ Component, pageProps }: any) {
  const [stripePromise, setStripePromise] = useState<Promise<Stripe | null> | null>(null);

  useEffect(() => {
    const initializeStripe = async () => {
      // 1. Check Client-Side Environment Variable
      const localKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
      
      // If localKey exists and IS NOT a placeholder
      if (localKey && !localKey.includes('placeholder')) {
        console.log("WaitLess: Stripe initialized.");
        setStripePromise(loadStripe(localKey));
        return;
      }

      // 2. Check Runtime Configuration (for Docker/Cloud)
      try {
        const res = await fetch('/api/config');
        if (res.ok) {
            const data = await res.json();
            if (data.publishableKey && !data.publishableKey.includes('placeholder')) {
              setStripePromise(loadStripe(data.publishableKey));
            }
        }
      } catch (error) {
        console.log("WaitLess: Stripe running in Demo Mode.");
      }
    };

    initializeStripe();
  }, []);

  return (
    <AuthProvider>
      <Elements stripe={stripePromise}>
        <div className="aurora-bg animate-aurora">
          <Component {...pageProps} />
        </div>
      </Elements>
    </AuthProvider>
  );
}

export default MyApp;
