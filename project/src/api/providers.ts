import { supabase } from './supabase';
import { Json } from '../types/database.types';

/**
 * Get all service providers with optional filtering
 */
export const getServiceProviders = async ({
  verified = true,
  serviceArea = null,
  servicesOffered = null,
  limit = 50,
  offset = 0,
} = {}) => {
  let query = supabase
    .from('provider_profiles')
    .select(
      `
      id,
      business_name,
      business_address,
      service_area,
      services_offered,
      rating,
      verified,
      profiles (
        full_name,
        avatar_url,
        phone
      )
    `
    )
    .eq('verified', verified)
    .range(offset, offset + limit - 1);

  // Add service area filter if specified
  if (serviceArea) {
    // This assumes service_area is a JSON array of zip codes or area identifiers
    query = query.containedBy('service_area', serviceArea);
  }

  // Add services offered filter if specified
  if (servicesOffered) {
    // This assumes services_offered is a JSON array of service types
    query = query.containedBy('services_offered', servicesOffered);
  }

  const { data, error } = await query;

  if (error) {
    throw error;
  }

  return data;
};

/**
 * Get a provider profile by user ID
 */
export const getProviderProfile = async (userId: string) => {
  // First get the basic profile information
  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();

  if (profileError) {
    throw profileError;
  }

  // Then get the provider-specific profile information
  const { data: providerProfile, error: providerProfileError } = await supabase
    .from('provider_profiles')
    .select('*')
    .eq('user_id', userId)
    .single();

  if (providerProfileError) {
    throw providerProfileError;
  }

  // Combine the profile and provider profile data
  return {
    ...profile,
    ...providerProfile,
  };
};

/**
 * Update a provider profile
 */
export const updateProviderProfile = async (
  userId: string,
  data: {
    full_name?: string;
    avatar_url?: string;
    business_name?: string;
    description?: string;
    phone?: string;
    website?: string;
    business_address?: string;
    service_areas?: string[];
    availability?: Json;
    qualifications?: Json;
  }
) => {
  const now = new Date().toISOString();

  // Extract relevant fields for profiles table
  const profileData = {
    full_name: data.full_name,
    avatar_url: data.avatar_url,
    updated_at: now,
  };

  // Extract relevant fields for provider_profiles table
  const providerProfileData = {
    business_name: data.business_name,
    description: data.description,
    phone: data.phone,
    website: data.website,
    business_address: data.business_address,
    service_areas: data.service_areas,
    availability: data.availability,
    qualifications: data.qualifications,
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

  // Update the provider_profiles table
  if (
    providerProfileData.business_name !== undefined ||
    providerProfileData.description !== undefined ||
    providerProfileData.phone !== undefined ||
    providerProfileData.website !== undefined ||
    providerProfileData.business_address !== undefined ||
    providerProfileData.service_areas !== undefined ||
    providerProfileData.availability !== undefined ||
    providerProfileData.qualifications !== undefined
  ) {
    const { error: providerProfileError } = await supabase
      .from('provider_profiles')
      .update(providerProfileData)
      .eq('user_id', userId);

    if (providerProfileError) {
      throw providerProfileError;
    }
  }

  // Get the updated profile
  return getProviderProfile(userId);
};

/**
 * Verify a service provider (admin only)
 */
export const verifyProvider = async (id: string, verified: boolean = true) => {
  const { error } = await supabase
    .from('provider_profiles')
    .update({
      verified,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id);

  if (error) {
    throw error;
  }
};

/**
 * Update a service provider's rating
 */
export const updateProviderRating = async (id: string, rating: number) => {
  // Ensure the rating is within bounds (1-5)
  const normalizedRating = Math.min(Math.max(rating, 1), 5);

  const { error } = await supabase
    .from('provider_profiles')
    .update({
      rating: normalizedRating,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id);

  if (error) {
    throw error;
  }
};

/**
 * Get services offered by a provider
 */
export const getProviderServices = async (providerId: string) => {
  const { data, error } = await supabase
    .from('provider_services')
    .select(
      `
      *,
      services (*)
    `
    )
    .eq('provider_id', providerId);

  if (error) {
    throw error;
  }

  return data;
};

/**
 * Add a service to a provider's offerings
 */
export const addProviderService = async (
  providerId: string,
  serviceId: string,
  priceAdjustment: number
) => {
  const { data, error } = await supabase
    .from('provider_services')
    .insert({
      provider_id: providerId,
      service_id: serviceId,
      price_adjustment: priceAdjustment,
      is_available: true,
    })
    .select();

  if (error) {
    throw error;
  }

  return data[0];
};

/**
 * Update a provider service
 */
export const updateProviderService = async (
  id: string,
  priceAdjustment: number,
  isAvailable: boolean
) => {
  const { data, error } = await supabase
    .from('provider_services')
    .update({
      price_adjustment: priceAdjustment,
      is_available: isAvailable,
    })
    .eq('id', id)
    .select();

  if (error) {
    throw error;
  }

  return data[0];
};

/**
 * Remove a service from a provider's offerings
 */
export const removeProviderService = async (id: string) => {
  const { error } = await supabase
    .from('provider_services')
    .delete()
    .eq('id', id);

  if (error) {
    throw error;
  }
};
