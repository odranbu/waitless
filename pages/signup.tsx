import React from 'react';
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

const SignupPage: React.FC = () => {
    const { login } = useAuth(); 
    const [isLoading, setIsLoading] = React.useState(false);
    const [error, setError] = React.useState('');

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsLoading(true);
        setError('');

        const formData = new FormData(event.currentTarget);
        const email = formData.get('email') as string;

        try {
            await new Promise(resolve => setTimeout(resolve, 1500));
            await login(email, 'email');
        } catch (err: any) {
            setError(err.message || 'Failed to create account. Please try again.');
            setIsLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        setIsLoading(true);
        await new Promise(resolve => setTimeout(resolve, 1000));
        await login('alex.google@gmail.com', 'google');
        setIsLoading(false);
    };

    return (
        <>
        <div className="min-h-screen flex items-center justify-center pt-20 pb-10 px-4 bg-slate-900">
             <div 
                className="bg-slate-800/50 backdrop-blur-lg border border-slate-700 rounded-2xl shadow-xl w-full max-w-md p-8 animate-zoom-in"
            >
                <div className="text-center">
                    <Link href="/" className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-indigo-400 text-transparent bg-clip-text">
                        WaitLess
                    </Link>
                    <h2 className="mt-4 text-3xl font-bold text-white">
                        Create Your Account
                    </h2>
                    <p className="text-slate-400 mt-2">
                        Start your 5-day free trial today.
                    </p>
                </div>
                

                <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                     <div>
                        <label htmlFor="name" className="sr-only">Name</label>
                        <input id="name" name="name" type="text" required className="w-full px-4 py-3 bg-slate-700 text-white border border-slate-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none" placeholder="Your Name" />
                    </div>
                     <div>
                        <label htmlFor="email" className="sr-only">Email address</label>
                        <input id="email" name="email" type="email" autoComplete="email" required className="w-full px-4 py-3 bg-slate-700 text-white border border-slate-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none" placeholder="Email address" />
                    </div>
                     <div>
                        <label htmlFor="password" className="sr-only">Password</label>
                        <input id="password" name="password" type="password" autoComplete="new-password" required className="w-full px-4 py-3 bg-slate-700 text-white border border-slate-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none" placeholder="Password" />
                    </div>

                    {error && <p className="text-sm text-red-400 text-center">{error}</p>}

                     <CTAButton
                        type="submit" isLoading={isLoading}
                        className="w-full bg-purple-600 text-white font-semibold rounded-lg px-6 py-3 hover:bg-purple-700 transition duration-300 transform hover:scale-105 shadow-lg shadow-purple-500/30 disabled:bg-purple-400/50 disabled:transform-none"
                    >
                         Create Account & Start Trial
                    </CTAButton>
                </form>

                <div className="mt-6">
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-slate-600"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-slate-800/50 text-slate-400 backdrop-blur-sm">Or sign up with</span>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={handleGoogleLogin}
                        disabled={isLoading}
                        className="mt-6 w-full flex items-center justify-center gap-3 px-4 py-3 border border-slate-600 rounded-lg bg-slate-700/50 hover:bg-slate-700 text-white font-medium transition-all duration-200 hover:border-slate-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <GoogleIcon />
                        Sign up with Google
                    </button>
                </div>
                
                <p className="mt-6 text-center text-sm text-slate-400">
                    Already have an account?
                    <Link href="/login" className="font-medium text-purple-400 hover:text-purple-300 ml-2">
                        Log in
                    </Link>
                </p>
            </div>
        </div>
        </>
    );
};

export default SignupPage;