import React from 'react';

const userBenefits = [
    'Reclaim hours each week for more productive activities',
    'Enjoy reduced stress and uncertainty when waiting',
    'Utilize waiting time for other activities',
];

const businessBenefits = [
    'Improve queue management and staff allocation',
    'Reduce lobby congestion and improve customer experience',
    'Increase customer throughput and operational efficiency',
];

const CheckIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-6 h-6 text-green-400 flex-shrink-0">
        <path fillRule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.857-9.809a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z" clipRule="evenodd" />
    </svg>
);

const Benefits: React.FC = () => {
    return (
        <section id="benefits" className="py-20 sm:py-32">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto">
                    <h2 className="text-3xl font-extrabold text-slate-50 tracking-tight sm:text-4xl">
                        Transform Your Waiting Experience
                    </h2>
                    <p className="mt-4 text-xl text-slate-300">
                        WaitLess provides powerful advantages for everyone involved.
                    </p>
                </div>

                <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="bg-gradient-to-br from-purple-600 to-indigo-700 p-8 rounded-2xl animate-fade-in-up">
                        <h3 className="text-2xl font-bold text-white">👤 For Users</h3>
                        <ul className="mt-6 space-y-4">
                            {userBenefits.map((benefit, index) => (
                                <li key={index} className="flex items-start gap-3">
                                    <CheckIcon />
                                    <span className="text-slate-200">{benefit}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="bg-gradient-to-br from-green-600 to-teal-700 p-8 rounded-2xl animate-fade-in-up" style={{ animationDelay: '200ms' }}>
                        <h3 className="text-2xl font-bold text-white">🏢 For Businesses</h3>
                        <ul className="mt-6 space-y-4">
                            {businessBenefits.map((benefit, index) => (
                                <li key={index} className="flex items-start gap-3">
                                    <CheckIcon />
                                    <span className="text-slate-200">{benefit}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Benefits;