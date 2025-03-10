import { supabase } from './supabase';
import { Database } from '../types/database.types';

// Type aliases for improved readability
type Json =
  Database['public']['Tables']['customer_profiles']['Row']['payment_info'];

/**
 * Get a customer profile by ID
 */
export const getCustomerProfile = async (userId: string) => {
  // First get the basic profile information
  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();

  if (profileError) {
    throw profileError;
  }

  // Then get the customer-specific profile information
  const { data: customerProfile, error: customerProfileError } = await supabase
    .from('customer_profiles')
    .select('*')
    .eq('user_id', userId)
    .single();

  if (customerProfileError) {
    throw customerProfileError;
  }

  // Combine the profile and customer profile data
  return {
    ...profile,
    ...customerProfile,
  };
};

/**
 * Update a customer profile
 */
export const updateCustomerProfile = async (
  userId: string,
  data: {
    full_name?: string;
    avatar_url?: string;
    phone?: string;
    default_address?: string;
    payment_info?: Json;
    preferences?: Json;
  }
) => {
  const now = new Date().toISOString();

  // Extract relevant fields for profiles table
  const profileData = {
    full_name: data.full_name,
    avatar_url: data.avatar_url,
    updated_at: now,
  };

  // Extract relevant fields for customer_profiles table
  const customerProfileData = {
    phone: data.phone,
    default_address: data.default_address,
    payment_info: data.payment_info,
    preferences: data.preferences,
    updated_at: now,
  };

  // Update the profiles table
  if (
    profileData.full_name !== undefined ||
    profileData.avatar_url !== undefined
  ) {
    const { error: profileError } = await supabase
      .from('profiles')
      .update(profileData)
      .eq('id', userId);

    if (profileError) {
      throw profileError;
    }
  }

  // Update the customer_profiles table
  if (
    customerProfileData.phone !== undefined ||
    customerProfileData.default_address !== undefined ||
    customerProfileData.payment_info !== undefined ||
    customerProfileData.preferences !== undefined
  ) {
    const { error: customerProfileError } = await supabase
      .from('customer_profiles')
      .update(customerProfileData)
      .eq('user_id', userId);

    if (customerProfileError) {
      throw customerProfileError;
    }
  }

  // Get the updated profile
  return getCustomerProfile(userId);
};

/**
 * Delete a customer account (including auth user, profile, and customer profile)
 */
export const deleteCustomerAccount = async (userId: string) => {
  // Note: We don't need to explicitly delete profile and customer_profile
  // as they should cascade delete when the auth user is deleted

  const { error } = await supabase.auth.admin.deleteUser(userId);

  if (error) {
    throw error;
  }
};
