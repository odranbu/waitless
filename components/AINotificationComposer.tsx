import React, { useState } from 'react';
import CTAButton from './CTAButton';

const MessageIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.325 3.218.08 6.075-.933 8.3-2.67.292-.17.552-.37.787-.597L21 21l-2.755-4.133a1.14 1.14 0 0 1 .11-1.586.487.487 0 0 0-.62-.62l-1.586.11a1.14 1.14 0 0 1-1.586-.11Z" />
    </svg>
);

const CopyIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 8.25V6a2.25 2.25 0 0 0-2.25-2.25H6A2.25 2.25 0 0 0 3.75 6v8.25A2.25 2.25 0 0 0 6 16.5h2.25m8.25-8.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-7.5A2.25 2.25 0 0 1 8.25 18v-1.5m8.25-8.25h-6.75" />
    </svg>
);

interface AINotificationComposerProps {
    businessType?: string;
}

const placeholderMap: Record<string, string> = {
    'Cafe': "e.g., '15 min delay', 'Free coffee with your order'",
    'Retail': "e.g., 'Fitting room is ready', '10% off your next purchase'",
    'Clinic': "e.g., 'The doctor is running 10 mins late', 'Please have your ID ready'",
    'Salon': "e.g., 'Your stylist is ready now', '20% off hair products today'",
    'Restaurant': "e.g., 'Your table for 4 is ready', 'Free dessert for the wait'",
    'Default': "e.g., '15 min delay', 'Thank you for your patience'",
}


const AINotificationComposer: React.FC<AINotificationComposerProps> = ({ businessType }) => {
    const [scenario, setScenario] = useState('delay');
    const [tone, setTone] = useState('friendly');
    const [details, setDetails] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [copied, setCopied] = useState(false);

    const handleGenerate = async () => {
        if (!details.trim()) {
            setError('Please provide some key details for the message.');
            return;
        }
        setError('');
        setMessage('');
        setLoading(true);

        try {
            const response = await fetch('/api/ai/notification', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ scenario, tone, details }),
            });

            const contentType = response.headers.get("content-type");
            if (!response.ok || (contentType && contentType.includes("text/html"))) {
                throw new Error('Demo Mode');
            }

            const data = await response.json();
            setMessage(data.message);
        } catch (e: any) {
            // Fallback for Demo
             setTimeout(() => {
                const demoMsg = `[Demo] Hi there! We wanted to let you know about a ${scenario}: ${details}. Thanks for your patience! (${tone} tone)`;
                setMessage(demoMsg);
                setLoading(false);
            }, 1000);
            return;
        } 
        setLoading(false);
    };

    const handleCopy = () => {
        if (message) {
            navigator.clipboard.writeText(message);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    const placeholderText = placeholderMap[businessType || 'Default'] || placeholderMap['Default'];

    return (
        <section id="ai-composer" className="bg-slate-900/70 backdrop-blur-sm py-20 sm:py-32">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    <h2 className="text-base font-semibold text-indigo-400 tracking-wide uppercase">AI-Powered Communication</h2>
                    <p className="mt-2 text-3xl font-extrabold text-slate-50 tracking-tight sm:text-4xl">
                        Craft Perfect Customer Notifications
                    </p>
                    <p className="mt-4 max-w-3xl mx-auto text-xl text-slate-300">
                        Let AI help you write clear, friendly, and effective SMS messages to keep your waiting customers informed and happy.
                    </p>
                </div>

                <div className="mt-16 max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                    {/* Form Controls */}
                    <div className="space-y-6 bg-slate-800/50 backdrop-blur-lg border border-slate-700 p-8 rounded-2xl">
                         <div>
                            <label htmlFor="scenario" className="block text-sm font-medium text-slate-300">Message Scenario</label>
                            <select id="scenario" value={scenario} onChange={e => setScenario(e.target.value)} className="mt-1 block w-full pl-3 pr-10 py-2 text-base focus:outline-none sm:text-sm rounded-md">
                                <option value="delay">Apologize for a delay</option>
                                <option value="promotion">Share a promotion</option>
                                <option value="update">Provide a general update</option>
                            </select>
                        </div>
                         <div>
                            <label htmlFor="tone" className="block text-sm font-medium text-slate-300">Tone of Voice</label>
                            <select id="tone" value={tone} onChange={e => setTone(e.target.value)} className="mt-1 block w-full pl-3 pr-10 py-2 text-base focus:outline-none sm:text-sm rounded-md">
                                <option value="friendly">Friendly</option>
                                <option value="formal">Formal</option>
                                <option value="empathetic">Empathetic</option>
                                <option value="upbeat">Upbeat</option>
                            </select>
                        </div>

                        <div>
                            <label htmlFor="details" className="block text-sm font-medium text-slate-300">Key Details</label>
                            <textarea
                                id="details"
                                rows={4}
                                value={details}
                                onChange={e => setDetails(e.target.value)}
                                placeholder={placeholderText}
                                className="mt-1 block w-full shadow-sm sm:text-sm rounded-md"
                            />
                        </div>

                         <CTAButton
                            onClick={handleGenerate}
                            isLoading={loading}
                            disabled={!details.trim()}
                            className="w-full inline-flex items-center justify-center bg-indigo-600 text-white font-semibold rounded-lg px-6 py-3 hover:bg-indigo-700 transition duration-300 transform hover:scale-105 shadow-lg shadow-indigo-500/30 disabled:bg-indigo-400 disabled:cursor-not-allowed disabled:transform-none"
                        >
                            Generate Message
                        </CTAButton>
                        {error && <p className="text-sm text-red-400">{error}</p>}
                    </div>

                    {/* Output */}
                    <div className="bg-slate-800/50 backdrop-blur-lg border border-slate-700 p-8 rounded-2xl h-full flex flex-col min-h-[420px]">
                        <h4 className="text-lg font-semibold text-white flex items-center"><MessageIcon /> Generated SMS Message</h4>
                        <div className="mt-4 flex-grow bg-slate-900/50 rounded-lg p-4 text-slate-300 min-h-[150px] ai-generated-bg">
                             {loading && <p className="animate-pulse">Generating your message...</p>}
                             {!loading && !message && <p>Your generated message will appear here.</p>}
                             {message && <p className="whitespace-pre-wrap">{message}</p>}
                        </div>
                        {message && (
                            <button onClick={handleCopy} className="mt-4 w-full inline-flex items-center justify-center bg-indigo-500 text-white font-semibold rounded-lg px-4 py-2 hover:bg-indigo-400 transition duration-300">
                                <CopyIcon className="w-5 h-5 mr-2" />
                                {copied ? 'Copied!' : 'Copy to Clipboard'}
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AINotificationComposer;