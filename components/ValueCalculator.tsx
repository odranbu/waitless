import React, { useState, useMemo, useEffect, useRef } from 'react';
// FIX: Removed direct import of server-side function.
// import { getROIAnalysis } from '../services/api';
import CheckoutButton from './CheckoutButton';

const CheckIcon: React.FC<{ className: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className}>
    <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.052-.143z" clipRule="evenodd" />
  </svg>
);

const ValueCalculator: React.FC = () => {
  const [customers, setCustomers] = useState(150);
  const [timeSaved, setTimeSaved] = useState(5);
  const [avgSpend, setAvgSpend] = useState(25);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [analysis, setAnalysis] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  const monthlyTimeSaved = useMemo(() => {
    const hours = (customers * timeSaved * 30) / 60;
    return hours.toLocaleString(undefined, { maximumFractionDigits: 0 });
  }, [customers, timeSaved]);

  const potentialRevenueIncrease = useMemo(() => {
    // Assuming a 5% increase in revenue due to improved satisfaction
    const increase = customers * avgSpend * 30 * 0.05;
    return increase.toLocaleString(undefined, { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
  }, [customers, avgSpend]);

  const handleAnalysis = async () => {
    setLoading(true);
    setError('');
    setAnalysis('');
    try {
      const response = await fetch('/api/ai/roi-analysis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customers,
          timeSaved,
          avgSpend,
        }),
      });

      const contentType = response.headers.get("content-type");
      if (!response.ok || (contentType && contentType.includes("text/html"))) {
        throw new Error('Demo Mode');
      }

      const data = await response.json();
      setAnalysis(data.analysis);
    } catch (e: any) {
      // Mock fallback
      setTimeout(() => {
        setAnalysis(`(Demo) Based on saving ${monthlyTimeSaved} hours monthly, your business could see a significant uplift in efficiency. The projected revenue increase of ${potentialRevenueIncrease} suggests a high ROI for implementing WaitLess.`);
        setLoading(false);
      }, 1000);
      return;
    }
    setLoading(false);
  };


  return (
    <section id="value-calculator" className="bg-transparent py-12 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base font-semibold text-indigo-400 tracking-wide uppercase">ROI Calculator</h2>
          <p className="mt-2 text-3xl font-extrabold text-slate-50 tracking-tight sm:text-4xl">
            See the Value for Your Business
          </p>
          <p className="mt-4 max-w-3xl mx-auto text-xl text-slate-300">
            Adjust the sliders to match your business and see the potential impact of WaitLess.
          </p>
        </div>

        <div ref={containerRef} className="mt-16 max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Left Side: Controls */}
          <div className={`space-y-8 bg-slate-800/50 backdrop-blur-lg border border-slate-700 rounded-xl p-8 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '100ms' }}>
            <div>
              <label htmlFor="customers" className="flex justify-between text-lg font-medium text-slate-100">
                <span>Avg. Daily Customers</span>
                <span className="font-bold text-indigo-400">{customers}</span>
              </label>
              <input
                id="customers"
                type="range"
                min="10"
                max="1000"
                step="10"
                value={customers}
                onChange={(e) => setCustomers(Number(e.target.value))}
                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-500"
              />
            </div>
            <div>
              <label htmlFor="timeSaved" className="flex justify-between text-lg font-medium text-slate-100">
                <span>Avg. Time Saved / Customer</span>
                <span className="font-bold text-indigo-400">{timeSaved} min</span>
              </label>
              <input
                id="timeSaved"
                type="range"
                min="1"
                max="30"
                step="1"
                value={timeSaved}
                onChange={(e) => setTimeSaved(Number(e.target.value))}
                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-500"
              />
            </div>
            <div>
              <label htmlFor="avgSpend" className="flex justify-between text-lg font-medium text-slate-100">
                <span>Avg. Spend / Customer</span>
                <span className="font-bold text-indigo-400">${avgSpend}</span>
              </label>
              <input
                id="avgSpend"
                type="range"
                min="5"
                max="500"
                step="5"
                value={avgSpend}
                onChange={(e) => setAvgSpend(Number(e.target.value))}
                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-500"
              />
            </div>
          </div>

          {/* Right Side: Results */}
          <div className={`rounded-3xl p-8 bg-slate-800/50 backdrop-blur-lg border border-slate-700 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '250ms' }}>
            <h3 className="text-xl font-semibold text-white">Your Estimated Monthly Impact</h3>
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6 text-center">
              <div className="bg-slate-900/50 p-4 rounded-xl">
                <div className="text-4xl font-bold text-indigo-400">{monthlyTimeSaved}</div>
                <div className="text-sm text-slate-300 mt-1">Hours Saved</div>
              </div>
              <div className="bg-slate-900/50 p-4 rounded-xl">
                <div className="text-4xl font-bold text-indigo-400">{potentialRevenueIncrease}</div>
                <div className="text-sm text-slate-300 mt-1">Potential Revenue</div>
              </div>
            </div>
            <div className="mt-6 min-h-[100px]">
              {analysis && <p className="text-slate-300 animate-fade-in ai-generated-bg rounded-md p-4 bg-slate-900/50">{analysis}</p>}
              {error && <p className="text-red-400 animate-fade-in">{error}</p>}
            </div>
            <button
              onClick={handleAnalysis}
              disabled={loading}
              className="w-full mt-4 inline-flex items-center justify-center bg-indigo-500 text-white font-semibold rounded-lg px-6 py-3 hover:bg-indigo-400 transition duration-300 disabled:bg-indigo-400/50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Analyzing...
                </>
              ) : 'Get AI-Powered ROI Analysis'}
            </button>
          </div>
        </div>

        <div className={`mt-16 max-w-lg mx-auto bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl p-8 text-white text-center shadow-2xl shadow-indigo-500/30 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '400ms' }}>
          <h3 className="text-2xl font-bold">Ready to Stop Waiting?</h3>
          <p className="mt-2">One plan. All features. Just <span className="font-bold text-3xl">$29</span>/month.</p>
          <CheckoutButton
            className="w-full mt-6 flex items-center justify-center text-center rounded-lg px-6 py-4 text-base font-semibold leading-6 bg-white text-indigo-600 hover:bg-slate-100 transition-colors duration-300 transform hover:scale-105 disabled:bg-slate-200 disabled:transform-none"
          >
            Start Your 5-Day Free Trial
          </CheckoutButton>
        </div>
      </div>
    </section>
  );
};

export default ValueCalculator;