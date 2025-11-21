import React, { useState } from 'react';
import CTAButton from './CTAButton';

// Icons
const BarChartIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
    </svg>
);
const LightbulbIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-yellow-300">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.311a7.5 7.5 0 0 1-7.5 0c.407.02.813.04 1.224.061a4.5 4.5 0 0 1 4.5 0c.411-.02.817-.04 1.224-.061ZM12 6a2.25 2.25 0 0 1 2.25 2.25v3.375c0 .621-.504 1.125-1.125 1.125h-2.25c-.621 0-1.125-.504-1.125-1.125V8.25A2.25 2.25 0 0 1 12 6Z" />
    </svg>
);

interface Recommendation {
    title: string;
    description: string;
}
interface InsightsData {
    peakDay: string;
    peakHours: string;
    keyObservation: string;
    recommendations: Recommendation[];
}

interface PredictiveInsightsProps {
    businessType: string;
}

const PredictiveInsights: React.FC<PredictiveInsightsProps> = ({ businessType }) => {
    const [insights, setInsights] = useState<InsightsData | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleGenerate = async () => {
        setLoading(true);
        setError('');
        setInsights(null);

        try {
            const response = await fetch('/api/ai/predictive-insights', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ businessType }),
            });

            const contentType = response.headers.get("content-type");
            if (!response.ok || (contentType && contentType.includes("text/html"))) {
                throw new Error('Demo Mode');
            }

            const data = await response.json();
            setInsights(data);
        } catch (e: any) {
            // Demo Fallback
            setTimeout(() => {
                setInsights({
                    peakDay: "Saturday",
                    peakHours: "11:00 AM - 2:00 PM",
                    keyObservation: `(Demo) Traffic for ${businessType} businesses typically spikes on weekends, often causing a 25% increase in wait times.`,
                    recommendations: [
                        { title: "Staff Up Early", description: "Schedule one extra staff member starting at 10:30 AM on Saturdays." },
                        { title: "Pre-Registration", description: "Encourage customers to join the queue online before arriving." }
                    ]
                });
                setLoading(false);
            }, 1500);
            return;
        }
        setLoading(false);
    };

    return (
        <section id="ai-insights" className="bg-slate-900/70 backdrop-blur-sm py-20 sm:py-32">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    <h2 className="text-base font-semibold text-indigo-400 tracking-wide uppercase">AI Predictive Insights</h2>
                    <p className="mt-2 text-3xl font-extrabold text-slate-50 tracking-tight sm:text-4xl">
                        Turn Data into Action
                    </p>
                    <p className="mt-4 max-w-3xl mx-auto text-xl text-slate-300">
                        Click the button below to let our AI analyze your typical weekly traffic and provide actionable strategies to improve efficiency and customer satisfaction.
                    </p>
                </div>

                <div className="mt-12 max-w-md mx-auto">
                    <CTAButton
                        onClick={handleGenerate}
                        isLoading={loading}
                        className="w-full inline-flex items-center justify-center bg-indigo-600 text-white font-semibold rounded-lg px-6 py-4 text-lg hover:bg-indigo-700 transition duration-300 transform hover:scale-105 shadow-lg shadow-indigo-500/30 disabled:bg-indigo-400 disabled:cursor-not-allowed disabled:transform-none"
                    >
                        <BarChartIcon />
                        Analyze My Queue Data
                    </CTAButton>
                </div>

                <div className="mt-8 min-h-[200px] flex items-center justify-center">
                    {error && <p className="text-red-400">{error}</p>}
                    {insights && (
                        <div className="w-full max-w-4xl mx-auto bg-slate-800/50 backdrop-blur-lg border border-slate-700 p-8 rounded-2xl animate-fade-in space-y-6">
                            <div>
                                <h3 className="text-xl font-bold text-slate-100">Key Observation</h3>
                                <p className="mt-2 text-slate-300 ai-generated-bg bg-slate-900/50 p-4 rounded-lg">{insights.keyObservation}</p>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-center">
                                <div className="bg-slate-900/50 p-4 rounded-xl">
                                    <div className="text-sm text-slate-400">Peak Day</div>
                                    <div className="text-2xl font-bold text-indigo-400">{insights.peakDay}</div>
                                </div>
                                <div className="bg-slate-900/50 p-4 rounded-xl">
                                    <div className="text-sm text-slate-400">Peak Hours</div>
                                    <div className="text-2xl font-bold text-indigo-400">{insights.peakHours}</div>
                                </div>
                            </div>
                            <div>
                               <h3 className="text-xl font-bold text-slate-100">AI Recommendations</h3>
                               <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {insights.recommendations.map(rec => (
                                        <div key={rec.title} className="bg-slate-900/50 p-4 rounded-lg">
                                            <div className="flex items-center">
                                                <LightbulbIcon />
                                                <h4 className="ml-2 font-semibold text-slate-200">{rec.title}</h4>
                                            </div>
                                            <p className="mt-2 text-sm text-slate-400">{rec.description}</p>
                                        </div>
                                    ))}
                               </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default PredictiveInsights;