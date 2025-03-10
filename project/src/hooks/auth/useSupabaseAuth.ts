import { useEffect, useState } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '../../api/supabase';

export function useSupabaseAuth() {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Initial session check
    const checkSession = async () => {
      try {
        console.log('Checking for existing session...');
        const { data, error } = await supabase.auth.getSession();

        if (error) {
          console.error('Error getting session:', error.message);
          throw error;
        }

        console.log(
          'Session check result:',
          data.session ? 'Session exists' : 'No session'
        );
        setSession(data.session);
        setUser(data.session?.user || null);
      } catch (error) {
        console.error('Session check exception:', error);
      } finally {
        setLoading(false);
      }
    };

    // Set up auth state listener
    const setupAuthListener = async () => {
      // Initial check
      await checkSession();

      // Listen for auth changes
      const { data: authListener } = supabase.auth.onAuthStateChange(
        async (event, newSession) => {
          console.log('Auth state changed:', event);
          console.log(
            'New session:',
            newSession ? 'Session exists' : 'No session'
          );

          setSession(newSession);
          setUser(newSession?.user || null);

          if (event === 'SIGNED_IN') {
            console.log('User signed in:', newSession?.user?.email);
          } else if (event === 'SIGNED_OUT') {
            console.log('User signed out');
          } else if (event === 'USER_UPDATED') {
            console.log('User updated');
          }
        }
      );

      // Cleanup on unmount
      return () => {
        authListener.subscription.unsubscribe();
        console.log('Auth listener unsubscribed');
      };
    };

    setupAuthListener();
  }, []);

  return {
    session,
    user,
    loading,
    isAuthenticated: !!session,
  };
}
