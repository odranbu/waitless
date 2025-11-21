import React, { useState, useEffect, useRef } from 'react';
// FIX: Removed direct import of server-side function
// import { getAITipStream } from '../services/api';

const LightbulbIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-indigo-400">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.311a7.5 7.5 0 0 1-7.5 0c.407.02.813.04 1.224.061a4.5 4.5 0 0 1 4.5 0c.411-.02.817-.04 1.224-.061ZM12 6a2.25 2.25 0 0 1 2.25 2.25v3.375c0 .621-.504 1.125-1.125 1.125h-2.25c-.621 0-1.125-.504-1.125-1.125V8.25A2.25 2.25 0 0 1 12 6Z" />
    </svg>
);

const exampleBusinesses = ['Coffee Shop', 'Retail Store', 'Medical Clinic', 'Hair Salon', 'Restaurant'];

interface AITipsProps {
    businessType?: string;
}

const AITips: React.FC<AITipsProps> = ({ businessType: initialBusinessType }) => {
    const [businessType, setBusinessType] = useState(initialBusinessType || '');
    const [currentBusiness, setCurrentBusiness] = useState(initialBusinessType || '');
    const [tip, setTip] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const generationId = useRef(0);

    const generateTip = async (business: string) => {
        if (!business.trim()) {
            setError('Please enter your business type.');
            return;
        }
        
        const currentGenerationId = ++generationId.current;
        
        setError('');
        setTip('');
        setLoading(true);
        setCurrentBusiness(business);

        try {
            // Attempt real fetch
            const response = await fetch(`/api/ai/tip?businessType=${encodeURIComponent(business)}`);
            
            // Check if we are in a demo environment (static fetch returns 404 or HTML)
            const contentType = response.headers.get("content-type");
            if (!response.ok || (contentType && contentType.includes("text/html"))) {
                 throw new Error('Demo Mode');
            }

            // FIX: Correctly read and decode the streaming response on the client.
            const reader = response.body!.getReader();
            const decoder = new TextDecoder();
            let fullTip = '';
            
            while(true) {
                if (generationId.current !== currentGenerationId) break; 
                const { done, value } = await reader.read();
                if (done) break;
                const chunkText = decoder.decode(value, { stream: true });
                fullTip += chunkText;
                setTip(fullTip);
            }

        } catch (e: any) {
            // DEMO FALLBACK logic for preview environment
            if (generationId.current === currentGenerationId) {
                 // Simulate stream for demo
                 const demoTip = `(Demo) For a ${business}, try implementing a digital sign-in kiosk to reduce perceived wait times by 20% and capture customer data effortlessly.`;
                 let currentText = "";
                 for (const char of demoTip) {
                     if (generationId.current !== currentGenerationId) break;
                     await new Promise(r => setTimeout(r, 20));
                     currentText += char;
                     setTip(currentText);
                 }
            }
        } finally {
            if (generationId.current === currentGenerationId) {
                setLoading(false);
            }
        }
    };

    const handleFormSubmit = () => {
        generateTip(businessType);
    };
    
    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            handleFormSubmit();
        }
    };

    const handleExampleClick = (business: string) => {
      setBusinessType(business);
      generateTip(business);
    }
    
    // Automatically generate tip if businessType is passed as a prop
    useEffect(() => {
        if (initialBusinessType) {
            generateTip(initialBusinessType);
        }
    }, [initialBusinessType]);

    // Cleanup ongoing stream if component unmounts
    useEffect(() => {
        return () => {
            generationId.current += 1;
        };
    }, []);

    return (
        <section id="ai-tips" className="bg-transparent py-20 sm:py-32">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    <h2 className="text-base font-semibold text-indigo-400 tracking-wide uppercase">AI-Powered Insights</h2>
                    <p className="mt-2 text-3xl font-extrabold text-slate-50 tracking-tight sm:text-4xl">
                        Get Instant Queue Management Tips
                    </p>
                    <p className="mt-4 max-w-3xl mx-auto text-xl text-slate-300">
                        Enter your business type below and let our AI, powered by Google Gemini, generate a custom tip to improve your customer flow.
                    </p>
                </div>

                <div className="mt-12 max-w-xl mx-auto">
                    <div className="flex flex-col sm:flex-row gap-4">
                        <label htmlFor="business-type" className="sr-only">Business Type</label>
                        <input
                            id="business-type"
                            type="text"
                            value={businessType}
                            onChange={(e) => setBusinessType(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder="e.g., Coffee Shop, Clinic, Bank"
                            className="flex-grow px-4 py-3 border rounded-lg focus:ring-2 transition duration-150 ease-in-out w-full"
                            disabled={loading}
                            aria-label="Enter your business type"
                        />
                        <button
                            onClick={handleFormSubmit}
                            disabled={loading}
                            className="inline-flex items-center justify-center bg-indigo-600 text-white font-semibold rounded-lg px-6 py-3 hover:bg-indigo-700 transition duration-300 transform hover:scale-105 shadow-lg shadow-indigo-500/30 disabled:bg-indigo-400 disabled:cursor-not-allowed disabled:transform-none"
                            aria-live="polite"
                        >
                            {loading ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Generating...
                                </>
                            ) : 'Get My Tip'}
                        </button>
                    </div>
                     {error && <p className="mt-2 text-sm text-red-400 text-center">{error}</p>}
                     <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
                        <span className="text-sm text-slate-400 mr-2">Or try an example:</span>
                        {exampleBusinesses.map((name) => (
                            <button
                                key={name}
                                onClick={() => handleExampleClick(name)}
                                disabled={loading}
                                className="px-3 py-1 text-sm bg-indigo-500/20 text-indigo-300 rounded-full hover:bg-indigo-500/30 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {name}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="mt-8 min-h-[150px] flex items-center justify-center">
                    {(tip || loading) && (
                        <div className="bg-slate-800/50 backdrop-blur-lg border border-slate-700 rounded-xl p-8 max-w-3xl mx-auto animate-fade-in w-full ai-generated-bg">
                            <div className="flex items-start gap-4">
                                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-indigo-500/20 flex items-center justify-center">
                                    <LightbulbIcon />
                                </div>
                                <div>
                                    <h4 className="text-lg font-bold text-slate-50">Here's a tip for your {currentBusiness}:</h4>
                                    <p className="mt-2 text-slate-300">
                                        {tip}
                                        {loading && <span className="inline-block w-2 h-5 bg-slate-400 animate-pulse ml-1" aria-hidden="true"></span>}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default AITips;