import React, { useState, useEffect, useRef } from 'react';
import { industryQueues } from '../data/businessData';

const AVG_WAIT_PER_PERSON = 3; // minutes

interface LiveQueueDemoProps {
    businessType?: string;
}

const LiveQueueDemo: React.FC<LiveQueueDemoProps> = ({ businessType }) => {
    const getInitialQueue = (type?: string) => {
        // Simple fuzzy matching for industry types if exact match isn't found
        const key = Object.keys(industryQueues).find(k => type?.includes(k)) || 'Default';
        return industryQueues[key] || industryQueues['Default'];
    };

    const [queue, setQueue] = useState<string[]>([]);
    const [userName, setUserName] = useState('');
    const [userInQueue, setUserInQueue] = useState(false);
    const lastServedRef = useRef<string | null>(null);
    
    // FIX: Ref to hold current userName to prevent useEffect dependency loop that resets timer
    const userNameRef = useRef(userName);
    useEffect(() => {
        userNameRef.current = userName;
    }, [userName]);

    useEffect(() => {
        // Reset queue when business type changes
        setQueue(getInitialQueue(businessType));
    }, [businessType]);


    const handleJoinQueue = () => {
        if (userName.trim() && !userInQueue) {
            setQueue(prev => [...prev, userName.trim()]);
            setUserInQueue(true);
        }
    };

    const handleNextCustomer = () => {
        setQueue(prevQueue => {
            if (prevQueue.length > 0) {
                const [next, ...rest] = prevQueue;
                lastServedRef.current = next;
                
                // Check if the served user is the current user (using ref to avoid closure staleness without resetting timer)
                if (userNameRef.current.trim() === next) {
                     // We use a timeout to allow the render cycle to complete before updating state
                     setTimeout(() => {
                        setUserInQueue(false);
                        setUserName('');
                     }, 0);
                }
                return rest;
            }
            return prevQueue;
        });
    };
    
    // Auto-advance the queue every 3.5 seconds (faster demo) to keep it dynamic and "working"
    // FIX: Removed userName from dependency array to prevent timer reset while typing
    useEffect(() => {
        const interval = setInterval(() => {
            handleNextCustomer();
        }, 3500); 
        return () => clearInterval(interval);
    }, []); 

    // Calculate position based on current queue state
    const userPosition = userInQueue ? queue.indexOf(userName.trim()) + 1 : 0;
    const userWaitTime = userPosition * AVG_WAIT_PER_PERSON;

    return (
        <section id="live-demo" className="bg-transparent py-20 sm:py-32">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    <h2 className="text-base font-semibold text-indigo-400 tracking-wide uppercase">See It In Action</h2>
                    <p className="mt-2 text-3xl font-extrabold text-slate-50 tracking-tight sm:text-4xl">
                        Experience WaitLess Firsthand
                    </p>
                    <p className="mt-4 max-w-3xl mx-auto text-xl text-slate-300">
                        This is a live, interactive demo. Use the customer phone to join the queue and the business dashboard to manage it.
                    </p>
                </div>

                <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                    {/* Customer View */}
                    <div className="flex flex-col items-center">
                        <h3 className="text-xl font-bold text-slate-100 mb-4">Customer View</h3>
                        <div className="w-full max-w-sm mx-auto bg-slate-800 border-8 border-slate-700 rounded-[2.5rem] p-4 shadow-2xl shadow-indigo-500/10 transform transition-transform hover:scale-[1.01]">
                            <div className="bg-slate-900 rounded-2xl p-6 h-96 flex flex-col justify-between relative overflow-hidden">
                                {/* Status Bar Mockup */}
                                <div className="absolute top-0 left-0 right-0 h-6 bg-black/20 flex justify-between px-4 items-center">
                                    <span className="text-[10px] text-white">9:41</span>
                                    <div className="flex gap-1">
                                        <div className="w-3 h-2 bg-white rounded-sm"></div>
                                        <div className="w-2 h-2 bg-white rounded-sm"></div>
                                    </div>
                                </div>

                                <div className="mt-6 flex-grow flex flex-col justify-center">
                                    {!userInQueue ? (
                                        <div className="animate-fade-in">
                                            <div className="w-12 h-12 bg-indigo-600 rounded-xl mx-auto mb-4 flex items-center justify-center text-white font-bold text-xl">W</div>
                                            <h4 className="font-bold text-white text-center text-xl">Join the Queue</h4>
                                            <p className="text-sm text-center mt-2 text-slate-400 mb-6">Enter your name to see how it works.</p>
                                            <div className="space-y-3">
                                                <input
                                                    type="text"
                                                    value={userName}
                                                    onChange={(e) => setUserName(e.target.value)}
                                                    placeholder="Your Name"
                                                    className="w-full px-4 py-3 bg-slate-800 border border-slate-600 text-white rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none placeholder-slate-500"
                                                />
                                                <button
                                                    onClick={handleJoinQueue}
                                                    disabled={!userName.trim()}
                                                    className="w-full bg-indigo-600 text-white font-bold rounded-xl px-4 py-3 hover:bg-indigo-500 transition duration-300 disabled:bg-slate-700 disabled:text-slate-500"
                                                >
                                                    Join Now
                                                </button>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="text-center animate-fade-in">
                                            <div className="inline-block px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-xs font-bold mb-4 border border-green-500/30">
                                                ✓ CHECKED IN
                                            </div>
                                            <h4 className="font-bold text-indigo-400 uppercase tracking-widest text-xs">Your Position</h4>
                                            <p className="text-7xl font-extrabold text-white my-4 tracking-tighter">{userPosition}</p>
                                            
                                            <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
                                                <p className="text-slate-400 text-xs uppercase font-semibold">Est. Wait Time</p>
                                                <p className="text-2xl font-bold text-white mt-1">~{userWaitTime} <span className="text-sm font-normal text-slate-400">min</span></p>
                                            </div>
                                             <p className="text-xs text-slate-500 mt-6">We'll text you when it's your turn.</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Business Dashboard */}
                     <div className="bg-slate-800/50 backdrop-blur-lg border border-slate-700 p-8 rounded-2xl h-full shadow-xl">
                         <h3 className="text-xl font-bold text-slate-100 text-center mb-4 flex items-center justify-center gap-2">
                            <span>Business Dashboard</span>
                            <span className="flex h-2 w-2 relative">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                            </span>
                         </h3>
                        <div className="bg-slate-900/80 rounded-xl p-4 min-h-[384px] flex flex-col border border-slate-800/50">
                           <div className="flex justify-between items-center pb-4 border-b border-slate-700/50">
                                <h4 className="font-semibold text-lg text-white">Queue List <span className="ml-2 text-xs bg-indigo-600 px-2 py-0.5 rounded-full">{queue.length}</span></h4>
                                <button
                                    onClick={handleNextCustomer}
                                    disabled={queue.length === 0}
                                    className="bg-white text-indigo-900 font-bold text-xs rounded-lg px-4 py-2 hover:bg-indigo-50 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Call Next
                                </button>
                           </div>
                            <div className="mt-4 flex-grow overflow-y-auto pr-2 custom-scrollbar">
                                <ul className="space-y-2">
                                    {queue.map((name, index) => (
                                        <li key={`${name}-${index}`} className="flex items-center justify-between bg-slate-800/50 p-3 rounded-lg border border-slate-700/50 hover:border-indigo-500/30 transition-colors animate-fade-in-up" style={{ animationDelay: `${index * 50}ms` }}>
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-indigo-400 font-bold text-sm border border-slate-600">
                                                    {index + 1}
                                                </div>
                                                <span className="text-slate-200 font-medium">{name}</span>
                                            </div>
                                            <span className="text-xs text-slate-500 font-mono">~{(index + 1) * AVG_WAIT_PER_PERSON}m</span>
                                        </li>
                                    ))}
                                    {queue.length === 0 && (
                                        <li className="text-center text-slate-500 py-12 flex flex-col items-center">
                                            <span className="text-4xl mb-2 opacity-30">☕️</span>
                                            All caught up!
                                        </li>
                                    )}
                                </ul>
                            </div>
                            <div className="mt-4 pt-3 border-t border-slate-800 text-center">
                                <p className="text-xs text-slate-500 uppercase tracking-wider">Just Served</p>
                                <p className="font-semibold text-indigo-300 mt-1">{lastServedRef.current || 'Waiting for customers...'}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default LiveQueueDemo;