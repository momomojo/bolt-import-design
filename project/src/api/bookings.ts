import { supabase, handleSupabaseResponse } from './supabase';
import { Json } from '../types/database.types';
import { Database } from '../types/database.types';

// Type aliases for improved readability
type BookingStatus = Database['public']['Enums']['booking_status'];
type Booking = Database['public']['Tables']['bookings']['Row'];

// Function to create a new booking
export const createBooking = async (data: {
  customer_id: string;
  provider_id: string;
  service_id: string;
  booking_date: string;
  start_time: string;
  end_time: string;
  total_price: number;
  address: string;
  notes?: string;
}) => {
  const { data: newBooking, error } = await supabase
    .from('bookings')
    .insert({
      ...data,
      status: 'pending',
    })
    .select()
    .single();

  if (error) {
    throw error;
  }

  return newBooking;
};

// Function to get a booking by id
export const getBookingById = async (bookingId: string) => {
  const { data, error } = await supabase
    .from('bookings')
    .select(
      `
      *,
      services(*),
      provider_profiles!bookings_provider_id_fkey(
        user_id,
        business_name,
        phone,
        avatar_url
      ),
      customer_profiles!bookings_customer_id_fkey(
        user_id,
        full_name,
        phone,
        avatar_url
      )
    `
    )
    .eq('id', bookingId)
    .single();

  if (error) {
    throw error;
  }

  return data;
};

// Function to get customer bookings
export const getCustomerBookings = async (customerId: string) => {
  const { data, error } = await supabase
    .from('bookings')
    .select(
      `
      *,
      services(*),
      provider_profiles!bookings_provider_id_fkey(
        user_id,
        business_name,
        phone,
        avatar_url
      )
    `
    )
    .eq('customer_id', customerId)
    .order('booking_date', { ascending: false });

  if (error) {
    throw error;
  }

  return data;
};

// Function to get provider bookings
export const getProviderBookings = async (providerId: string) => {
  const { data, error } = await supabase
    .from('bookings')
    .select(
      `
      *,
      services(*),
      customer_profiles!bookings_customer_id_fkey(
        user_id,
        full_name,
        phone,
        avatar_url
      )
    `
    )
    .eq('provider_id', providerId)
    .order('booking_date', { ascending: false });

  if (error) {
    throw error;
  }

  return data;
};

// Function to update booking status
export const updateBookingStatus = async (
  bookingId: string,
  status: BookingStatus
) => {
  const { data, error } = await supabase
    .from('bookings')
    .update({
      status,
      updated_at: new Date().toISOString(),
    })
    .eq('id', bookingId)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
};

// Function to update booking details
export const updateBooking = async (
  bookingId: string,
  updates: {
    booking_date?: string;
    start_time?: string;
    end_time?: string;
    total_price?: number;
    address?: string;
    notes?: string;
  }
) => {
  const { data, error } = await supabase
    .from('bookings')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', bookingId)
    .select()
    .single();

  return handleSupabaseResponse({ data, error });
};

// Function to delete a booking
export const deleteBooking = async (bookingId: string) => {
  const { data, error } = await supabase
    .from('bookings')
    .delete()
    .eq('id', bookingId);

  return handleSupabaseResponse({ data, error });
};

// Function to create a review for a booking
export const createReview = async (
  bookingId: string,
  reviewerId: string,
  revieweeId: string,
  rating: number,
  comment?: string
) => {
  const { data, error } = await supabase
    .from('reviews')
    .insert({
      booking_id: bookingId,
      reviewer_id: reviewerId,
      reviewee_id: revieweeId,
      rating,
      comment,
    })
    .select()
    .single();

  return handleSupabaseResponse({ data, error });
};

// Function to get reviews for a specific provider
export const getProviderReviews = async (
  providerId: string,
  limit = 10,
  offset = 0
) => {
  const { data, error } = await supabase
    .from('reviews')
    .select(
      `
      *,
      reviewer:reviewer_id(id, role, full_name, avatar_url),
      booking:booking_id(*)
    `
    )
    .eq('reviewee_id', providerId)
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1);

  return handleSupabaseResponse({ data, error });
};

// Function to cancel a booking
export const cancelBooking = async (bookingId: string) => {
  return updateBookingStatus(bookingId, 'cancelled');
};

// Function to confirm a booking
export const confirmBooking = async (bookingId: string) => {
  return updateBookingStatus(bookingId, 'confirmed');
};

// Function to start a booking
export const startBooking = async (bookingId: string) => {
  return updateBookingStatus(bookingId, 'in_progress');
};

// Function to complete a booking
export const completeBooking = async (bookingId: string) => {
  return updateBookingStatus(bookingId, 'completed');
};
