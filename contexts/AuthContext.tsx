import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '../lib/supabase';
import type { User as SupabaseUser } from '@supabase/supabase-js';

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
  isLoading: boolean;
  login: (email: string, password: string, role?: UserRole) => Promise<void>;
  signUp: (email: string, password: string, name: string, role: UserRole) => Promise<void>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updatePassword: (newPassword: string) => Promise<void>;
  updateEmail: (newEmail: string) => Promise<void>;
  updateProfile: (updates: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize auth state
  useEffect(() => {
    const initAuth = async () => {
      if (!supabase) {
        // Fallback to localStorage if Supabase not configured
        try {
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
          console.warn("Session storage access restricted:", e);
        } finally {
          setIsLoading(false);
        }
        return;
      }

      try {
        // Get current session
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session?.user) {
          await loadUserProfile(session.user.id);
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
      } finally {
        setIsLoading(false);
      }

      // Listen for auth changes
      const { data: { subscription } } = supabase.auth.onAuthStateChange(
        async (event, session) => {
          if (event === 'SIGNED_IN' && session?.user) {
            await loadUserProfile(session.user.id);
          } else if (event === 'SIGNED_OUT') {
            setUser(null);
          }
        }
      );

      return () => {
        subscription.unsubscribe();
      };
    };

    initAuth();
  }, []);

  const loadUserProfile = async (userId: string) => {
    if (!supabase) return;

    try {
      // Get user profile from database
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) throw error;

      if (data) {
        const userProfile: User = {
          id: data.id,
          name: data.name,
          email: data.email,
          role: data.role,
          avatar: data.avatar_url,
          company: data.company,
        };
        setUser(userProfile);
        
        // Store in localStorage as backup
        try {
          if (typeof window !== 'undefined' && window.localStorage) {
            localStorage.setItem('kwik_user', JSON.stringify(userProfile));
          }
        } catch (e) {
          console.warn('Could not store user in localStorage:', e);
        }
      }
    } catch (error) {
      console.error('Error loading user profile:', error);
      // Fallback: create user from auth metadata
      const { data: { user: authUser } } = await supabase.auth.getUser();
      if (authUser) {
        const fallbackUser: User = {
          id: authUser.id,
          name: authUser.user_metadata?.name || authUser.email?.split('@')[0] || 'User',
          email: authUser.email || '',
          role: authUser.user_metadata?.role || 'BRAND',
          avatar: authUser.user_metadata?.avatar_url,
        };
        setUser(fallbackUser);
      }
    }
  };

  const login = async (email: string, password: string, role?: UserRole) => {
    setIsLoading(true);
    try {
      if (!supabase) {
        // Mock login for development
        await new Promise(resolve => setTimeout(resolve, 1500));
        const mockUser: User = {
          id: `u_${Date.now()}`,
          name: email.split('@')[0],
          email,
          role: role || 'BRAND',
          company: role === 'BRAND' ? 'Empire Inc.' : undefined,
          avatar: `https://ui-avatars.com/api/?name=${email}&background=EAB308&color=000`
        };
        setUser(mockUser);
        if (typeof window !== 'undefined' && window.localStorage) {
          localStorage.setItem('kwik_user', JSON.stringify(mockUser));
        }
        return;
      }

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      if (data.user) {
        await loadUserProfile(data.user.id);
      }
    } catch (error: any) {
      console.error('Login error:', error);
      throw new Error(error.message || 'Failed to login');
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (email: string, password: string, name: string, role: UserRole) => {
    setIsLoading(true);
    try {
      if (!supabase) {
        // Mock signup for development
        await new Promise(resolve => setTimeout(resolve, 1500));
        const mockUser: User = {
          id: `u_${Date.now()}`,
          name,
          email,
          role,
          company: role === 'BRAND' ? 'New Company' : undefined,
          avatar: `https://ui-avatars.com/api/?name=${name}&background=EAB308&color=000`
        };
        setUser(mockUser);
        if (typeof window !== 'undefined' && window.localStorage) {
          localStorage.setItem('kwik_user', JSON.stringify(mockUser));
        }
        return;
      }

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
            role,
          },
        },
      });

      if (error) throw error;

      if (data.user) {
        // Create user profile in database
        const { error: profileError } = await supabase
          .from('users')
          .insert({
            id: data.user.id,
            email: data.user.email!,
            name,
            role,
          });

        if (profileError) {
          console.error('Error creating user profile:', profileError);
        }

        await loadUserProfile(data.user.id);
      }
    } catch (error: any) {
      console.error('Signup error:', error);
      throw new Error(error.message || 'Failed to sign up');
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      if (supabase) {
        await supabase.auth.signOut();
      }
      setUser(null);
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.removeItem('kwik_user');
      }
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const resetPassword = async (email: string) => {
    if (!supabase) {
      throw new Error('Supabase not configured. Password reset unavailable.');
    }

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) throw error;
    } catch (error: any) {
      console.error('Password reset error:', error);
      throw new Error(error.message || 'Failed to send password reset email');
    }
  };

  const updatePassword = async (newPassword: string) => {
    if (!supabase) {
      throw new Error('Supabase not configured. Password update unavailable.');
    }

    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (error) throw error;
    } catch (error: any) {
      console.error('Password update error:', error);
      throw new Error(error.message || 'Failed to update password');
    }
  };

  const updateEmail = async (newEmail: string) => {
    if (!supabase) {
      throw new Error('Supabase not configured. Email update unavailable.');
    }

    try {
      const { error } = await supabase.auth.updateUser({
        email: newEmail,
      });

      if (error) throw error;

      // Update user profile
      if (user) {
        const { error: profileError } = await supabase
          .from('users')
          .update({ email: newEmail })
          .eq('id', user.id);

        if (profileError) throw profileError;

        setUser({ ...user, email: newEmail });
      }
    } catch (error: any) {
      console.error('Email update error:', error);
      throw new Error(error.message || 'Failed to update email');
    }
  };

  const updateProfile = async (updates: Partial<User>) => {
    if (!supabase || !user) {
      throw new Error('Supabase not configured or user not logged in.');
    }

    try {
      const { error } = await supabase
        .from('users')
        .update({
          name: updates.name,
          company: updates.company,
          avatar_url: updates.avatar,
        })
        .eq('id', user.id);

      if (error) throw error;

      setUser({ ...user, ...updates });
    } catch (error: any) {
      console.error('Profile update error:', error);
      throw new Error(error.message || 'Failed to update profile');
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        signUp,
        logout,
        resetPassword,
        updatePassword,
        updateEmail,
        updateProfile,
      }}
    >
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
