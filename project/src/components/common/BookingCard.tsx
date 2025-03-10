import React from 'react';
import {
  Box,
  HStack,
  VStack,
  Icon,
  Badge,
  Divider,
  Pressable,
} from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';
import { Card } from './Card';
import { Heading, Text } from './Typography';

export type BookingStatus =
  | 'pending'
  | 'confirmed'
  | 'in_progress'
  | 'completed'
  | 'cancelled';

export type Booking = {
  id: string;
  service_name: string;
  service_category?: string;
  provider_name: string;
  customer_name: string;
  status: BookingStatus;
  date: string; // ISO date string
  start_time: string; // HH:MM format
  end_time: string; // HH:MM format
  price: number;
  location?: string;
  notes?: string;
};

export interface BookingCardProps {
  booking: Booking;
  userType: 'customer' | 'provider' | 'admin';
  onPress?: () => void;
  onCancel?: () => void;
  onReschedule?: () => void;
  onComplete?: () => void;
}

const BookingCard: React.FC<BookingCardProps> = ({
  booking,
  userType,
  onPress,
  onCancel,
  onReschedule,
  onComplete,
}) => {
  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  // Get status badge color
  const getStatusColor = (status: BookingStatus) => {
    switch (status) {
      case 'pending':
        return 'warning';
      case 'confirmed':
        return 'info';
      case 'in_progress':
        return 'primary';
      case 'completed':
        return 'success';
      case 'cancelled':
        return 'error';
      default:
        return 'gray';
    }
  };

  // Get status display text
  const getStatusText = (status: BookingStatus) => {
    switch (status) {
      case 'pending':
        return 'Pending';
      case 'confirmed':
        return 'Confirmed';
      case 'in_progress':
        return 'In Progress';
      case 'completed':
        return 'Completed';
      case 'cancelled':
        return 'Cancelled';
      default:
        return status;
    }
  };

  const cardContent = (
    <VStack space={3}>
      <HStack justifyContent="space-between" alignItems="center">
        <Heading variant="h4">{booking.service_name}</Heading>
        <Badge
          colorScheme={getStatusColor(booking.status)}
          variant="solid"
          rounded="md"
        >
          <Text color="white" fontSize="xs">
            {getStatusText(booking.status)}
          </Text>
        </Badge>
      </HStack>

      {booking.service_category && (
        <Text variant="muted">{booking.service_category}</Text>
      )}

      <Divider my={1} />

      <VStack space={2}>
        <HStack space={2} alignItems="center">
          <Icon as={MaterialIcons} name="event" size="sm" color="gray.600" />
          <Text>{formatDate(booking.date)}</Text>
        </HStack>

        <HStack space={2} alignItems="center">
          <Icon as={MaterialIcons} name="schedule" size="sm" color="gray.600" />
          <Text>{`${booking.start_time} - ${booking.end_time}`}</Text>
        </HStack>

        <HStack space={2} alignItems="center">
          <Icon
            as={MaterialIcons}
            name="attach-money"
            size="sm"
            color="gray.600"
          />
          <Text fontWeight="bold">{formatCurrency(booking.price)}</Text>
        </HStack>

        {userType === 'customer' && (
          <HStack space={2} alignItems="center">
            <Icon as={MaterialIcons} name="person" size="sm" color="gray.600" />
            <Text>Provider: {booking.provider_name}</Text>
          </HStack>
        )}

        {userType === 'provider' && (
          <HStack space={2} alignItems="center">
            <Icon as={MaterialIcons} name="person" size="sm" color="gray.600" />
            <Text>Customer: {booking.customer_name}</Text>
          </HStack>
        )}

        {booking.location && (
          <HStack space={2} alignItems="center">
            <Icon
              as={MaterialIcons}
              name="location-on"
              size="sm"
              color="gray.600"
            />
            <Text>{booking.location}</Text>
          </HStack>
        )}

        {booking.notes && (
          <HStack space={2} alignItems="flex-start">
            <Icon
              as={MaterialIcons}
              name="notes"
              size="sm"
              color="gray.600"
              mt={1}
            />
            <Text flex={1}>{booking.notes}</Text>
          </HStack>
        )}
      </VStack>

      {/* Action buttons based on booking status and user type */}
      {(onCancel || onReschedule || onComplete) && (
        <HStack space={2} justifyContent="flex-end" mt={2}>
          {onCancel &&
            booking.status !== 'cancelled' &&
            booking.status !== 'completed' && (
              <Box
                px={3}
                py={1}
                bg="red.100"
                rounded="md"
                onTouchEnd={onCancel}
              >
                <Text color="red.600">Cancel</Text>
              </Box>
            )}

          {onReschedule &&
            booking.status !== 'cancelled' &&
            booking.status !== 'completed' && (
              <Box
                px={3}
                py={1}
                bg="amber.100"
                rounded="md"
                onTouchEnd={onReschedule}
              >
                <Text color="amber.600">Reschedule</Text>
              </Box>
            )}

          {onComplete &&
            booking.status === 'in_progress' &&
            userType === 'provider' && (
              <Box
                px={3}
                py={1}
                bg="green.100"
                rounded="md"
                onTouchEnd={onComplete}
              >
                <Text color="green.600">Complete</Text>
              </Box>
            )}
        </HStack>
      )}
    </VStack>
  );

  // If there's an onPress handler, wrap the content in a Pressable
  if (onPress) {
    return (
      <Pressable onPress={onPress}>
        <Card>{cardContent}</Card>
      </Pressable>
    );
  }

  // Otherwise, just render the card
  return <Card>{cardContent}</Card>;
};

export default BookingCard;
