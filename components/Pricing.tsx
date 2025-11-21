import React from 'react';
import CheckoutButton from './CheckoutButton';

const CheckIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-green-400 mr-2 flex-shrink-0">
        <path fillRule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.857-9.809a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z" clipRule="evenodd" />
    </svg>
);

const Pricing: React.FC = () => {
    const features = [
        'Full access to all features',
        'Unlimited queue entries',
        'Real-time analytics',
        '24/7 email support',
        'Cancel anytime',
    ];

    return (
        <section id="pricing" className="py-12 sm:py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto">
                    <h2 className="text-3xl font-extrabold text-slate-50 tracking-tight sm:text-4xl">Simple, Transparent Pricing</h2>
                    <p className="mt-4 text-xl text-slate-300">
                        One plan, all features. No hidden fees, no long-term contracts.
                    </p>
                </div>

                <div className="mt-12 max-w-2xl mx-auto grid lg:grid-cols-5 gap-8 items-center bg-slate-800/50 backdrop-blur-lg rounded-3xl ring-2 ring-purple-500 p-8 animate-zoom-in">
                    <div className="lg:col-span-3">
                        <h3 className="text-2xl font-bold text-purple-300">5 Days Free Trial</h3>
                        <p className="text-slate-300 mt-2">Full access, no credit card required to sign up. Experience the full power of WaitLess risk-free.</p>
                        <ul className="mt-6 space-y-2">
                            {features.map(feature => (
                                <li key={feature} className="flex items-center text-slate-200">
                                    <CheckIcon />
                                    <span>{feature}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="lg:col-span-2 text-center lg:border-l lg:border-slate-700 lg:pl-8">
                        <p className="text-slate-300">Then just</p>
                        <p className="text-5xl font-extrabold text-white my-2">$29<span className="text-lg font-medium text-slate-400">/mo</span></p>
                        <p className="text-slate-400 text-sm">Less than $1 per day for unlimited use.</p>
                        <CheckoutButton
                            className="w-full mt-6 bg-purple-600 text-white font-semibold rounded-lg px-6 py-3 hover:bg-purple-700 transition duration-300 transform hover:scale-105 shadow-lg shadow-purple-500/30"
                        >
                            Start Your Free Trial
                        </CheckoutButton>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Pricing;