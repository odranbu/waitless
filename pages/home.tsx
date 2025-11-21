import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Problem from '../components/Problem';
import Solution from '../components/Solution';
import Features from '../components/Features';
import HowItWorks from '../components/HowItWorks';
import Benefits from '../components/Benefits';
import TrustedBy from '../components/TrustedBy';
import SuccessDashboard from '../components/SuccessDashboard';
import Testimonials from '../components/Testimonials';
import Pricing from '../components/Pricing';
import ValueCalculator from '../components/ValueCalculator';
import AITips from '../components/AITips';
import FAQ from '../components/FAQ';
import Footer from '../components/Footer';
import Chatbot from '../components/Chatbot';

const HomePage = () => {
  useEffect(() => {
    // Handle scroll for anchor links if present (e.g. /home#pricing)
    const hash = window.location.hash;
    if (hash && hash.length > 1) {
        const id = hash.replace('#', '');
        setTimeout(() => {
            const element = document.getElementById(id);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }, 100);
    }
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-300">
      <Navbar />
      <main>
        <Hero />
        <Problem />
        <Solution />
        <Features />
        <HowItWorks />
        <Benefits />
        <TrustedBy />
        <SuccessDashboard />
        <Testimonials />
        <Pricing />
        <ValueCalculator />
        <AITips />
        <FAQ />
      </main>
      <Footer />
      <Chatbot />
    </div>
  );
};

export default HomePage;