import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import CTAButton from '../components/CTAButton';
import Link from 'next/link';

const GoogleIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
    <path d="M5.84 14.13c-.22-.66-.35-1.36-.35-2.13s.13-1.47.35-2.13V7.03H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.97l3.66-2.84z" fill="#FBBC05" />
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.03l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
  </svg>
);

const LoginPage: React.FC = () => {
    const { login } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState('demo@waitless.app');
    const [password, setPassword] = useState('demo123');

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setIsLoading(true);
        await new Promise(resolve => setTimeout(resolve, 800));
        await login(email, 'email');
        setIsLoading(false);
    };

    const handleGoogleLogin = async () => {
        setIsLoading(true);
        await new Promise(resolve => setTimeout(resolve, 1000));
        await login('alex.google@gmail.com', 'google');
        setIsLoading(false);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-900 px-4">
             <div className="bg-slate-800/50 backdrop-blur-lg border border-slate-700 rounded-2xl shadow-xl w-full max-w-md p-8 animate-fade-in-up">
                <div className="text-center mb-8">
                    <Link href="/" className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-indigo-400 text-transparent bg-clip-text hover:opacity-80 transition-opacity">
                        WaitLess
                    </Link>
                    <h2 className="mt-4 text-2xl font-bold text-white">Welcome Back</h2>
                </div>

                <div className="bg-indigo-500/10 border border-indigo-500/30 rounded-lg p-4 mb-6 text-center">
                    <p className="text-indigo-300 text-sm font-semibold uppercase tracking-wide mb-1">🚧 Demo Mode Active 🚧</p>
                    <p className="text-slate-400 text-xs">Use the pre-filled credentials or click Google Sign In.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                     <div>
                        <label htmlFor="email" className="block text-sm font-medium text-slate-400 mb-1">Email address</label>
                        <input 
                            id="email" 
                            name="email" 
                            type="email" 
                            autoComplete="email" 
                            required 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-3 bg-slate-700 text-white border border-slate-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none placeholder-slate-500 transition-all" 
                        />
                    </div>
                     <div>
                        <label htmlFor="password" className="block text-sm font-medium text-slate-400 mb-1">Password</label>
                        <input 
                            id="password" 
                            name="password" 
                            type="password" 
                            autoComplete="current-password" 
                            required 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-3 bg-slate-700 text-white border border-slate-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none placeholder-slate-500 transition-all" 
                        />
                    </div>

                     <CTAButton
                        type="submit" 
                        isLoading={isLoading}
                        className="w-full bg-purple-600 text-white font-semibold rounded-lg px-6 py-3 hover:bg-purple-700 transition duration-300 transform hover:scale-[1.02] shadow-lg shadow-purple-500/30"
                    >
                         Log In
                    </CTAButton>
                </form>

                <div className="mt-6">
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-slate-600"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-slate-800/50 text-slate-400 backdrop-blur-sm">Or continue with</span>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={handleGoogleLogin}
                        disabled={isLoading}
                        className="mt-6 w-full flex items-center justify-center gap-3 px-4 py-3 border border-slate-600 rounded-lg bg-slate-700/50 hover:bg-slate-700 text-white font-medium transition-all duration-200 hover:border-slate-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <GoogleIcon />
                        Sign in with Google
                    </button>
                </div>
                
                <div className="mt-6 pt-6 border-t border-slate-700 text-center text-sm text-slate-400">
                    Don't have an account?
                    <Link href="/signup" className="font-medium text-purple-400 hover:text-purple-300 ml-2 transition-colors">
                        Start Free Trial
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;