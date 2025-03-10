import React from 'react';
import { Box, HStack, VStack, Icon, Divider } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';
import { Card } from '../common/Card';
import { Heading, Text } from '../common/Typography';

export type ServiceStats = {
  id: string;
  name: string;
  category: string;
  total_bookings: number;
  active_providers: number;
  avg_rating: number;
  revenue: number;
  time_period?: string;
};

export interface ServiceStatsCardProps {
  stats: ServiceStats;
  onViewDetails?: () => void;
}

const ServiceStatsCard: React.FC<ServiceStatsCardProps> = ({
  stats,
  onViewDetails,
}) => {
  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  return (
    <Card>
      <VStack space={3}>
        <HStack justifyContent="space-between" alignItems="center">
          <Heading variant="h4">{stats.name}</Heading>
          <Box bg="gray.100" px={2} py={1} rounded="md">
            <Text variant="caption">{stats.category}</Text>
          </Box>
        </HStack>

        {stats.time_period && (
          <Text variant="muted">Period: {stats.time_period}</Text>
        )}

        <Divider my={1} />

        <HStack justifyContent="space-between" flexWrap="wrap">
          <Box width="48%" mb={3}>
            <HStack space={2} alignItems="center">
              <Icon
                as={MaterialIcons}
                name="calendar-today"
                size="sm"
                color="primary.500"
              />
              <Text variant="subtitle">Bookings</Text>
            </HStack>
            <Text fontSize="xl" fontWeight="bold" mt={1}>
              {stats.total_bookings}
            </Text>
          </Box>

          <Box width="48%" mb={3}>
            <HStack space={2} alignItems="center">
              <Icon
                as={MaterialIcons}
                name="people"
                size="sm"
                color="primary.500"
              />
              <Text variant="subtitle">Active Providers</Text>
            </HStack>
            <Text fontSize="xl" fontWeight="bold" mt={1}>
              {stats.active_providers}
            </Text>
          </Box>

          <Box width="48%" mb={3}>
            <HStack space={2} alignItems="center">
              <Icon
                as={MaterialIcons}
                name="star"
                size="sm"
                color="amber.500"
              />
              <Text variant="subtitle">Avg. Rating</Text>
            </HStack>
            <Text fontSize="xl" fontWeight="bold" mt={1}>
              {stats.avg_rating.toFixed(1)}
            </Text>
          </Box>

          <Box width="48%" mb={3}>
            <HStack space={2} alignItems="center">
              <Icon
                as={MaterialIcons}
                name="attach-money"
                size="sm"
                color="green.500"
              />
              <Text variant="subtitle">Revenue</Text>
            </HStack>
            <Text fontSize="xl" fontWeight="bold" mt={1}>
              {formatCurrency(stats.revenue)}
            </Text>
          </Box>
        </HStack>

        {onViewDetails && (
          <Box
            alignSelf="flex-end"
            px={3}
            py={1}
            bg="primary.100"
            rounded="md"
            onTouchEnd={onViewDetails}
          >
            <Text color="primary.600">View Details</Text>
          </Box>
        )}
      </VStack>
    </Card>
  );
};

export default ServiceStatsCard;
