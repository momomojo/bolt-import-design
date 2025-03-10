import { create } from 'zustand';
import * as ProviderAPI from '../api/providers';
import { Database } from '../types/database.types';

// Type aliases for improved readability
type ProviderProfileRow =
  Database['public']['Tables']['provider_profiles']['Row'];
type ProfileRow = Database['public']['Tables']['profiles']['Row'];

// Combined provider profile interface with both profile and provider-specific data
interface ProviderProfile {
  // From base profile table
  id: string;
  role: Database['public']['Enums']['user_role'];
  full_name: string | null;
  avatar_url: string | null;
  created_at: string | null;
  updated_at: string | null;

  // From provider_profiles table
  business_name: string | null;
  description: string | null;
  phone: string | null;
  website: string | null;
  business_address: string | null;
  service_areas: string[] | null;
  availability: Database['public']['Tables']['provider_profiles']['Row']['availability'];
  qualifications: Database['public']['Tables']['provider_profiles']['Row']['qualifications'];
}

interface ProviderState {
  // State
  profile: ProviderProfile | null;
  isLoading: boolean;
  error: Error | null;

  // Actions
  fetchProfile: (userId: string) => Promise<void>;
  updateProfile: (
    userId: string,
    data: Partial<ProviderProfile>
  ) => Promise<void>;
  reset: () => void;
}

export const useProviderStore = create<ProviderState>((set) => ({
  // Initial state
  profile: null,
  isLoading: false,
  error: null,

  // Fetch provider profile
  fetchProfile: async (userId: string) => {
    try {
      set({ isLoading: true, error: null });
      const profile = await ProviderAPI.getProviderProfile(userId);
      set({ profile: profile as ProviderProfile, isLoading: false });
    } catch (error) {
      console.error('Error fetching provider profile:', error);
      set({
        error: error as Error,
        isLoading: false,
      });
    }
  },

  // Update provider profile
  updateProfile: async (userId: string, data: Partial<ProviderProfile>) => {
    try {
      set({ isLoading: true, error: null });

      const updatedProfile = await ProviderAPI.updateProviderProfile(userId, {
        full_name: data.full_name,
        avatar_url: data.avatar_url,
        business_name: data.business_name,
        description: data.description,
        phone: data.phone,
        website: data.website,
        business_address: data.business_address,
        service_areas: data.service_areas,
        availability: data.availability,
        qualifications: data.qualifications,
      });

      set({
        profile: updatedProfile as ProviderProfile,
        isLoading: false,
      });
    } catch (error) {
      console.error('Error updating provider profile:', error);
      set({
        error: error as Error,
        isLoading: false,
      });
    }
  },

  // Reset state
  reset: () => {
    set({
      profile: null,
      isLoading: false,
      error: null,
    });
  },
}));
