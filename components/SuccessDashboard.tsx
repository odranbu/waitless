import React, { useState, useEffect, useRef } from 'react';

// Icons for KPIs
const ChartBarIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
  </svg>
);

const UserGroupIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
    <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m-7.5-2.962c.51-.054 1.022-.099 1.531-.132a3 3 0 0 1 2.861 2.41M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 4.5a3.75 3.75 0 0 0 0-7.5A3.75 3.75 0 0 0 12 16.5Zm-3-9a3 3 0 0 1 3-3 3 3 0 0 1 3 3 3 3 0 0 1-3 3 3 3 0 0 1-3-3Zm7.5 0a3 3 0 0 1 3-3 3 3 0 0 1 3 3 3 3 0 0 1-3 3 3 3 0 0 1-3-3Z" />
  </svg>
);

const ClockIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
  </svg>
);

const kpiData = [
  { value: '82%', label: 'Customer Satisfaction', icon: <UserGroupIcon /> },
  { value: '45%', label: 'Staff Efficiency Boost', icon: <ChartBarIcon /> },
  { value: '1-3 PM', label: 'Peak Hours Identified', icon: <ClockIcon /> },
];

const chartData = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  before: [15, 18, 16, 20, 22, 25, 19], // Average wait time in minutes
  after: [4, 5, 4, 6, 5, 7, 5],
};

const SuccessDashboard: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(entries[0].target);
                }
            },
            { threshold: 0.2 }
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

    const LineChart: React.FC = () => {
        const pathLength = 1000;
        const animationDuration = '2s';
        
        const svgWidth = 500;
        const svgHeight = 200;
        const chartTop = 20, chartRight = 20, chartBottom = 40, chartLeft = 45;
        const chartWidth = svgWidth - chartLeft - chartRight;
        const chartHeight = svgHeight - chartTop - chartBottom;

        const maxVal = Math.max(...chartData.before);
        const yAxisMax = Math.ceil(maxVal / 10) * 10; // Round up to nearest 10 (e.g., 25 -> 30)
        
        const generatePath = (data: number[]) => {
            return data.map((point, i) => {
                const x = (i / (data.length - 1)) * chartWidth + chartLeft;
                const y = chartTop + chartHeight - (point / yAxisMax) * chartHeight;
                return `${i === 0 ? 'M' : 'L'} ${x},${y}`;
            }).join(' ');
        };
        
        const yAxisLabels = [0, yAxisMax / 2, yAxisMax];

        return (
            <div className="relative p-6 bg-slate-800/50 backdrop-blur-lg border border-slate-700 rounded-xl">
                <h4 className="text-lg font-semibold text-slate-100 mb-4 text-center">Average Wait Time (Minutes)</h4>
                <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="w-full h-auto" aria-labelledby="chart-title">
                    <title id="chart-title">A line chart showing average wait times before and after implementing WaitLess, reduced from a peak of 25 minutes to around 5 minutes.</title>
                    
                    {/* Y-axis labels and grid lines */}
                    {yAxisLabels.map(val => {
                        const y = chartTop + chartHeight - (val / yAxisMax) * chartHeight;
                        return (
                           <g key={val} className="text-slate-500">
                                <text x={chartLeft - 8} y={y} textAnchor="end" dominantBaseline="middle" fontSize="12" fill="currentColor">
                                    {val}
                                </text>
                                <line x1={chartLeft} y1={y} x2={chartWidth + chartLeft} y2={y} stroke="currentColor" strokeWidth="1" strokeDasharray="2,4" opacity="0.3"/>
                           </g>
                        )
                    })}
                    
                    {/* Before line */}
                    <path
                        d={generatePath(chartData.before)}
                        fill="none"
                        stroke="#f43f5e"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeDasharray={pathLength}
                        strokeDashoffset={pathLength}
                        className={isVisible ? 'animate-draw-line' : ''}
                        style={{ animationDuration }}
                    />
                    {/* After line */}
                     <path
                        d={generatePath(chartData.after)}
                        fill="none"
                        stroke="#818cf8"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeDasharray={pathLength}
                        strokeDashoffset={pathLength}
                        className={isVisible ? 'animate-draw-line' : ''}
                        style={{ animationDuration, animationDelay: '0.5s' }}
                    />

                    {/* X-axis labels */}
                    {chartData.labels.map((label, i) => (
                        <text key={label} x={chartLeft + (i * (chartWidth / (chartData.labels.length - 1)))} y={svgHeight - chartBottom + 15} textAnchor="middle" fill="#94a3b8" fontSize="12">
                            {label}
                        </text>
                    ))}
                </svg>
                 <div className="flex justify-center items-center gap-6 mt-4">
                    <div className="flex items-center gap-2">
                        <span className="w-3 h-3 bg-rose-500 rounded-full"></span>
                        <span className="text-sm text-slate-300">Before WaitLess</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="w-3 h-3 bg-indigo-400 rounded-full"></span>
                        <span className="text-sm text-slate-300">After WaitLess</span>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <section id="dashboard" className="bg-transparent py-20 sm:py-32">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    <h2 className="text-base font-semibold text-indigo-400 tracking-wide uppercase">Your Success Dashboard</h2>
                    <p className="mt-2 text-3xl font-extrabold text-slate-50 tracking-tight sm:text-4xl">
                        Visualize Your Transformation
                    </p>
                    <p className="mt-4 max-w-3xl mx-auto text-xl text-slate-300">
                        Our real-time dashboard gives you a clear view of your operational improvements and customer satisfaction metrics.
                    </p>
                </div>

                <div ref={containerRef} className="mt-16 max-w-5xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                        {kpiData.map((kpi, index) => (
                            <div
                                key={kpi.label}
                                className={`p-6 bg-slate-800/50 backdrop-blur-lg border border-slate-700 rounded-xl flex items-center gap-4 transition-all duration-300 hover:border-indigo-500 hover:bg-slate-800 hover:-translate-y-1 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
                                style={{ animationDelay: `${index * 150}ms` }}
                            >
                                <div className="flex-shrink-0 h-14 w-14 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center">
                                    {kpi.icon}
                                </div>
                                <div>
                                    <div className="text-3xl font-bold text-slate-50">{kpi.value}</div>
                                    <div className="text-sm text-slate-400">{kpi.label}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className={isVisible ? 'animate-fade-in-up' : 'opacity-0'} style={{ animationDelay: '450ms' }}>
                        <LineChart />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SuccessDashboard;