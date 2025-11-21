
import React from 'react';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Custom404() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-900 text-white">
      <Navbar />
      <div className="flex-grow flex items-center justify-center px-4">
        <div className="text-center space-y-6 max-w-lg mx-auto">
          <h1 className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-600">404</h1>
          <h2 className="text-2xl font-bold text-white">Page Not Found</h2>
          <p className="text-slate-400">
            The page you are looking for doesn't exist or has been moved.
          </p>
          <Link href="/" className="inline-flex items-center justify-center bg-indigo-600 text-white font-semibold rounded-lg px-8 py-3 hover:bg-indigo-700 transition duration-300 shadow-lg shadow-indigo-500/30">
            Return Home
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}
