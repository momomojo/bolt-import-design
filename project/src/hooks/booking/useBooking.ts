import { useCallback } from 'react';
import { useBookingStore } from '../../store';
import { useAuth } from '../auth/useAuth';

/**
 * Custom hook for managing bookings, providing easy access to booking-related functionality
 * with role-based handling.
 */
export const useBooking = () => {
  const {
    customerBookings,
    providerBookings,
    selectedBooking,
    isLoading,
    error,
    fetchCustomerBookings,
    fetchProviderBookings,
    fetchBookingById,
    createBooking,
    updateBookingStatus,
    cancelBooking,
    reset,
  } = useBookingStore();

  const { user, userRole, isCustomer, isProvider } = useAuth();

  // Get bookings based on current user role
  const fetchUserBookings = useCallback(
    async (status?: string) => {
      if (!user?.id) return;

      if (isCustomer()) {
        await fetchCustomerBookings(user.id, status);
      } else if (isProvider()) {
        await fetchProviderBookings(user.id, status);
      }
    },
    [
      user?.id,
      isCustomer,
      isProvider,
      fetchCustomerBookings,
      fetchProviderBookings,
    ]
  );

  // Get all bookings for the current user
  const fetchAllUserBookings = useCallback(async () => {
    await fetchUserBookings();
  }, [fetchUserBookings]);

  // Get pending bookings for the current user
  const fetchPendingBookings = useCallback(async () => {
    await fetchUserBookings('pending');
  }, [fetchUserBookings]);

  // Get confirmed bookings for the current user
  const fetchConfirmedBookings = useCallback(async () => {
    await fetchUserBookings('confirmed');
  }, [fetchUserBookings]);

  // Get completed bookings for the current user
  const fetchCompletedBookings = useCallback(async () => {
    await fetchUserBookings('completed');
  }, [fetchUserBookings]);

  // Get cancelled bookings for the current user
  const fetchCancelledBookings = useCallback(async () => {
    await fetchUserBookings('cancelled');
  }, [fetchUserBookings]);

  // Confirm a booking (provider only)
  const confirmBooking = useCallback(
    async (bookingId: string) => {
      if (!isProvider()) return;
      await updateBookingStatus(bookingId, 'confirmed');
    },
    [isProvider, updateBookingStatus]
  );

  // Complete a booking (provider only)
  const completeBooking = useCallback(
    async (bookingId: string) => {
      if (!isProvider()) return;
      await updateBookingStatus(bookingId, 'completed');
    },
    [isProvider, updateBookingStatus]
  );

  // Get current bookings (the ones relevant to the user's role)
  const getCurrentBookings = useCallback(() => {
    if (isCustomer()) {
      return customerBookings;
    } else if (isProvider()) {
      return providerBookings;
    }
    return [];
  }, [isCustomer, isProvider, customerBookings, providerBookings]);

  return {
    // State
    bookings: getCurrentBookings(),
    customerBookings,
    providerBookings,
    selectedBooking,
    isLoading,
    error,

    // Actions
    fetchBookingById,
    fetchAllUserBookings,
    fetchPendingBookings,
    fetchConfirmedBookings,
    fetchCompletedBookings,
    fetchCancelledBookings,
    createBooking,
    confirmBooking,
    completeBooking,
    cancelBooking,
    reset,
  };
};
