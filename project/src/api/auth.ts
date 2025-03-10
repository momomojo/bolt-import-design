import { supabase } from './supabase';
import type {
  AuthError,
  Session,
  User,
  UserResponse,
} from '@supabase/supabase-js';
import type { Database } from '../types/supabase.types';

// Define user role type
export type UserRole = 'customer' | 'provider' | 'admin';

// Define the AuthResponse type based on Supabase's actual implementation
// AuthResponse is not generic in Supabase but has a specific structure
export type AuthResponse = {
  data: {
    user: User | null;
    session: Session | null;
  } | null;
  error: AuthError | null;
};

// Define user profile type
export type UserProfile = {
  id: string;
  role: UserRole;
  full_name: string | null;
  avatar_url: string | null;
  created_at: string | null;
  updated_at: string | null;
};

/**
 * Sign up a new user with email and password
 * This implementation relies on the handle_new_user database trigger to create profiles
 * @param email User's email
 * @param password User's password
 * @param metadata Additional user metadata including role and full_name
 */
export const signUp = async (
  email: string,
  password: string,
  metadata: { full_name?: string; user_role?: UserRole; bio?: string } = {}
): Promise<AuthResponse> => {
  console.log('Starting signup process', { email, ...metadata });

  try {
    const result = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: metadata.full_name || '',
          user_role: metadata.user_role || 'customer',
          bio: metadata.bio || '',
        },
      },
    });

    console.log('Signup API response:', {
      user: result.data?.user ? 'User object exists' : 'No user object',
      error: result.error ? result.error.message : 'No error',
    });

    return result;
  } catch (error) {
    console.error('Error in signUp function:', error);
    throw error;
  }
};

/**
 * Sign up a new customer
 * @param email User's email
 * @param password User's password
 * @param fullName User's full name
 */
export const signUpCustomer = async (
  email: string,
  password: string,
  fullName: string
): Promise<AuthResponse> => {
  return signUp(email, password, {
    full_name: fullName,
    user_role: 'customer',
  });
};

/**
 * Sign up a new service provider
 * @param email User's email
 * @param password User's password
 * @param fullName User's full name
 * @param bio Provider's bio
 */
export const signUpProvider = async (
  email: string,
  password: string,
  fullName: string,
  bio: string = ''
): Promise<AuthResponse> => {
  return signUp(email, password, {
    full_name: fullName,
    user_role: 'provider',
    bio,
  });
};

/**
 * Sign in a user with email and password
 * @param email User's email
 * @param password User's password
 */
export const signIn = async (
  email: string,
  password: string
): Promise<AuthResponse> => {
  console.log('Signing in user', { email });

  try {
    const result = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    console.log('Sign in result:', {
      success: !!result.data.session,
      error: result.error ? result.error.message : 'No error',
    });

    return result;
  } catch (error) {
    console.error('Error in signIn function:', error);
    throw error;
  }
};

/**
 * Sign out the current user
 */
export const signOut = async (): Promise<{ error: AuthError | null }> => {
  console.log('Signing out user');
  return supabase.auth.signOut();
};

/**
 * Reset a user's password
 * @param email User's email
 */
export const resetPassword = async (
  email: string
): Promise<{ error: AuthError | null }> => {
  return supabase.auth.resetPasswordForEmail(email);
};

/**
 * Update user's password
 * @param password New password
 */
export const updatePassword = async (
  password: string
): Promise<UserResponse> => {
  return supabase.auth.updateUser({ password });
};

/**
 * Get the current auth session
 */
export const getSession = async (): Promise<{
  data: { session: Session | null };
  error: AuthError | null;
}> => {
  return supabase.auth.getSession();
};

/**
 * Get the current user
 */
export const getCurrentUser = async (): Promise<User | null> => {
  const { data } = await supabase.auth.getSession();
  return data.session?.user || null;
};

/**
 * Get the user's profile from the profiles table
 */
export const getUserProfile = async (): Promise<UserProfile | null> => {
  console.log('Getting user profile');

  try {
    const { data: user, error: userError } = await supabase.auth.getUser();

    if (userError || !user.user) {
      console.log('No authenticated user found');
      return null;
    }

    console.log('Fetching profile for user:', user.user.email);
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.user.id)
      .single();

    if (profileError) {
      console.error('Error fetching user profile:', profileError.message);
      return null;
    }

    console.log('Found profile with role:', profile?.role);
    return profile as UserProfile;
  } catch (error) {
    console.error('Exception in getUserProfile:', error);
    return null;
  }
};

/**
 * Get the complete user profile with role-specific data
 */
export const getCompleteUserProfile = async () => {
  const user = await getCurrentUser();

  if (!user) return null;

  const { data: profileData } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  if (!profileData) return null;

  if (profileData.role === 'customer') {
    const { data: customerData } = await supabase
      .from('customer_profiles')
      .select('*')
      .eq('user_id', user.id)
      .single();

    return { ...profileData, ...customerData, userType: 'customer' };
  } else if (profileData.role === 'provider') {
    const { data: providerData } = await supabase
      .from('provider_profiles')
      .select('*')
      .eq('user_id', user.id)
      .single();

    return { ...profileData, ...providerData, userType: 'provider' };
  } else if (profileData.role === 'admin') {
    const { data: adminData } = await supabase
      .from('admin_profiles')
      .select('*')
      .eq('user_id', user.id)
      .single();

    return { ...profileData, ...adminData, userType: 'admin' };
  }

  return profileData;
};

/**
 * Get the user's role from the profiles table
 */
export const getUserRole = async (): Promise<UserRole | null> => {
  const profile = await getUserProfile();
  return profile?.role || null;
};

// Export default object for easier imports
export default {
  signUp,
  signUpCustomer,
  signUpProvider,
  signIn,
  signOut,
  resetPassword,
  updatePassword,
  getSession,
  getCurrentUser,
  getUserProfile,
  getCompleteUserProfile,
  getUserRole,
};
