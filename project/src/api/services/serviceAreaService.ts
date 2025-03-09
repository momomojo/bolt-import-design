import { DatabaseService } from '../database';
import { supabase } from '../supabase';

export interface ServiceArea {
  id: string;
  name: string;
  zip_codes: string[];
  is_active: boolean;
  created_at: string;
}

class ServiceAreaService extends DatabaseService<ServiceArea> {
  constructor() {
    super('service_areas');
  }

  // Get active service areas
  async getActiveServiceAreas(): Promise<ServiceArea[]> {
    const response = await this.query('is_active', 'eq', true);
    return response;
  }

  // Check if a zip code is serviced
  async isZipCodeServiced(zipCode: string): Promise<boolean> {
    const { data, error } = await supabase
      .from('service_areas')
      .select('id')
      .contains('zip_codes', [zipCode])
      .eq('is_active', true);

    if (error) throw error;
    return (data || []).length > 0;
  }

  // Get service areas with available providers
  async getServiceAreasWithProviders(): Promise<any[]> {
    const { data, error } = await supabase
      .from('service_areas')
      .select(
        `
        *,
        providers:providers (
          id,
          name,
          business_name,
          rating
        )
      `
      )
      .eq('is_active', true);

    if (error) throw error;
    return data || [];
  }
}

export const serviceAreaService = new ServiceAreaService();
