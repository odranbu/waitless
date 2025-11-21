import React from 'react';

const featureData = [
    {
        icon: '✅',
        title: 'Virtual Queue Entry',
        description: 'Join a virtual queue through the app, eliminating the need for physical presence in a waiting line.',
        subtext: 'Available for restaurants, salons, doctors\' offices'
    },
    {
        icon: '⏱️',
        title: 'Real-time Tracking',
        description: 'Track your position in the virtual queue, receive estimated wait times, and get proactive alerts.',
        subtext: 'Minimize idle waiting with precise timing'
    },
    {
        icon: '📍',
        title: 'Location-based Discovery',
        description: 'Discover nearby businesses that have integrated with the WaitLess virtual queue system.',
        subtext: 'Find and join virtual queues for various establishments'
    },
    {
        icon: '👑',
        title: 'Premium Services',
        description: 'Priority Access offers enhanced benefits for premium members, providing faster service.',
        subtext: 'Bypass longer waits with expedited service'
    },
];

const CheckCircleIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-green-400">
        <path fillRule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.857-9.809a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z" clipRule="evenodd" />
    </svg>
);

const Features: React.FC = () => {
    return (
        <section id="features" className="py-20 sm:py-32">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto">
                    <h2 className="text-3xl font-extrabold text-slate-50 tracking-tight sm:text-4xl">WaitLess App: Core Features</h2>
                    <p className="mt-4 text-xl text-slate-300">
                        Everything you need to transform your waiting experience from a chore into a choice.
                    </p>
                </div>

                <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
                    {featureData.map((feature, index) => (
                        <div
                            key={feature.title}
                            className="bg-slate-800/50 p-8 rounded-2xl border border-slate-700 flex flex-col animate-fade-in-up"
                            style={{ animationDelay: `${index * 100}ms` }}
                        >
                            <div className="text-4xl mb-4">{feature.icon}</div>
                            <h3 className="text-2xl font-bold text-slate-50">{feature.title}</h3>
                            <p className="mt-2 text-slate-400 flex-grow">{feature.description}</p>
                            <div className="mt-6 flex items-center gap-2 text-slate-300">
                                <CheckCircleIcon />
                                <span>{feature.subtext}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;