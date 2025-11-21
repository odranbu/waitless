
import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/router';

interface User {
  email: string;
  name: string;
  businessName?: string;
  businessType?: string;
  avatar?: string;
  provider?: 'email' | 'google';
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, provider?: 'email' | 'google') => Promise<void>;
  logout: () => void;
  updateProfile: (data: { name: string; type: string }) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Check for a logged-in user on mount from localStorage
  useEffect(() => {
    const initAuth = () => {
      try {
        const storedUser = localStorage.getItem('waitlessUser');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error("Failed to parse user from localStorage", error);
        localStorage.removeItem('waitlessUser');
      } finally {
        setLoading(false);
      }
    };
    
    initAuth();
  }, []);

  const login = async (email: string, provider: 'email' | 'google' = 'email') => {
    try {
        // Simulate API call and create user object
        let name = 'Demo User';
        let avatar = undefined;

        if (provider === 'google') {
            name = 'Alex (Google)';
            // Generic Google-style avatar placeholder
            avatar = 'https://lh3.googleusercontent.com/a/default-user=s96-c'; 
        } else {
            // Extract name from email (e.g. john@test.com -> John)
            const namePart = email.split('@')[0];
            name = namePart.charAt(0).toUpperCase() + namePart.slice(1);
        }

        const newUser: User = { 
            email, 
            name, 
            provider,
            avatar
        };

        // Persist user
        localStorage.setItem('waitlessUser', JSON.stringify(newUser));
        setUser(newUser);
        
        // Routing logic based on user state
        if (!newUser.businessName) {
          await router.push('/onboarding');
        } else {
          await router.push('/dashboard');
        }
    } catch (e) {
        console.error("Login failed", e);
        // Fallback
        await router.push('/onboarding');
    }
  };

  const logout = () => {
    try {
        localStorage.removeItem('waitlessUser');
        setUser(null);
        router.push('/');
    } catch(e) {
        console.error("Logout error", e);
        // Ensure we redirect even if localStorage fails
        window.location.href = '/';
    }
  };
  
  const updateProfile = (data: { name: string; type: string }) => {
    setUser(prev => {
        if (!prev) return null;
        const updatedUser = { ...prev, businessName: data.name, businessType: data.type };
        try {
            localStorage.setItem('waitlessUser', JSON.stringify(updatedUser));
        } catch(e) {
            console.error("Profile update storage error", e);
        }
        return updatedUser;
    });
  };

  const value = { user, loading, login, logout, updateProfile };

  return (
    <AuthContext.Provider value={value}>
      {/* Prevent flickering by showing nothing until initial auth check is done, 
          unless we are on public pages (handled by individual page logic usually, 
          but here we render children immediately after loading is false to ensure context is ready) */}
      {!loading && children}
      {loading && (
        <div className="min-h-screen bg-slate-900 flex items-center justify-center">
            {/* A subtle loading state for the initial hydration */}
        </div>
      )}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
