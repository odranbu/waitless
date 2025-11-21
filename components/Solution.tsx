
import React from 'react';

const CheckIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-6 h-6 text-green-400 flex-shrink-0">
        <path fillRule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.857-9.809a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z" clipRule="evenodd" />
    </svg>
);

const Solution: React.FC = () => {
    const solutions = [
        { text: 'Empowers customers with real-time updates, giving them control over their time.' },
        { text: 'Frees up physical space and staff resources, leading to a calmer, more efficient environment.' },
        { text: 'Turns waiting from a negative into a positive, building customer loyalty and satisfaction.' },
    ];

    return (
        <section id="solution" className="py-20 sm:py-32 bg-slate-900 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* Left Column: Coded App Mockup */}
                    <div className="relative animate-fade-in-up flex justify-center order-2 lg:order-1">
                         {/* Ambient Glow Effect */}
                         <div className="absolute -inset-4 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full opacity-30 blur-3xl animate-pulse"></div>
                         
                         {/* Phone Frame */}
                         <div className="relative w-[280px] sm:w-[320px] bg-slate-950 rounded-[3rem] border-[8px] border-slate-900 shadow-2xl overflow-hidden ring-1 ring-white/10 z-10">
                            {/* Notch */}
                            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 h-6 w-32 bg-slate-900 rounded-b-xl z-30"></div>
                            
                            {/* Screen Content */}
                            <div className="h-[580px] bg-gradient-to-b from-slate-900 to-slate-950 relative flex flex-col">
                                {/* App Status Bar */}
                                <div className="pt-3 px-6 flex justify-between items-center text-[10px] text-white font-medium z-20">
                                    <span>9:41</span>
                                    <div className="flex gap-1">
                                        <div className="w-3 h-2 bg-white rounded-[1px]"></div>
                                        <div className="w-2 h-2 bg-white rounded-[1px]"></div>
                                    </div>
                                </div>

                                {/* App Header */}
                                <div className="mt-8 px-6 mb-6 relative z-10">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h3 className="text-white font-bold text-xl">WaitLess</h3>
                                            <p className="text-indigo-400 text-xs font-medium tracking-wide uppercase">Live Queue</p>
                                        </div>
                                        <div className="w-10 h-10 rounded-full bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-lg">
                                            ☕
                                        </div>
                                    </div>
                                </div>

                                {/* Main Card - Queue Status */}
                                <div className="mx-4 bg-gradient-to-br from-indigo-600 to-purple-700 rounded-3xl p-6 shadow-lg text-center relative overflow-hidden mb-6">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-12 -mt-12"></div>
                                    <div className="relative z-10">
                                        <div className="text-indigo-100 text-xs font-bold uppercase mb-2 tracking-wider opacity-80">Your Position</div>
                                        <div className="text-6xl font-extrabold text-white mb-4 tracking-tighter">#4</div>
                                        <div className="inline-flex items-center gap-2 bg-black/20 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/10">
                                            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                                            <span className="text-xs text-white font-bold">Est. Wait: 8m</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Queue Timeline */}
                                <div className="flex-1 px-4 space-y-3 relative">
                                    <div className="absolute left-8 top-4 bottom-4 w-0.5 bg-slate-800"></div>
                                    
                                    <div className="relative flex items-center gap-4 p-3 rounded-xl bg-slate-800/40 border border-slate-700/50 backdrop-blur-sm">
                                        <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-black font-bold text-xs z-10 shadow-lg shadow-green-500/20">✓</div>
                                        <div>
                                            <div className="text-sm font-bold text-slate-200">Joined Queue</div>
                                            <div className="text-xs text-slate-500">9:41 AM • Ticket #42</div>
                                        </div>
                                    </div>

                                    <div className="relative flex items-center gap-4 p-3 rounded-xl bg-slate-800/40 border border-slate-700/50 backdrop-blur-sm">
                                        <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold text-xs z-10 shadow-lg shadow-indigo-500/20">i</div>
                                        <div>
                                            <div className="text-sm font-bold text-slate-200">Order Prepped</div>
                                            <div className="text-xs text-slate-500">In Progress</div>
                                        </div>
                                    </div>
                                </div>

                                {/* Bottom Action */}
                                <div className="p-6 bg-slate-900/80 backdrop-blur-md border-t border-slate-800">
                                    <button className="w-full py-4 bg-white text-indigo-900 font-bold rounded-2xl shadow-lg shadow-indigo-500/10 transform active:scale-95 transition-transform">
                                        View Menu
                                    </button>
                                </div>
                            </div>
                         </div>
                    </div>

                    {/* Right Column: Text Content */}
                    <div className="order-1 lg:order-2 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-900/30 border border-indigo-500/30 text-indigo-300 text-xs font-bold uppercase tracking-wider mb-6">
                            <span className="w-2 h-2 bg-indigo-400 rounded-full"></span>
                            Virtual Queuing
                        </div>
                        <h2 className="text-3xl font-extrabold text-white tracking-tight sm:text-5xl mb-6">
                            The WaitLess Solution
                        </h2>
                        <p className="text-xl text-slate-300 leading-relaxed mb-8">
                            We replace physical lines and stress with a smart, seamless virtual system. Customers wait where they want, and you get happier clients.
                        </p>
                        <div className="space-y-6">
                            {solutions.map((solution, index) => (
                                <div key={index} className="flex items-start gap-4 p-4 rounded-2xl bg-slate-800/30 border border-slate-700 hover:bg-slate-800/50 transition-colors">
                                    <div className="mt-1 bg-green-500/10 p-2 rounded-lg">
                                        <CheckIcon />
                                    </div>
                                    <span className="text-slate-200 text-lg font-medium">{solution.text}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Solution;
