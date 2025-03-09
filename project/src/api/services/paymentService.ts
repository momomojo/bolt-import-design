import { supabase } from '../supabase';

export interface Payment {
  id: string;
  booking_id: string;
  customer_id: string;
  provider_id: string;
  amount: number;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  payment_method: string;
  payment_intent_id?: string;
  created_at: string;
}

class PaymentService {
  // Create a payment intent
  async createPaymentIntent(bookingId: string, amount: number) {
    // In a real app, this would call a Supabase Edge Function that creates a Stripe payment intent
    // For now, we'll simulate this with a direct database call

    const { data, error } = await supabase
      .from('payments')
      .insert({
        booking_id: bookingId,
        amount,
        status: 'pending',
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  // Get payment by booking ID
  async getPaymentByBookingId(bookingId: string): Promise<Payment | null> {
    const { data, error } = await supabase
      .from('payments')
      .select('*')
      .eq('booking_id', bookingId)
      .single();

    if (error) throw error;
    return data;
  }

  // Update payment status
  async updatePaymentStatus(paymentId: string, status: Payment['status']) {
    const { data, error } = await supabase
      .from('payments')
      .update({ status })
      .eq('id', paymentId)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  // Process refund
  async processRefund(paymentId: string) {
    // In a real app, this would call a Supabase Edge Function that processes a Stripe refund
    // For now, we'll simulate this with a direct database call

    const { data, error } = await supabase
      .from('payments')
      .update({ status: 'refunded' })
      .eq('id', paymentId)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  // Get payment history for a customer
  async getCustomerPaymentHistory(customerId: string): Promise<Payment[]> {
    const { data, error } = await supabase
      .from('payments')
      .select('*')
      .eq('customer_id', customerId);

    if (error) throw error;
    return data || [];
  }

  // Get payment history for a provider
  async getProviderPaymentHistory(providerId: string): Promise<Payment[]> {
    const { data, error } = await supabase
      .from('payments')
      .select('*')
      .eq('provider_id', providerId);

    if (error) throw error;
    return data || [];
  }
}

export const paymentService = new PaymentService();
