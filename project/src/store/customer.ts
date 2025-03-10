import { create } from 'zustand';
import * as CustomerAPI from '../api/customers';
import { Database } from '../types/database.types';

// Type aliases for improved readability
type CustomerProfileRow =
  Database['public']['Tables']['customer_profiles']['Row'];
type ProfileRow = Database['public']['Tables']['profiles']['Row'];

// Combined customer profile interface with both profile and customer-specific data
interface CustomerProfile {
  // From base profile table
  id: string;
  role: Database['public']['Enums']['user_role'];
  full_name: string | null;
  avatar_url: string | null;
  created_at: string | null;
  updated_at: string | null;

  // From customer_profiles table
  phone: string | null;
  default_address: string | null;
  payment_info: Database['public']['Tables']['customer_profiles']['Row']['payment_info'];
  preferences: Database['public']['Tables']['customer_profiles']['Row']['preferences'];
}

interface CustomerState {
  // State
  profile: CustomerProfile | null;
  isLoading: boolean;
  error: Error | null;

  // Actions
  fetchProfile: (userId: string) => Promise<void>;
  updateProfile: (
    userId: string,
    data: Partial<CustomerProfile>
  ) => Promise<void>;
  reset: () => void;
}

export const useCustomerStore = create<CustomerState>((set) => ({
  // Initial state
  profile: null,
  isLoading: false,
  error: null,

  // Fetch customer profile
  fetchProfile: async (userId: string) => {
    try {
      set({ isLoading: true, error: null });
      const profile = await CustomerAPI.getCustomerProfile(userId);
      set({ profile: profile as CustomerProfile, isLoading: false });
    } catch (error) {
      console.error('Error fetching customer profile:', error);
      set({
        error: error as Error,
        isLoading: false,
      });
    }
  },

  // Update customer profile
  updateProfile: async (userId: string, data: Partial<CustomerProfile>) => {
    try {
      set({ isLoading: true, error: null });

      const updatedProfile = await CustomerAPI.updateCustomerProfile(userId, {
        full_name: data.full_name || undefined,
        avatar_url: data.avatar_url || undefined,
        phone: data.phone || undefined,
        default_address: data.default_address || undefined,
        payment_info: data.payment_info || undefined,
        preferences: data.preferences || undefined,
      });

      set({
        profile: updatedProfile as CustomerProfile,
        isLoading: false,
      });
    } catch (error) {
      console.error('Error updating customer profile:', error);
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
