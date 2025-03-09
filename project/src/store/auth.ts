import { create } from 'zustand';
import { supabase } from '../api/supabase';
import { Session, User } from '@supabase/supabase-js';

interface AuthState {
  session: Session | null;
  user: User | null;
  loading: boolean;
  error: Error | null;
  initialized: boolean;

  // Actions
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, userData: any) => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  initialize: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  session: null,
  user: null,
  loading: false,
  error: null,
  initialized: false,

  initialize: async () => {
    try {
      set({ loading: true });

      // Get the current session
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session) {
        set({
          session,
          user: session.user,
          initialized: true,
          loading: false,
        });
      } else {
        set({
          session: null,
          user: null,
          initialized: true,
          loading: false,
        });
      }

      // Set up auth state change listener
      supabase.auth.onAuthStateChange((event, session) => {
        set({
          session,
          user: session?.user || null,
        });
      });
    } catch (error) {
      set({
        error: error as Error,
        loading: false,
        initialized: true,
      });
    }
  },

  signIn: async (email, password) => {
    try {
      set({ loading: true, error: null });

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      set({
        session: data.session,
        user: data.user,
        loading: false,
      });
    } catch (error) {
      set({
        error: error as Error,
        loading: false,
      });
    }
  },

  signUp: async (email, password, userData) => {
    try {
      set({ loading: true, error: null });

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: userData,
        },
      });

      if (error) throw error;

      set({
        session: data.session,
        user: data.user,
        loading: false,
      });
    } catch (error) {
      set({
        error: error as Error,
        loading: false,
      });
    }
  },

  signOut: async () => {
    try {
      set({ loading: true, error: null });

      const { error } = await supabase.auth.signOut();

      if (error) throw error;

      set({
        session: null,
        user: null,
        loading: false,
      });
    } catch (error) {
      set({
        error: error as Error,
        loading: false,
      });
    }
  },

  resetPassword: async (email) => {
    try {
      set({ loading: true, error: null });

      const { error } = await supabase.auth.resetPasswordForEmail(email);

      if (error) throw error;

      set({ loading: false });
    } catch (error) {
      set({
        error: error as Error,
        loading: false,
      });
    }
  },
}));
