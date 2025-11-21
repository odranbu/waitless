import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import CTAButton from './CTAButton';
import Link from 'next/link';

const SearchIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
  </svg>
);

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const { user, logout } = useAuth();
  const isLoggedIn = !!user;

  const marketingLinks = [
    { href: '/home#features', label: 'Features' },
    { href: '/home#how-it-works', label: 'How it Works' },
    { href: '/home#pricing', label: 'Pricing' },
    { href: '/home#testimonials', label: 'Stories' },
  ];

  const appLinks = [
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/dashboard#live-demo', label: 'Live Demo' },
    { href: '/dashboard#ai-tools', label: 'AI Studio' },
  ];

  const navLinks = isLoggedIn ? appLinks : marketingLinks;

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                setIsScrolled(window.scrollY > 20);
                ticking = false;
            });
            ticking = true;
        }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);
  
  const handleMobileClick = (action?: () => void) => {
    setIsOpen(false);
    if (action) action();
  }

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const term = (e.target as HTMLInputElement).value.toLowerCase();
      
      const sectionMap: { [key: string]: string } = {
        'price': 'pricing',
        'cost': 'pricing',
        'plan': 'pricing',
        'feature': 'features',
        'demo': 'live-demo',
        'try': 'live-demo',
        'ai': 'ai-tips',
        'tip': 'ai-tips',
        'faq': 'faq',
        'how': 'how-it-works',
        'review': 'testimonials',
        'story': 'testimonials',
        'login': '/login',
        'sign': '/signup',
        'start': '/signup',
        'job': 'footer',
        'career': 'footer'
      };

      let found = false;
      for (const key in sectionMap) {
        if (term.includes(key)) {
          const target = sectionMap[key];
          if (target.startsWith('/')) {
              window.location.href = target;
              return;
          }
          
          const element = document.getElementById(target);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            setIsSearchOpen(false);
            found = true;
            return;
          }
        }
      }
      
      if (!found) {
          e.currentTarget.classList.add('ring-red-500');
          setTimeout(() => {
              e.currentTarget.classList.remove('ring-red-500');
          }, 500);
      }
    }
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${isScrolled ? 'bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/50 shadow-lg py-3' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-12">
          <div className="flex items-center gap-4">
            <div className="flex-shrink-0">
                <Link href={isLoggedIn ? "/dashboard" : "/home"} className="text-2xl font-extrabold tracking-tight text-white flex items-center gap-2 group">
                <div className="w-9 h-9 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center text-white text-lg shadow-lg shadow-indigo-500/30 group-hover:shadow-indigo-500/50 transition-all duration-300 transform group-hover:rotate-3">
                    <span className="font-bold">W</span>
                </div>
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-300 group-hover:text-white transition-colors">WaitLess</span>
                </Link>
            </div>
            
            <div className="hidden lg:flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/50 border border-slate-700/50 backdrop-blur-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">v3.0 Live</span>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-6">
            <div className="flex items-baseline space-x-6">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href} className="text-sm font-medium text-slate-300 hover:text-white hover:bg-white/5 px-3 py-2 rounded-lg transition-all duration-200">
                  {link.label}
                </Link>
              ))}
            </div>

            <div className={`flex items-center transition-all duration-300 ${isSearchOpen ? 'w-48 md:w-64' : 'w-8'}`}>
              {isSearchOpen ? (
                 <div className="relative w-full animate-fade-in">
                   <input 
                     ref={searchInputRef}
                     type="text" 
                     placeholder="Jump to Pricing, Demo..." 
                     className="w-full bg-slate-800 text-white text-sm rounded-full pl-4 pr-8 py-1.5 border border-slate-700 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all duration-200 placeholder-slate-500"
                     onBlur={() => !searchInputRef.current?.value && setIsSearchOpen(false)}
                     onKeyDown={handleSearch}
                   />
                   <button 
                     onClick={() => setIsSearchOpen(false)}
                     className="absolute right-2 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white"
                   >
                     <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                   </button>
                 </div>
              ) : (
                <button 
                  onClick={() => setIsSearchOpen(true)}
                  className="text-slate-300 hover:text-white hover:bg-white/10 p-2 rounded-full transition-all"
                  aria-label="Search"
                  title="Search site"
                >
                  <SearchIcon />
                </button>
              )}
            </div>

            {isLoggedIn ? (
               <div className="flex items-center gap-4 pl-4 border-l border-slate-700">
                   {user?.avatar ? (
                        <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full border border-slate-500" title={`Logged in as ${user.name}`} />
                   ) : (
                        <span className="text-sm text-slate-400 font-medium hidden lg:block">Hi, {user?.name}</span>
                   )}
                   <CTAButton onClick={logout} className="bg-slate-800/50 hover:bg-slate-700 text-white border border-slate-600 px-5 py-2 text-sm font-semibold rounded-full transition-all hover:border-slate-500">
                      Logout
                    </CTAButton>
               </div>
            ) : (
              <div className="flex items-center space-x-4 pl-4 border-l border-slate-700">
                <Link href="/login" className="text-slate-300 hover:text-white text-sm font-semibold transition-colors">
                  Log in
                </Link>
                <Link href="/signup" passHref>
                  <CTAButton
                    className="bg-white text-slate-900 px-6 py-2.5 text-sm font-bold rounded-full hover:bg-indigo-50 shadow-lg shadow-white/10 transform hover:scale-105 transition-all"
                  >
                    Get Started
                  </CTAButton>
                </Link>
              </div>
            )}
          </div>

          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="bg-slate-800/50 p-2 rounded-md text-slate-300 hover:text-white hover:bg-slate-700 focus:outline-none backdrop-blur-md border border-slate-700/50"
              aria-controls="mobile-menu"
              aria-expanded={isOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" /></svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden absolute w-full bg-slate-950/95 backdrop-blur-xl border-b border-slate-800 shadow-2xl" id="mobile-menu">
          <div className="px-4 pt-2 pb-6 space-y-1">
            <div className="px-3 py-2">
               <div className="relative">
                   <input 
                    type="text" 
                    placeholder="Search pricing, demo..." 
                    className="w-full bg-slate-800 text-white rounded-lg pl-10 pr-4 py-2 border border-slate-700 focus:ring-2 focus:ring-indigo-500" 
                    onKeyDown={handleSearch}
                   />
                   <div className="absolute left-3 top-2.5 text-slate-400"><SearchIcon /></div>
               </div>
            </div>
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} onClick={() => handleMobileClick()} className="text-slate-300 hover:bg-slate-800 hover:text-white block px-3 py-3 rounded-md text-base font-medium">
                {link.label}
              </Link>
            ))}
             <div className="pt-4 mt-4 border-t border-slate-800 flex flex-col gap-3">
                 {isLoggedIn ? (
                     <CTAButton onClick={() => handleMobileClick(logout)} className="w-full bg-slate-800 border border-slate-700 text-white px-3 py-3 rounded-lg text-base font-medium">
                         Logout
                     </CTAButton>
                 ) : (
                     <>
                         <Link href="/login" onClick={() => handleMobileClick()} className="block w-full text-center bg-slate-800 text-white px-3 py-3 rounded-lg text-base font-medium border border-slate-700">
                             Log in
                         </Link>
                         <Link href="/signup" passHref>
                            <CTAButton onClick={() => handleMobileClick()} className="w-full bg-indigo-600 text-white px-3 py-3 rounded-lg text-base font-medium shadow-lg shadow-indigo-500/20">
                                Sign Up Free
                            </CTAButton>
                         </Link>
                     </>
                 )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;