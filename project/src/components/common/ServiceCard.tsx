import React from 'react';
import { Box, HStack, VStack, Icon, Image, Pressable } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';
import { Card } from './Card';
import { Heading, Text } from './Typography';

export type Service = {
  id: string;
  name: string;
  category: string;
  description?: string;
  price: number;
  duration: number; // in minutes
  image_url?: string;
  rating?: number;
  review_count?: number;
};

export interface ServiceCardProps {
  service: Service;
  onPress?: () => void;
  variant?: 'default' | 'compact';
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  service,
  onPress,
  variant = 'default',
}) => {
  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  // Format duration
  const formatDuration = (minutes: number) => {
    if (minutes < 60) {
      return `${minutes} min`;
    }
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return remainingMinutes > 0
      ? `${hours} hr ${remainingMinutes} min`
      : `${hours} hr`;
  };

  const cardContent =
    variant === 'compact' ? (
      <HStack space={3} alignItems="center">
        {service.image_url && (
          <Image
            source={{ uri: service.image_url }}
            alt={service.name}
            size="sm"
            rounded="md"
            fallbackSource={{ uri: 'https://via.placeholder.com/60' }}
          />
        )}

        <VStack flex={1}>
          <Heading variant="h5">{service.name}</Heading>
          <Text variant="caption">{service.category}</Text>
        </VStack>

        <VStack alignItems="flex-end">
          <Text fontWeight="bold">{formatCurrency(service.price)}</Text>
          <Text variant="muted">{formatDuration(service.duration)}</Text>
        </VStack>
      </HStack>
    ) : (
      <VStack space={3}>
        {service.image_url && (
          <Image
            source={{ uri: service.image_url }}
            alt={service.name}
            height={150}
            rounded="md"
            fallbackSource={{ uri: 'https://via.placeholder.com/300x150' }}
          />
        )}

        <VStack space={1}>
          <HStack justifyContent="space-between" alignItems="center">
            <Heading variant="h4">{service.name}</Heading>
            <Box bg="primary.100" px={2} py={1} rounded="md">
              <Text color="primary.600">{service.category}</Text>
            </Box>
          </HStack>

          {service.description && (
            <Text numberOfLines={2}>{service.description}</Text>
          )}

          <HStack space={4} mt={2}>
            <HStack space={1} alignItems="center">
              <Icon
                as={MaterialIcons}
                name="attach-money"
                size="sm"
                color="gray.700"
              />
              <Text fontWeight="bold">{formatCurrency(service.price)}</Text>
            </HStack>

            <HStack space={1} alignItems="center">
              <Icon
                as={MaterialIcons}
                name="schedule"
                size="sm"
                color="gray.700"
              />
              <Text>{formatDuration(service.duration)}</Text>
            </HStack>

            {service.rating && (
              <HStack space={1} alignItems="center">
                <Icon
                  as={MaterialIcons}
                  name="star"
                  size="sm"
                  color="amber.500"
                />
                <Text>{service.rating.toFixed(1)}</Text>
                {service.review_count && (
                  <Text variant="muted">({service.review_count})</Text>
                )}
              </HStack>
            )}
          </HStack>
        </VStack>
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

export default ServiceCard;
