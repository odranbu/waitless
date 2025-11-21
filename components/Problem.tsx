import React from 'react';

const problems = [
    {
        icon: '🕒',
        title: 'Wasted Time',
        description: 'Physical queues consume valuable time that could be used for more productive activities.'
    },
    {
        icon: '😠',
        title: 'Frustration',
        description: 'Standing in line creates stress and dissatisfaction, especially in uncomfortable environments.'
    },
    {
        icon: '📉',
        title: 'Operational Inefficiency',
        description: 'Traditional queues strain business operations and can deter customers from returning.'
    },
    {
        icon: '💔',
        title: 'Negative Experience',
        description: 'The waiting experience directly impacts customer satisfaction and business reputation.'
    }
];

const Problem: React.FC = () => {
    return (
        <section id="problem" className="py-20 sm:py-32 bg-slate-900/70">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto">
                    <h2 className="text-3xl font-extrabold text-slate-50 tracking-tight sm:text-4xl">
                        The Problem with Traditional Queues
                    </h2>
                    <div className="mt-4 relative inline-block">
                       <div className="absolute inset-0 bg-purple-500 h-1/2 -bottom-1 -z-10 transform -skew-x-12"></div>
                       <p className="relative text-xl text-slate-300">
                           It's not just about the wait; it's about the uncertainty.
                       </p>
                    </div>
                </div>

                <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {problems.map((problem, index) => (
                        <div key={problem.title} className="bg-slate-800 p-8 rounded-2xl border border-slate-700 animate-fade-in-up" style={{animationDelay: `${index * 100}ms`}}>
                            <div className="text-4xl mb-4">{problem.icon}</div>
                            <h3 className="text-xl font-bold text-slate-50">{problem.title}</h3>
                            <p className="mt-2 text-slate-400">{problem.description}</p>
                        </div>
                    ))}
                </div>
                 <p className="mt-16 text-center text-lg italic text-slate-400 max-w-4xl mx-auto">
                    "The worst thing about waiting in line is not the wait itself, but the uncertainty of how long you'll have to wait."
                </p>
            </div>
        </section>
    );
};

export default Problem;