import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase credentials not found. Using mock authentication.');
}

export const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Database types
export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          name: string;
          role: 'BRAND' | 'INFLUENCER' | 'ADMIN';
          avatar_url?: string;
          company?: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          email: string;
          name: string;
          role: 'BRAND' | 'INFLUENCER' | 'ADMIN';
          avatar_url?: string;
          company?: string;
        };
        Update: {
          email?: string;
          name?: string;
          role?: 'BRAND' | 'INFLUENCER' | 'ADMIN';
          avatar_url?: string;
          company?: string;
        };
      };
    };
  };
}

