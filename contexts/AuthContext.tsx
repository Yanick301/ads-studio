
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { api } from '../services/api';

export type UserRole = 'BRAND' | 'INFLUENCER' | 'ADMIN';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  company?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, role: UserRole) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing session on mount
  useEffect(() => {
    const initAuth = async () => {
      try {
        // Safe check for localStorage availability
        if (typeof window !== 'undefined' && window.localStorage) {
          const storedUser = localStorage.getItem('kwik_user');
          if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            if (parsedUser && parsedUser.id) {
              setUser(parsedUser);
            }
          }
        }
      } catch (e) {
        // Silently fail if localStorage is restricted (e.g. sandboxed iframe)
        console.warn("Session storage access restricted or parsing failed:", e);
      } finally {
        setIsLoading(false);
      }
    };
    initAuth();
  }, []);

  const login = async (email: string, role: UserRole) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const mockUser: User = {
        id: `u_${Date.now()}`,
        name: email.split('@')[0],
        email,
        role,
        company: role === 'BRAND' ? 'Empire Inc.' : undefined,
        avatar: `https://ui-avatars.com/api/?name=${email}&background=EAB308&color=000`
      };

      setUser(mockUser);
      
      try {
        if (typeof window !== 'undefined' && window.localStorage) {
          localStorage.setItem('kwik_user', JSON.stringify(mockUser));
        }
      } catch (storageError) {
        console.warn("Could not persist session to localStorage:", storageError);
      }
    } catch (e) {
      console.error("Login failed", e);
      throw e;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.removeItem('kwik_user');
      }
    } catch (storageError) {
      console.warn("Could not clear session from localStorage:", storageError);
    }
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
