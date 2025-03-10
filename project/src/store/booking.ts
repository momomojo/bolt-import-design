import { create } from 'zustand';
import { bookings } from '../api';

interface Booking {
  id: string;
  customer_id: string;
  provider_id: string;
  service_id: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  booking_date: string;
  start_time: string;
  end_time: string;
  total_price: number;
  address: string;
  notes: string | null;
  created_at: string;
  updated_at: string;

  // Optional joined data
  customer?: {
    id: string;
    role: string;
    full_name: string | null;
    avatar_url: string | null;
    phone: string | null;
  };

  provider?: {
    id: string;
    role: string;
    full_name: string | null;
    avatar_url: string | null;
    phone: string | null;
    provider_profiles?: {
      business_name: string | null;
      business_address: string | null;
      rating: number | null;
      verified: boolean;
    };
  };

  service?: {
    id: string;
    name: string;
    description: string | null;
    base_price: number;
    duration_minutes: number;
    category: string;
    active: boolean;
  };
}

interface BookingState {
  // State
  customerBookings: Booking[];
  providerBookings: Booking[];
  selectedBooking: Booking | null;
  isLoading: boolean;
  error: Error | null;

  // Actions
  fetchCustomerBookings: (customerId: string, status?: string) => Promise<void>;
  fetchProviderBookings: (providerId: string, status?: string) => Promise<void>;
  fetchBookingById: (bookingId: string) => Promise<void>;
  createBooking: (
    customerId: string,
    providerId: string,
    serviceId: string,
    bookingDate: string,
    startTime: string,
    endTime: string,
    totalPrice: number,
    address: string,
    notes?: string
  ) => Promise<Booking | null>;
  updateBookingStatus: (
    bookingId: string,
    status: 'pending' | 'confirmed' | 'completed' | 'cancelled'
  ) => Promise<void>;
  cancelBooking: (bookingId: string) => Promise<void>;
  reset: () => void;
}

export const useBookingStore = create<BookingState>((set, get) => ({
  // Initial state
  customerBookings: [],
  providerBookings: [],
  selectedBooking: null,
  isLoading: false,
  error: null,

  // Actions
  fetchCustomerBookings: async (customerId: string, status?: string) => {
    try {
      set({ isLoading: true, error: null });
      const data = await bookings.getCustomerBookings(customerId, status);
      set({ customerBookings: data || [], isLoading: false });
    } catch (error) {
      set({ error: error as Error, isLoading: false });
      console.error('Error fetching customer bookings:', error);
    }
  },

  fetchProviderBookings: async (providerId: string, status?: string) => {
    try {
      set({ isLoading: true, error: null });
      const data = await bookings.getProviderBookings(providerId, status);
      set({ providerBookings: data || [], isLoading: false });
    } catch (error) {
      set({ error: error as Error, isLoading: false });
      console.error('Error fetching provider bookings:', error);
    }
  },

  fetchBookingById: async (bookingId: string) => {
    try {
      set({ isLoading: true, error: null });
      const data = await bookings.getBookingById(bookingId);
      set({ selectedBooking: data, isLoading: false });
    } catch (error) {
      set({ error: error as Error, isLoading: false });
      console.error('Error fetching booking details:', error);
    }
  },

  createBooking: async (
    customerId: string,
    providerId: string,
    serviceId: string,
    bookingDate: string,
    startTime: string,
    endTime: string,
    totalPrice: number,
    address: string,
    notes?: string
  ) => {
    try {
      set({ isLoading: true, error: null });
      const data = await bookings.createBooking(
        customerId,
        providerId,
        serviceId,
        bookingDate,
        startTime,
        endTime,
        totalPrice,
        address,
        notes
      );

      // Add the new booking to the customer bookings list
      set((state) => ({
        customerBookings: [data as Booking, ...state.customerBookings],
        isLoading: false,
      }));

      return data as Booking;
    } catch (error) {
      set({ error: error as Error, isLoading: false });
      console.error('Error creating booking:', error);
      return null;
    }
  },

  updateBookingStatus: async (
    bookingId: string,
    status: 'pending' | 'confirmed' | 'completed' | 'cancelled'
  ) => {
    try {
      set({ isLoading: true, error: null });
      const updatedBooking = await bookings.updateBookingStatus(
        bookingId,
        status
      );

      // Update in both arrays if present
      set((state) => ({
        customerBookings: state.customerBookings.map((booking) =>
          booking.id === bookingId ? (updatedBooking as Booking) : booking
        ),
        providerBookings: state.providerBookings.map((booking) =>
          booking.id === bookingId ? (updatedBooking as Booking) : booking
        ),
        selectedBooking:
          state.selectedBooking?.id === bookingId
            ? (updatedBooking as Booking)
            : state.selectedBooking,
        isLoading: false,
      }));
    } catch (error) {
      set({ error: error as Error, isLoading: false });
      console.error('Error updating booking status:', error);
    }
  },

  cancelBooking: async (bookingId: string) => {
    return get().updateBookingStatus(bookingId, 'cancelled');
  },

  reset: () => {
    set({
      customerBookings: [],
      providerBookings: [],
      selectedBooking: null,
      isLoading: false,
      error: null,
    });
  },
}));
