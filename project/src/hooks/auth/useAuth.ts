import { useEffect } from 'react';
import { useAuthStore } from '../../store/auth';
import { UserRole } from '../../types/database.types';

/**
 * Custom hook that provides authentication state and functions
 */
export const useAuth = () => {
  const {
    session,
    user,
    userRole,
    isLoading,
    isAuthenticated,
    initialize,
    signIn,
    signUp,
    signOut,
    resetPassword,
    updatePassword,
  } = useAuthStore();

  // Initialize auth state on first load
  useEffect(() => {
    initialize();
  }, [initialize]);

  /**
   * Check if the current user has one of the specified roles
   */
  const hasRole = (roles: UserRole | UserRole[]): boolean => {
    if (!userRole) return false;

    if (Array.isArray(roles)) {
      return roles.includes(userRole);
    }

    return userRole === roles;
  };

  /**
   * Check if the user is a customer
   */
  const isCustomer = (): boolean => {
    return userRole === 'customer';
  };

  /**
   * Check if the user is a service provider
   */
  const isProvider = (): boolean => {
    return userRole === 'provider';
  };

  /**
   * Check if the user is an admin
   */
  const isAdmin = (): boolean => {
    return userRole === 'admin';
  };

  return {
    // State
    session,
    user,
    userRole,
    isLoading,
    isAuthenticated,

    // Auth operations
    signIn,
    signUp,
    signOut,
    resetPassword,
    updatePassword,

    // Role helpers
    hasRole,
    isCustomer,
    isProvider,
    isAdmin,
  };
};
