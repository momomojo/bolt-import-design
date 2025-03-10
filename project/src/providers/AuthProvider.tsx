import React, { createContext, useContext, ReactNode } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { useSupabaseAuth } from '../hooks/auth/useSupabaseAuth';

// Define the context type
type AuthContextType = {
  session: Session | null;
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
};

// Create the context with default values
const AuthContext = createContext<AuthContextType>({
  session: null,
  user: null,
  loading: true,
  isAuthenticated: false,
});

// Props type for the provider
type AuthProviderProps = {
  children: ReactNode;
};

// Auth provider component
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  // Use our custom hook to get auth state
  const { session, user, loading, isAuthenticated } = useSupabaseAuth();

  // Log auth state changes for debugging
  React.useEffect(() => {
    console.log('AuthProvider state:', {
      authenticated: isAuthenticated,
      loading,
      userEmail: user?.email,
    });
  }, [isAuthenticated, loading, user]);

  // Provide the auth state to the app
  return (
    <AuthContext.Provider value={{ session, user, loading, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
