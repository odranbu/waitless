
import React, { useState } from 'react';
import { useStripe } from '@stripe/react-stripe-js';
import CTAButton from './CTAButton';
import { useAuth } from '../context/AuthContext';

interface CheckoutButtonProps {
    className?: string;
    children: React.ReactNode;
}

const CheckoutButton: React.FC<CheckoutButtonProps> = ({ className, children }) => {
    const [isLoading, setIsLoading] = useState(false);
    const stripe = useStripe();
    const { user } = useAuth();

    const handleCheckout = async () => {
        // 1. Auth Check
        if (!user) {
            window.location.href = '/signup';
            return;
        }

        setIsLoading(true);
        
        try {
            // 2. Request Checkout Session
            const response = await fetch('/api/stripe/checkout-session', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userEmail: user.email }),
            });

            const data = await response.json();

            // 3. Handle Errors from Backend
            if (!response.ok || data.mode === 'error') {
                 throw new Error(data.message || 'Failed to initiate checkout.');
            }

            // 4. Handle Demo Mode / Missing Keys Logic
            // If the server says "mode: demo", it means keys were not found in checkout-session.ts
            if (data.mode === 'demo') {
                console.log("WaitLess: Demo Mode Active.");
                // We alert the user so they know why it's not a real payment
                const proceed = window.confirm(
                    "Stripe Keys are missing in 'pages/api/stripe/checkout-session.ts'.\n\nClick OK to simulate a successful payment (Demo Mode).\nClick Cancel to go back and add keys."
                );
                
                if (proceed && data.url) {
                   window.location.href = data.url;
                }
                return;
            }

            // 5. Handle Real Stripe Redirect
            if (data.url) {
                window.location.href = data.url;
                return;
            }

        } catch (error: any) {
            console.error('Checkout failed:', error);
            alert(`Payment Error: ${error.message}`);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <CTAButton
            onClick={handleCheckout}
            isLoading={isLoading}
            className={className}
        >
            {children}
        </CTAButton>
    );
};

export default CheckoutButton;
