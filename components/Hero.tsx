import React, { useEffect, useRef, useState } from 'react';
import CTAButton from './CTAButton';
import { businessImages } from '../data/businessData';
import Link from 'next/link';

const HERO_BG_IMAGE = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop";

const Hero: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const cardRef = useRef<HTMLDivElement>(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const rafRef = useRef<number | null>(null);

    useEffect(() => {
        const container = containerRef.current;
        const card = cardRef.current;

        if (!container || !card) return;

        const handleMouseMove = (e: MouseEvent) => {
            if (rafRef.current) return; // Throttle

            rafRef.current = requestAnimationFrame(() => {
                const { left, top, width, height } = container.getBoundingClientRect();
                const x = (e.clientX - left) / width - 0.5;
                const y = (e.clientY - top) / height - 0.5;
                card.style.transform = `rotateY(${x * 15}deg) rotateX(${-y * 15}deg) translateZ(20px)`;
                rafRef.current = null;
            });
        };

        const handleMouseLeave = () => {
            if (card) {
                card.style.transform = `rotateY(0deg) rotateX(0deg) translateZ(0px)`;
            }
        };

        container.addEventListener('mousemove', handleMouseMove);
        container.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            container.removeEventListener('mousemove', handleMouseMove);
            container.removeEventListener('mouseleave', handleMouseLeave);
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
        };
    }, []);

    useEffect(() => {
        if (!businessImages || businessImages.length === 0) return;
        const interval = setInterval(() => {
            setCurrentImageIndex((prev) => (prev + 1) % businessImages.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    const benefits = [
        { icon: '⚡️', text: 'Save 3+ hours/week' },
        { icon: '📈', text: 'Boost revenue by 20%' },
        { icon: '⭐', text: '4.9/5 Customer Rating' },
    ];

    const currentImage = businessImages && businessImages.length > 0 ? businessImages[currentImageIndex] : null;

    return (
        <section id="home" className="relative pt-32 pb-12 lg:pt-48 lg:pb-20 overflow-hidden min-h-screen flex items-center bg-slate-900">

            <div className="absolute inset-0 z-0">
                <img
                    src={HERO_BG_IMAGE}
                    alt="Background"
                    className="w-full h-full object-cover opacity-80 pointer-events-none select-none"
                />
                <div className="absolute inset-0 bg-slate-900/40 mix-blend-multiply"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/60 to-slate-950"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-16 items-center relative z-10">
                <div className="text-center lg:text-left z-20">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-sm font-medium mb-8 backdrop-blur-md animate-fade-in-up">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                        </span>
                        <span className="tracking-wide uppercase text-xs font-bold">Official Launch • v3.0</span>
                    </div>

                    <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tight text-white leading-[1.1] mb-6 animate-fade-in-up drop-shadow-2xl">
                        Queue Less.
                        <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300 animate-gradient-x">
                            Live More.
                        </span>
                    </h1>

                    <p className="mt-6 text-lg sm:text-xl text-slate-100 max-w-2xl mx-auto lg:mx-0 leading-relaxed animate-fade-in-up font-medium" style={{ animationDelay: '100ms' }}>
                        Stop the stress of manual queue management. The intelligent, globally deployed system that transforms your customer experience and gives you your time back.
                    </p>

                    <div className="mt-10 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
                        <Link href="/signup" passHref>
                            <CTAButton className="w-full sm:w-auto bg-indigo-600 text-white font-bold rounded-full px-8 py-4 hover:bg-indigo-700 shadow-lg shadow-indigo-500/30 transition-all transform hover:scale-105">
                                Start Free Trial
                            </CTAButton>
                        </Link>
                        <Link href="/#how-it-works">
                            <button className="text-sm font-semibold leading-6 text-slate-300 hover:text-white transition-colors flex items-center gap-2 px-4 py-2">
                                Learn more <span aria-hidden="true">→</span>
                            </button>
                        </Link>
                    </div>

                    <div className="mt-10 flex items-center justify-center lg:justify-start gap-6 text-sm text-slate-400 animate-fade-in-up" style={{ animationDelay: '300ms' }}>
                        {benefits.map((benefit, i) => (
                            <div key={i} className="flex items-center gap-2 bg-slate-800/40 px-3 py-1.5 rounded-lg border border-slate-700/50 backdrop-blur-sm">
                                <span>{benefit.icon}</span>
                                <span>{benefit.text}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="relative perspective-1000 hidden lg:block" ref={containerRef}>
                    <div
                        ref={cardRef}
                        className="relative rounded-2xl bg-slate-800/50 backdrop-blur-xl border border-slate-700 p-4 shadow-2xl transition-transform duration-100 ease-out transform-gpu group"
                        style={{ transformStyle: 'preserve-3d' }}
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-600/10 rounded-2xl pointer-events-none"></div>
                        <div className="relative rounded-xl overflow-hidden aspect-[4/3] shadow-inner">
                            {currentImage ? (
                                <img
                                    src={currentImage.src}
                                    alt={currentImage.alt}
                                    className="w-full h-full object-cover transition-all duration-700 hover:scale-110"
                                />
                            ) : (
                                <div className="w-full h-full bg-slate-800 animate-pulse flex items-center justify-center text-slate-600">Loading...</div>
                            )}

                            <div className="absolute bottom-6 left-6 right-6 bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/20 flex items-center gap-4 transform translate-z-10 shadow-lg">
                                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-green-500/30">
                                    ✓
                                </div>
                                <div>
                                    <div className="text-white font-bold text-lg">Queue Active</div>
                                    <div className="text-indigo-200 text-sm">Serving Customer #42</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="absolute -top-12 -right-12 w-64 h-64 bg-purple-500/30 rounded-full blur-3xl pointer-events-none animate-pulse"></div>
                    <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-indigo-500/30 rounded-full blur-3xl pointer-events-none animate-pulse" style={{ animationDelay: '1s' }}></div>
                </div>
            </div>
        </section>
    );
};

export default Hero;