import { DatabaseService } from '../database';
import { supabase } from '../supabase';

export interface Customer {
  id: string;
  user_id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  created_at: string;
}

class CustomerService extends DatabaseService<Customer> {
  constructor() {
    super('customers');
  }

  // Get customer by user ID
  async getByUserId(userId: string): Promise<Customer | null> {
    const response = await this.query('user_id', 'eq', userId);
    return response.length > 0 ? response[0] : null;
  }

  // Get customer bookings
  async getBookings(customerId: string) {
    const { data, error } = await supabase
      .from('bookings')
      .select('*')
      .eq('customer_id', customerId);

    if (error) throw error;
    return data;
  }
}

export const customerService = new CustomerService();
