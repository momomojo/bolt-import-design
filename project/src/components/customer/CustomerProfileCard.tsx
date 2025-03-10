import React from 'react';
import { Box, Avatar, HStack, VStack } from 'native-base';
import { Card } from '../common/Card';
import { Heading, Text } from '../common/Typography';
import { Database } from '../../types/database.types';

type CustomerProfile = {
  id: string;
  full_name: string | null;
  avatar_url: string | null;
  phone: string | null;
  default_address: string | null;
};

interface CustomerProfileCardProps {
  profile: CustomerProfile;
  onEdit?: () => void;
}

/**
 * CustomerProfileCard displays a customer's profile information
 * in a card format
 */
export const CustomerProfileCard = ({
  profile,
  onEdit,
}: CustomerProfileCardProps) => {
  return (
    <Card>
      <Card.Header>
        <HStack space={4} alignItems="center">
          <Avatar
            size="lg"
            source={
              profile.avatar_url ? { uri: profile.avatar_url } : undefined
            }
            bg="primary.500"
          >
            {profile.full_name
              ? profile.full_name.charAt(0).toUpperCase()
              : 'C'}
          </Avatar>
          <VStack>
            <Heading variant="h4">{profile.full_name || 'Customer'}</Heading>
            {profile.phone && <Text variant="subtitle">{profile.phone}</Text>}
          </VStack>
        </HStack>
      </Card.Header>

      <Card.Body>
        <VStack space={3}>
          <Box>
            <Text variant="caption">Address</Text>
            <Text>{profile.default_address || 'No address provided'}</Text>
          </Box>
        </VStack>
      </Card.Body>
    </Card>
  );
};

export default CustomerProfileCard;
