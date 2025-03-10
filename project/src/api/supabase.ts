import 'react-native-url-polyfill/auto';
import { createClient } from '@supabase/supabase-js';
import { AppState, Platform } from 'react-native';
import type { Database } from '../types/supabase.types';

// Define a web-compatible storage adapter
const webStorage = {
  getItem: (key: string) => {
    return Promise.resolve(localStorage.getItem(key));
  },
  setItem: (key: string, value: string) => {
    localStorage.setItem(key, value);
    return Promise.resolve(null);
  },
  removeItem: (key: string) => {
    localStorage.removeItem(key);
    return Promise.resolve(null);
  },
};

// Get the Supabase URL and anon key from environment variables
const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables!');
  throw new Error('Missing Supabase environment variables');
}

// Set up storage based on platform
let storageAdapter: any;

// Use regular import for AsyncStorage
if (Platform.OS !== 'web') {
  // For React Native
  const AsyncStorage =
    require('@react-native-async-storage/async-storage').default;
  storageAdapter = AsyncStorage;
} else {
  // For Web
  storageAdapter = webStorage;
}

// Initialize the Supabase client with custom options and TypeScript types
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: storageAdapter,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

// Tells Supabase Auth to continuously refresh the session automatically
// if the app is in the foreground
AppState.addEventListener('change', (state) => {
  if (state === 'active') {
    supabase.auth.startAutoRefresh();
  } else {
    supabase.auth.stopAutoRefresh();
  }
});

// Helper function to handle Supabase responses
export const handleSupabaseResponse = <T>({
  data,
  error,
}: {
  data: T | null;
  error: Error | null;
}) => {
  if (error) {
    console.error('Supabase error:', error.message);
    throw error;
  }
  return data;
};

// Helper function to check if a user is authenticated
export const isAuthenticated = async () => {
  console.log('Checking if user is authenticated');
  try {
    const { data, error } = await supabase.auth.getSession();
    const authenticated = !!data.session && !error;
    console.log('User authenticated:', authenticated);
    return authenticated;
  } catch (error) {
    console.error('Error checking authentication:', error);
    return false;
  }
};

// Helper function to get the current user
export const getCurrentUser = async () => {
  console.log('Getting current user');
  try {
    const { data, error } = await supabase.auth.getUser();
    if (error) {
      console.error('Error getting current user:', error.message);
      throw error;
    }
    console.log('Current user:', data.user ? data.user.email : 'No user found');
    return data.user;
  } catch (error) {
    console.error('Exception getting current user:', error);
    throw error;
  }
};

// Helper function to get the user's profile with role information
export const getUserProfile = async () => {
  console.log('Getting user profile');
  try {
    const { data: user } = await supabase.auth.getUser();

    if (!user.user) {
      console.log('No user found');
      return null;
    }

    console.log('Fetching profile for user:', user.user.email);
    const { data: profile, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.user.id)
      .single();

    if (error) {
      console.error('Error fetching user profile:', error.message);
      return null;
    }

    console.log('Found profile with role:', profile?.role);

    if (profile?.role === 'customer') {
      const { data: customerData, error: customerError } = await supabase
        .from('customer_profiles')
        .select('*')
        .eq('user_id', user.user.id)
        .single();

      if (customerError) {
        console.error(
          'Error fetching customer profile:',
          customerError.message
        );
      }

      return { ...profile, ...customerData, userType: 'customer' };
    } else if (profile?.role === 'provider') {
      const { data: providerData, error: providerError } = await supabase
        .from('provider_profiles')
        .select('*')
        .eq('user_id', user.user.id)
        .single();

      if (providerError) {
        console.error(
          'Error fetching provider profile:',
          providerError.message
        );
      }

      return { ...profile, ...providerData, userType: 'provider' };
    }

    return profile;
  } catch (error) {
    console.error('Exception getting user profile:', error);
    return null;
  }
};

// Helper function to get user role
export const getUserRole = async (): Promise<
  'customer' | 'provider' | 'admin' | null
> => {
  console.log('Getting user role');
  try {
    const profile = await getUserProfile();
    console.log('User role:', profile?.role || 'No role found');
    return profile?.role || null;
  } catch (error) {
    console.error('Error getting user role:', error);
    return null;
  }
};
