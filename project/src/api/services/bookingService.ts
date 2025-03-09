import { DatabaseService } from '../database';
import { supabase } from '../supabase';

export interface Booking {
  id: string;
  customer_id: string;
  provider_id: string;
  service_type: string;
  service_date: string;
  service_time: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  price: number;
  notes?: string;
  created_at: string;
}

class BookingService extends DatabaseService<Booking> {
  constructor() {
    super('bookings');
  }

  // Get bookings by customer ID
  async getByCustomerId(customerId: string): Promise<Booking[]> {
    const response = await this.query('customer_id', 'eq', customerId);
    return response;
  }

  // Get bookings by provider ID
  async getByProviderId(providerId: string): Promise<Booking[]> {
    const response = await this.query('provider_id', 'eq', providerId);
    return response;
  }

  // Get bookings by status
  async getByStatus(status: Booking['status']): Promise<Booking[]> {
    const response = await this.query('status', 'eq', status);
    return response;
  }

  // Update booking status
  async updateStatus(
    bookingId: string,
    status: Booking['status']
  ): Promise<Booking | null> {
    return this.update(bookingId, { status });
  }

  // Get bookings with customer and provider details
  async getBookingsWithDetails() {
    const { data, error } = await supabase.from('bookings').select(`
        *,
        customers:customer_id (*),
        providers:provider_id (*)
      `);

    if (error) throw error;
    return data || [];
  }

  // Create a new booking and notify provider
  async createBooking(bookingData: Omit<Booking, 'id' | 'created_at'>) {
    // Create the booking
    const booking = await this.create(bookingData);

    if (!booking) throw new Error('Failed to create booking');

    // In a real app, you would trigger a notification to the provider here
    // This could be done via Supabase Edge Functions or another service

    return booking;
  }
}

export const bookingService = new BookingService();
