import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useRouter } from 'next/router';

import BusinessProfile from '../components/BusinessProfile';
import SuccessDashboard from '../components/SuccessDashboard';
import LiveQueueDemo from '../components/LiveQueueDemo';
import AITips from '../components/AITips';
import AINotificationComposer from '../components/AINotificationComposer';
import PredictiveInsights from '../components/PredictiveInsights';

const SuccessIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 mr-3 flex-shrink-0">
      <path fillRule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.857-9.809a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z" clipRule="evenodd" />
    </svg>
);

const CloseIcon: React.FC = () => (
     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
    </svg>
);

const GoogleBadge: React.FC = () => (
    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/10 border border-white/20 text-[10px] font-medium text-slate-300 ml-3 align-middle">
        <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
            <path d="M5.84 14.13c-.22-.66-.35-1.36-.35-2.13s.13-1.47.35-2.13V7.03H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.97l3.66-2.84z" fill="#FBBC05" />
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.03l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
        </svg>
        Verified Account
    </div>
);

const DashboardPage = () => {
    const { user, loading, updateProfile, logout } = useAuth();
    const router = useRouter();
    const [showSuccess, setShowSuccess] = useState(false);

    useEffect(() => {
        if (router.query.session_id) {
            setShowSuccess(true);
            // Clean the URL safely
            const newUrl = window.location.pathname;
            window.history.replaceState(null, '', newUrl);
        }
    }, [router.query.session_id]);

    useEffect(() => {
        if (!loading && !user) {
            router.push('/login');
        }
        if (!loading && user && (!user.businessName || !user.businessType)) {
            router.push('/onboarding');
        }
    }, [user, loading, router]);

    if (loading || !user || !user.businessName || !user.businessType) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-slate-900 text-white gap-4">
                <div className="flex items-center gap-3">
                    <svg className="animate-spin h-6 w-6 text-indigo-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Loading Dashboard...</span>
                </div>
                {/* Safety Valve: Allow logout if stuck in loading state */}
                <button 
                    onClick={logout} 
                    className="text-xs text-slate-500 hover:text-white underline"
                >
                    Stuck? Click here to Reset
                </button>
            </div>
        );
    }

    return (
        <>
            <Navbar />
            <main id="dashboard" className="pt-24 sm:pt-32 pb-20 animate-fade-in">
                 {showSuccess && (
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
                        <div className="bg-green-500/20 border border-green-500 text-green-200 p-4 rounded-lg flex items-center justify-between animate-fade-in">
                            <div className="flex items-center">
                                <SuccessIcon />
                                <span>Welcome! Your subscription is now active. Explore your dashboard and AI tools below.</span>
                            </div>
                            <button onClick={() => setShowSuccess(false)} className="p-1 rounded-full hover:bg-green-500/30 transition-colors">
                                <span className="sr-only">Dismiss</span>
                                <CloseIcon />
                            </button>
                        </div>
                    </div>
                )}
                <header className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-extrabold tracking-tight text-slate-50">
                            Welcome, {user.name}!
                            {user.provider === 'google' && <GoogleBadge />}
                        </h1>
                        <p className="mt-4 text-lg text-slate-300 max-w-3xl mx-auto">
                            Your <b>{user.businessName}</b> dashboard is ready. Use the tools below to manage your queue and get AI insights.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                        <a href="#live-demo" className="group p-6 bg-slate-800/40 border border-slate-700 hover:border-indigo-500 rounded-2xl transition-all duration-300 hover:-translate-y-1">
                            <div className="w-10 h-10 rounded-lg bg-indigo-500/20 flex items-center justify-center text-indigo-400 mb-4 group-hover:scale-110 transition-transform">
                                📱
                            </div>
                            <h3 className="text-lg font-bold text-white">Simulate Queue</h3>
                            <p className="text-slate-400 text-sm mt-2">Use the live phone demo to add customers and manage the line.</p>
                        </a>
                        <a href="#ai-tips" className="group p-6 bg-slate-800/40 border border-slate-700 hover:border-purple-500 rounded-2xl transition-all duration-300 hover:-translate-y-1">
                             <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center text-purple-400 mb-4 group-hover:scale-110 transition-transform">
                                💡
                            </div>
                            <h3 className="text-lg font-bold text-white">Get AI Advice</h3>
                            <p className="text-slate-400 text-sm mt-2">Generate instant tips to improve your customer flow.</p>
                        </a>
                        <a href="#ai-composer" className="group p-6 bg-slate-800/40 border border-slate-700 hover:border-green-500 rounded-2xl transition-all duration-300 hover:-translate-y-1">
                             <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center text-green-400 mb-4 group-hover:scale-110 transition-transform">
                                💬
                            </div>
                            <h3 className="text-lg font-bold text-white">Compose Message</h3>
                            <p className="text-slate-400 text-sm mt-2">Write professional SMS updates for your waiting customers.</p>
                        </a>
                    </div>
                </header>
                
                <div className="mt-8 space-y-24">
                   <div className="border-t border-slate-800 pt-16">
                        <BusinessProfile businessName={user.businessName} businessType={user.businessType} onUpdate={updateProfile} />
                   </div>
                   <SuccessDashboard />
                   <LiveQueueDemo businessType={user.businessType} />

                    <div id="ai-tools" className="space-y-24">
                        <AITips businessType={user.businessType} />
                        <AINotificationComposer businessType={user.businessType} />
                        <PredictiveInsights businessType={user.businessType} />
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
};

export default DashboardPage;