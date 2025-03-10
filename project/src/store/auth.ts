import { create } from 'zustand';
import { Session, User } from '@supabase/supabase-js';
import * as AuthAPI from '../api/auth';
import { UserRole } from '../types/database.types';

interface AuthState {
  // State
  session: Session | null;
  user: User | null;
  userRole: UserRole | null;
  isLoading: boolean;
  isAuthenticated: boolean;

  // Actions
  initialize: () => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (
    email: string,
    password: string,
    role: UserRole,
    fullName: string
  ) => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updatePassword: (password: string) => Promise<void>;
  setSession: (session: Session | null) => void;
  setUser: (user: User | null) => void;
  setUserRole: (role: UserRole | null) => void;
  setLoading: (isLoading: boolean) => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  // Initial state
  session: null,
  user: null,
  userRole: null,
  isLoading: true, // Start with loading state
  isAuthenticated: false,

  // Initialize the auth state from any existing session
  initialize: async () => {
    try {
      set({ isLoading: true });
      // Get current session
      const session = await AuthAPI.getSession();
      if (session) {
        // Get user profile to determine role
        const profile = await AuthAPI.getUserProfile();
        set({
          session,
          user: session.user,
          userRole: profile?.role || null,
          isAuthenticated: true,
        });
      } else {
        set({
          session: null,
          user: null,
          userRole: null,
          isAuthenticated: false,
        });
      }
    } catch (error) {
      console.error('Error initializing auth state:', error);
      set({
        session: null,
        user: null,
        userRole: null,
        isAuthenticated: false,
      });
    } finally {
      set({ isLoading: false });
    }
  },

  // Sign in with email and password
  signIn: async (email: string, password: string) => {
    try {
      set({ isLoading: true });
      const data = await AuthAPI.signIn(email, password);
      if (data.session) {
        // Get user profile to determine role
        const profile = await AuthAPI.getUserProfile();
        set({
          session: data.session,
          user: data.user,
          userRole: profile?.role || null,
          isAuthenticated: true,
        });
      }
    } catch (error) {
      console.error('Error signing in:', error);
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  // Sign up with email and password
  signUp: async (
    email: string,
    password: string,
    role: UserRole,
    fullName: string
  ) => {
    try {
      set({ isLoading: true });
      const data = await AuthAPI.signUp(email, password, role, fullName);
      // Note: Depending on your auth configuration, users might need to verify
      // their email before they can sign in. In that case, don't set the session yet.
      if (data.session) {
        set({
          session: data.session,
          user: data.user,
          userRole: role,
          isAuthenticated: true,
        });
      }
    } catch (error) {
      console.error('Error signing up:', error);
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  // Sign out
  signOut: async () => {
    try {
      set({ isLoading: true });
      await AuthAPI.signOut();
      set({
        session: null,
        user: null,
        userRole: null,
        isAuthenticated: false,
      });
    } catch (error) {
      console.error('Error signing out:', error);
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  // Reset password
  resetPassword: async (email: string) => {
    try {
      set({ isLoading: true });
      await AuthAPI.resetPassword(email);
    } catch (error) {
      console.error('Error resetting password:', error);
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  // Update password
  updatePassword: async (password: string) => {
    try {
      set({ isLoading: true });
      await AuthAPI.updatePassword(password);
    } catch (error) {
      console.error('Error updating password:', error);
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  // Utility functions to update state
  setSession: (session: Session | null) =>
    set({
      session,
      isAuthenticated: !!session,
    }),

  setUser: (user: User | null) => set({ user }),

  setUserRole: (role: UserRole | null) => set({ userRole: role }),

  setLoading: (isLoading: boolean) => set({ isLoading }),
}));
