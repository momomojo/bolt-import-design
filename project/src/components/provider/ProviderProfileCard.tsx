import React from 'react';
import { Box, HStack, VStack, Avatar, Text, Badge, Icon } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';
import { Card } from '../common/Card';
import { Heading, Text as CustomText } from '../common/Typography';

export type ProviderProfile = {
  id: string;
  full_name: string;
  avatar_url?: string;
  business_name?: string;
  phone?: string;
  service_areas?: string[];
  rating?: number;
  review_count?: number;
  verified?: boolean;
};

export interface ProviderProfileCardProps {
  profile: ProviderProfile;
  onEdit?: () => void;
  onViewServices?: () => void;
}

const ProviderProfileCard: React.FC<ProviderProfileCardProps> = ({
  profile,
  onEdit,
  onViewServices,
}) => {
  return (
    <Card>
      <HStack space={4} alignItems="center">
        <Avatar
          size="lg"
          source={profile.avatar_url ? { uri: profile.avatar_url } : undefined}
        >
          {profile.full_name?.charAt(0) || 'P'}
        </Avatar>

        <VStack flex={1} space={1}>
          <HStack justifyContent="space-between" alignItems="center">
            <Heading variant="h4">{profile.full_name}</Heading>
            {profile.verified && (
              <Badge colorScheme="green" variant="solid" rounded="full">
                <HStack space={1} alignItems="center">
                  <Icon
                    as={MaterialIcons}
                    name="verified"
                    size="xs"
                    color="white"
                  />
                  <Text color="white" fontSize="xs">
                    Verified
                  </Text>
                </HStack>
              </Badge>
            )}
          </HStack>

          {profile.business_name && (
            <CustomText variant="subtitle">{profile.business_name}</CustomText>
          )}

          {profile.rating && (
            <HStack space={1} alignItems="center">
              <Icon
                as={MaterialIcons}
                name="star"
                size="sm"
                color="amber.500"
              />
              <CustomText>{profile.rating.toFixed(1)}</CustomText>
              {profile.review_count && (
                <CustomText variant="muted">
                  ({profile.review_count} reviews)
                </CustomText>
              )}
            </HStack>
          )}

          {profile.phone && (
            <HStack space={2} alignItems="center">
              <Icon
                as={MaterialIcons}
                name="phone"
                size="sm"
                color="gray.500"
              />
              <CustomText>{profile.phone}</CustomText>
            </HStack>
          )}

          {profile.service_areas && profile.service_areas.length > 0 && (
            <HStack space={2} alignItems="center">
              <Icon
                as={MaterialIcons}
                name="location-on"
                size="sm"
                color="gray.500"
              />
              <CustomText>{profile.service_areas.join(', ')}</CustomText>
            </HStack>
          )}
        </VStack>
      </HStack>

      {(onEdit || onViewServices) && (
        <HStack mt={4} space={2} justifyContent="flex-end">
          {onViewServices && (
            <Box
              px={3}
              py={1}
              bg="primary.100"
              rounded="md"
              onTouchEnd={onViewServices}
            >
              <CustomText color="primary.600">View Services</CustomText>
            </Box>
          )}

          {onEdit && (
            <Box px={3} py={1} bg="gray.100" rounded="md" onTouchEnd={onEdit}>
              <CustomText color="gray.600">Edit Profile</CustomText>
            </Box>
          )}
        </HStack>
      )}
    </Card>
  );
};

export default ProviderProfileCard;
