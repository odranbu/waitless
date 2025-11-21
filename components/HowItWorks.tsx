import React from 'react';

const steps = [
    {
        number: '1',
        title: 'Select Service Provider',
        description: 'Choose your desired business within the WaitLess app from anywhere.',
    },
    {
        number: '2',
        title: 'Secure Virtual Position',
        description: 'Join the digital queue instantly and see your estimated wait time.',
    },
    {
        number: '3',
        title: 'Resume Your Day',
        description: 'Utilize your time productively. We’ll notify you when it’s your turn.',
    },
];

const HowItWorks: React.FC = () => {
    return (
        <section id="how-it-works" className="py-12 sm:py-20 bg-slate-900/70">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto">
                    <h2 className="text-3xl font-extrabold text-slate-50 tracking-tight sm:text-4xl">
                        How It Works
                    </h2>
                    <p className="mt-4 text-xl text-slate-300">
                        Joining a virtual queue is as easy as 1, 2, 3.
                    </p>
                </div>

                <div className="mt-16 relative">
                    <div className="absolute top-1/2 left-0 w-full h-0.5 bg-slate-700 hidden md:block" aria-hidden="true"></div>
                    <div className="relative grid grid-cols-1 md:grid-cols-3 gap-12">
                        {steps.map((step, index) => (
                            <div
                                key={step.number}
                                className="text-center animate-fade-in-up"
                                style={{ animationDelay: `${index * 150}ms` }}
                            >
                                <div className="flex items-center justify-center">
                                    <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center ring-8 ring-slate-900/70">
                                        <span className="text-3xl font-bold text-purple-400">{step.number}</span>
                                    </div>
                                </div>
                                <h3 className="mt-6 text-xl font-bold text-slate-50">{step.title}</h3>
                                <p className="mt-2 text-base text-slate-400">{step.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;