import { useState, useCallback, useEffect } from 'react';
import { services } from '../../api';
import { useAuth } from '../auth/useAuth';

/**
 * Custom hook for managing services, providing easy access to service-related functionality.
 */
export const useServices = () => {
  const [allServices, setAllServices] = useState<any[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedService, setSelectedService] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const { isAdmin } = useAuth();

  // Fetch all active services
  const fetchServices = useCallback(async (categoryFilter?: string) => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await services.getServices(categoryFilter);
      setAllServices(data || []);
      setIsLoading(false);
    } catch (error) {
      setError(error as Error);
      setIsLoading(false);
      console.error('Error fetching services:', error);
    }
  }, []);

  // Fetch service categories
  const fetchCategories = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await services.getServiceCategories();
      setCategories(data || []);
      setIsLoading(false);
    } catch (error) {
      setError(error as Error);
      setIsLoading(false);
      console.error('Error fetching service categories:', error);
    }
  }, []);

  // Fetch a specific service by ID
  const fetchServiceById = useCallback(async (serviceId: string) => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await services.getServiceById(serviceId);
      setSelectedService(data);
      setIsLoading(false);
    } catch (error) {
      setError(error as Error);
      setIsLoading(false);
      console.error('Error fetching service details:', error);
    }
  }, []);

  // Create a new service (admin only)
  const createService = useCallback(
    async (
      name: string,
      basePrice: number,
      durationMinutes: number,
      category: string,
      description?: string
    ) => {
      if (!isAdmin()) return null;

      try {
        setIsLoading(true);
        setError(null);
        const data = await services.createService(
          name,
          basePrice,
          durationMinutes,
          category,
          description
        );
        setIsLoading(false);
        return data;
      } catch (error) {
        setError(error as Error);
        setIsLoading(false);
        console.error('Error creating service:', error);
        return null;
      }
    },
    [isAdmin]
  );

  // Update a service (admin only)
  const updateService = useCallback(
    async (
      serviceId: string,
      updates: {
        name?: string;
        description?: string;
        base_price?: number;
        duration_minutes?: number;
        category?: string;
        active?: boolean;
      }
    ) => {
      if (!isAdmin()) return null;

      try {
        setIsLoading(true);
        setError(null);
        const data = await services.updateService(serviceId, updates);
        setIsLoading(false);

        // Update local state if this was the selected service
        if (selectedService && selectedService.id === serviceId) {
          setSelectedService(data);
        }

        return data;
      } catch (error) {
        setError(error as Error);
        setIsLoading(false);
        console.error('Error updating service:', error);
        return null;
      }
    },
    [isAdmin, selectedService]
  );

  // Delete/deactivate a service (admin only)
  const deleteService = useCallback(
    async (serviceId: string, softDelete = true) => {
      if (!isAdmin()) return null;

      try {
        setIsLoading(true);
        setError(null);
        const data = await services.deleteService(serviceId, softDelete);
        setIsLoading(false);

        // If this was the selected service, clear it
        if (selectedService && selectedService.id === serviceId) {
          setSelectedService(null);
        }

        return data;
      } catch (error) {
        setError(error as Error);
        setIsLoading(false);
        console.error('Error deleting service:', error);
        return null;
      }
    },
    [isAdmin, selectedService]
  );

  // Initialize services on component mount
  useEffect(() => {
    fetchServices();
    fetchCategories();
  }, [fetchServices, fetchCategories]);

  return {
    // State
    services: allServices,
    categories,
    selectedService,
    isLoading,
    error,

    // Actions
    fetchServices,
    fetchCategories,
    fetchServiceById,
    createService,
    updateService,
    deleteService,
    setSelectedService,
  };
};
