import React from 'react';
import Link from 'next/link';

const IndexPage = () => {
  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center overflow-hidden relative">
       {/* Background Glow */}
       <div className="absolute w-[600px] h-[600px] bg-indigo-500/15 rounded-full blur-3xl pointer-events-none transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 z-0"></div>
       
       <div className="relative z-10 w-[90%] max-w-[380px] text-center p-10 bg-slate-800/40 backdrop-blur-xl border border-slate-700/50 rounded-3xl shadow-2xl animate-fade-in-up">
           <div className="w-12 h-12 mx-auto mb-6 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/30">
               <span className="text-white font-bold text-2xl">W</span>
           </div>
           
           <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-300 mb-2">
               WaitLess
           </h1>
           
           <p className="text-slate-400 mb-8 leading-relaxed text-sm">
               Stop waiting, start living.
           </p>
           
           <Link 
             href="/home" 
             className="block w-full py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-center shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40 hover:-translate-y-0.5 transition-all duration-200"
           >
               Enter Application
           </Link>
           
           <div className="mt-6 text-[10px] font-bold text-emerald-500 uppercase tracking-widest">
               v3.0.4 • System Online
           </div>
       </div>
    </div>
  );
};

export default IndexPage;