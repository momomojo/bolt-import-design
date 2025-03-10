import { supabase } from '../api/supabase.ts';

/**
 * Sign up a new customer
 * @param {string} email User's email
 * @param {string} password User's password
 * @param {string} fullName User's full name
 * @returns {Promise} Sign up response
 */
export const signUpCustomer = async (email, password, fullName) => {
  console.log('Starting customer signup process', { email, fullName });
  return supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
        // No user_role specified defaults to 'customer'
      },
    },
  });
};

/**
 * Sign up a new service provider
 * @param {string} email User's email
 * @param {string} password User's password
 * @param {string} fullName User's full name
 * @param {string} bio Provider's bio (optional)
 * @returns {Promise} Sign up response
 */
export const signUpProvider = async (email, password, fullName, bio = '') => {
  console.log('Starting provider signup process', { email, fullName, bio });
  try {
    const result = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          user_role: 'provider', // This is crucial for provider signup
          bio,
        },
      },
    });

    console.log('Signup API response:', {
      user: result.data?.user ? 'User object exists' : 'No user object',
      error: result.error ? result.error.message : 'No error',
    });

    return result;
  } catch (error) {
    console.error('Error in signUpProvider function:', error);
    throw error;
  }
};

/**
 * Sign in a user
 * @param {string} email User's email
 * @param {string} password User's password
 * @returns {Promise} Sign in response
 */
export const signIn = async (email, password) => {
  return supabase.auth.signInWithPassword({
    email,
    password,
  });
};

/**
 * Sign out the current user
 * @returns {Promise} Sign out response
 */
export const signOut = async () => {
  return supabase.auth.signOut();
};

/**
 * Get the current user
 * @returns {Promise} Current user session
 */
export const getCurrentUser = async () => {
  const { data } = await supabase.auth.getSession();
  return data.session?.user || null;
};

/**
 * Get the user's profile including role information
 * @returns {Promise} User profile
 */
export const getUserProfile = async () => {
  const user = await getCurrentUser();

  if (!user) return null;

  const { data: profileData } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  if (profileData?.role === 'customer') {
    const { data: customerData } = await supabase
      .from('customer_profiles')
      .select('*')
      .eq('user_id', user.id)
      .single();

    return { ...profileData, ...customerData, userType: 'customer' };
  } else if (profileData?.role === 'provider') {
    const { data: providerData } = await supabase
      .from('provider_profiles')
      .select('*')
      .eq('user_id', user.id)
      .single();

    return { ...profileData, ...providerData, userType: 'provider' };
  }

  return profileData;
};
