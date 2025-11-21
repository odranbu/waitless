
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/router';

const businessTypes = [
    { name: 'Cafe', icon: '☕' },
    { name: 'Retail', icon: '🛍️' },
    { name: 'Clinic', icon: '⚕️' },
    { name: 'Salon', icon: '💇' },
    { name: 'Restaurant', icon: '🍽️' },
    { name: 'Other', icon: '🏢' },
];

const OnboardingPage: React.FC = () => {
    const [selectedType, setSelectedType] = useState<string | null>(null);
    const [name, setName] = useState('');
    const { user, loading, updateProfile } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !user) {
            router.replace('/login');
        }
    }, [user, loading, router]);

    const handleComplete = () => {
        if (selectedType && name.trim()) {
            updateProfile({ name: name.trim(), type: selectedType });
            router.push('/dashboard');
        }
    };

    if (loading || !user) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white">
                <div className="flex flex-col items-center gap-4">
                    <svg className="animate-spin h-8 w-8 text-indigo-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <p className="text-slate-400">Loading profile...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center pt-24 pb-12 animate-fade-in px-4 bg-slate-900">
            <div className="max-w-3xl w-full mx-auto text-center">
                <div className="bg-slate-800/50 backdrop-blur-lg border border-slate-700 rounded-2xl p-8 sm:p-12 shadow-xl">
                    <h1 className="text-4xl font-extrabold tracking-tight text-slate-50">
                        Tell us about your business
                    </h1>
                    <p className="mt-4 text-lg text-slate-300">
                        This will help us personalize your dashboard and AI-powered tools.
                    </p>

                    <div className="mt-8">
                        <label htmlFor="business-name" className="sr-only">Business Name</label>
                        <input
                            id="business-name" type="text" value={name} onChange={(e) => setName(e.target.value)}
                            placeholder="Enter Your Business Name"
                            className="w-full max-w-md mx-auto px-4 py-3 bg-slate-700 text-white border border-slate-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
                        />
                    </div>

                    <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-4">
                        {businessTypes.map((type) => (
                            <button
                                key={type.name}
                                onClick={() => setSelectedType(type.name)}
                                className={`p-6 rounded-xl border-2 transition-all duration-200 flex flex-col items-center justify-center ${
                                    selectedType === type.name
                                        ? 'bg-purple-600 border-purple-400 scale-105 shadow-lg shadow-purple-500/20'
                                        : 'bg-slate-800 border-slate-700 hover:border-purple-500'
                                }`}
                            >
                                <div className="text-4xl mb-2">{type.icon}</div>
                                <div className="font-semibold text-slate-50">{type.name}</div>
                            </button>
                        ))}
                    </div>

                    <div className="mt-10">
                        <button
                            onClick={handleComplete}
                            disabled={!selectedType || !name.trim()}
                            className="w-full max-w-xs inline-flex items-center justify-center text-center bg-purple-600 text-white font-semibold rounded-lg px-6 py-3 hover:bg-purple-700 transition duration-300 transform hover:scale-105 shadow-lg shadow-purple-500/30 disabled:bg-purple-400/50 disabled:cursor-not-allowed disabled:transform-none"
                        >
                            Continue to Dashboard
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OnboardingPage;
