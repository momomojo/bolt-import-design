import { supabase, handleSupabaseResponse } from './supabase';
import { Database } from '../types/database.types';

// Type aliases for improved readability
type Service = Database['public']['Tables']['services']['Row'];
type Category = Database['public']['Tables']['service_categories']['Row'];

// Function to get all active services
export const getServices = async (
  categoryFilter?: string,
  limit = 50,
  offset = 0
) => {
  let query = supabase
    .from('services')
    .select('*')
    .eq('active', true)
    .order('name')
    .range(offset, offset + limit - 1);

  if (categoryFilter) {
    query = query.eq('category', categoryFilter);
  }

  const { data, error } = await query;

  return handleSupabaseResponse({ data, error });
};

// Function to get a specific service by ID
export const getServiceById = async (serviceId: string) => {
  const { data, error } = await supabase
    .from('services')
    .select('*')
    .eq('id', serviceId)
    .single();

  return handleSupabaseResponse({ data, error });
};

// Function to get all service categories
export const getServiceCategories = async () => {
  const { data, error } = await supabase
    .from('services')
    .select('category')
    .eq('active', true)
    .order('category');

  if (error) {
    throw error;
  }

  // Extract unique categories
  const categories = [...new Set(data?.map((item) => item.category))];

  return categories;
};

// Admin functions for service management
export const createService = async (
  name: string,
  basePrice: number,
  durationMinutes: number,
  category: string,
  description?: string
) => {
  const { data, error } = await supabase
    .from('services')
    .insert({
      name,
      base_price: basePrice,
      duration_minutes: durationMinutes,
      category,
      description,
      active: true,
    })
    .select()
    .single();

  return handleSupabaseResponse({ data, error });
};

// Function to update a service
export const updateService = async (
  serviceId: string,
  updates: {
    name?: string;
    description?: string;
    base_price?: number;
    duration_minutes?: number;
    category?: string;
    active?: boolean;
  }
) => {
  const { data, error } = await supabase
    .from('services')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', serviceId)
    .select()
    .single();

  return handleSupabaseResponse({ data, error });
};

// Function to delete a service (or deactivate it)
export const deleteService = async (serviceId: string, softDelete = true) => {
  if (softDelete) {
    // Just mark as inactive instead of deleting
    return await updateService(serviceId, { active: false });
  } else {
    // Hard delete
    const { data, error } = await supabase
      .from('services')
      .delete()
      .eq('id', serviceId);

    return handleSupabaseResponse({ data, error });
  }
};

/**
 * Get all service categories
 */
export const getAllCategories = async () => {
  const { data, error } = await supabase
    .from('service_categories')
    .select('*')
    .order('name', { ascending: true });

  if (error) {
    throw error;
  }

  return data;
};

/**
 * Get a single service category by ID
 */
export const getCategoryById = async (id: string) => {
  const { data, error } = await supabase
    .from('service_categories')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    throw error;
  }

  return data;
};

/**
 * Get all services (optionally filtered by category)
 */
export const getAllServices = async (categoryId?: string) => {
  let query = supabase
    .from('services')
    .select(
      `
      *,
      service_categories(*)
    `
    )
    .order('name', { ascending: true });

  if (categoryId) {
    query = query.eq('category_id', categoryId);
  }

  const { data, error } = await query;

  if (error) {
    throw error;
  }

  return data;
};

/**
 * Get all service areas
 */
export const getAllServiceAreas = async () => {
  const { data, error } = await supabase
    .from('service_areas')
    .select('*')
    .order('name', { ascending: true });

  if (error) {
    throw error;
  }

  return data;
};

/**
 * Get a service area by ID
 */
export const getServiceAreaById = async (id: string) => {
  const { data, error } = await supabase
    .from('service_areas')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    throw error;
  }

  return data;
};

/**
 * Find providers offering a specific service in a specific area
 */
export const findProvidersForService = async (
  serviceId: string,
  areaId?: string
) => {
  // First get provider services
  const { data: providerServices, error } = await supabase
    .from('provider_services')
    .select(
      `
      *,
      services(*),
      provider_id
    `
    )
    .eq('service_id', serviceId)
    .eq('is_available', true);

  if (error) {
    throw error;
  }

  if (!providerServices || providerServices.length === 0) {
    return [];
  }

  // Get provider profiles for these providers
  const providerIds = providerServices.map((ps) => ps.provider_id);

  const { data: providers, error: providersError } = await supabase
    .from('provider_profiles')
    .select('*')
    .in('user_id', providerIds);

  if (providersError) {
    throw providersError;
  }

  // If an area ID is provided, filter providers by service area
  let filteredProviders = providers;
  if (areaId && providers) {
    filteredProviders = providers.filter((provider) => {
      if (!provider.service_areas) return false;
      const serviceAreas = Array.isArray(provider.service_areas)
        ? provider.service_areas
        : [];
      return serviceAreas.includes(areaId);
    });
  }

  // Combine the data
  return providerServices
    .map((ps) => {
      const provider = filteredProviders.find(
        (p) => p.user_id === ps.provider_id
      );
      return {
        ...ps,
        provider_profile: provider || null,
      };
    })
    .filter((item) => item.provider_profile !== null);
};
