import { DatabaseService } from '../database';
import { supabase } from '../supabase';

export interface Provider {
  id: string;
  user_id: string;
  name: string;
  email: string;
  phone?: string;
  business_name?: string;
  service_area?: string[];
  service_types?: string[];
  rating?: number;
  created_at: string;
}

class ProviderService extends DatabaseService<Provider> {
  constructor() {
    super('providers');
  }

  // Get provider by user ID
  async getByUserId(userId: string): Promise<Provider | null> {
    const response = await this.query('user_id', 'eq', userId);
    return response.length > 0 ? response[0] : null;
  }

  // Get provider's scheduled bookings
  async getSchedule(providerId: string) {
    const { data, error } = await supabase
      .from('bookings')
      .select('*')
      .eq('provider_id', providerId);

    if (error) throw error;
    return data;
  }

  // Get providers by service area
  async getByServiceArea(area: string): Promise<Provider[]> {
    const { data, error } = await supabase
      .from('providers')
      .select('*')
      .contains('service_area', [area]);

    if (error) throw error;
    return data || [];
  }

  // Update provider availability
  async updateAvailability(providerId: string, availability: any) {
    const { data, error } = await supabase
      .from('provider_availability')
      .upsert({
        provider_id: providerId,
        availability,
      });

    if (error) throw error;
    return data;
  }
}

export const providerService = new ProviderService();
