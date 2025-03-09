import { useEffect } from 'react';
import { useAuthStore } from '../../store/auth';

export const useAuth = () => {
  const {
    user,
    session,
    loading,
    error,
    initialized,
    signIn,
    signUp,
    signOut,
    resetPassword,
    initialize,
  } = useAuthStore();

  useEffect(() => {
    if (!initialized) {
      initialize();
    }
  }, [initialized, initialize]);

  const isAuthenticated = !!session;

  return {
    user,
    session,
    loading,
    error,
    isAuthenticated,
    signIn,
    signUp,
    signOut,
    resetPassword,
  };
};
