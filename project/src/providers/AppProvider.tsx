import React, { useEffect } from 'react';
import { NativeBaseProvider } from './NativeBaseProvider';
import { useAuthStore } from '../store/auth';
import { AuthProvider } from './AuthProvider';

interface AppProviderProps {
  children: React.ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  // Get the initialize function from auth store
  const initialize = useAuthStore((state) => state.initialize);

  // Initialize auth state on app load
  useEffect(() => {
    initialize();
  }, [initialize]);

  return (
    <AuthProvider>
      <NativeBaseProvider>{children}</NativeBaseProvider>
    </AuthProvider>
  );
};
