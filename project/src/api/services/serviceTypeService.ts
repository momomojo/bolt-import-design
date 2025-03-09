import { DatabaseService } from '../database';
import { supabase } from '../supabase';

export interface ServiceType {
  id: string;
  name: string;
  description: string;
  base_price: number;
  duration_minutes: number;
  image_url?: string;
  is_active: boolean;
  created_at: string;
}

class ServiceTypeService extends DatabaseService<ServiceType> {
  constructor() {
    super('service_types');
  }

  // Get active service types
  async getActiveServiceTypes(): Promise<ServiceType[]> {
    const response = await this.query('is_active', 'eq', true);
    return response;
  }

  // Get service types by price range
  async getByPriceRange(
    minPrice: number,
    maxPrice: number
  ): Promise<ServiceType[]> {
    const { data, error } = await supabase
      .from('service_types')
      .select('*')
      .gte('base_price', minPrice)
      .lte('base_price', maxPrice)
      .eq('is_active', true);

    if (error) throw error;
    return data || [];
  }
}

export const serviceTypeService = new ServiceTypeService();
