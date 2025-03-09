import React from 'react';
import {
  Box,
  VStack,
  HStack,
  Text,
  Heading,
  Input,
  FormControl,
  Switch,
  Checkbox,
  Radio,
  Select,
  TextArea,
  Divider,
  Avatar,
  Badge,
  Icon,
  Alert,
  Progress,
  Spinner,
  useToast,
} from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import { Button } from '../common/Button';

export const ComponentExamples = () => {
  const toast = useToast();

  const showToast = () => {
    toast.show({
      title: 'Hello',
      description: 'This is a toast message',
      duration: 3000,
    });
  };

  return (
    <Box flex={1} p={4} bg="white">
      <VStack space={6} divider={<Divider />}>
        <Box>
          <Heading size="lg" mb={4}>
            UI Component Examples
          </Heading>
          <Text fontSize="md">
            Here are examples of NativeBase components that we can use
            throughout the app.
          </Text>
        </Box>

        {/* Buttons Section */}
        <VStack space={4}>
          <Heading size="md">Buttons</Heading>
          <Button
            title="Primary Button"
            onPress={() => console.log('Primary button pressed')}
            mb={2}
          />
          <Button
            title="Secondary Button"
            variant="secondary"
            onPress={() => console.log('Secondary button pressed')}
            mb={2}
          />
          <Button
            title="Outline Button"
            variant="outline"
            onPress={() => console.log('Outline button pressed')}
            mb={2}
          />
          <Button
            title="Danger Button"
            variant="danger"
            onPress={() => console.log('Danger button pressed')}
            mb={2}
          />
          <Button
            title="Success Button"
            variant="success"
            onPress={() => console.log('Success button pressed')}
            mb={2}
          />
          <Button
            title="Link Button"
            variant="link"
            onPress={() => console.log('Link button pressed')}
            mb={2}
          />
          <Button
            title="Loading Button"
            isLoading={true}
            onPress={() => {}}
            mb={2}
          />
          <Button
            title="Button with Icon"
            leftIcon={
              <Icon as={Ionicons} name="add-circle-outline" size="sm" />
            }
            onPress={() => console.log('Icon button pressed')}
          />
        </VStack>

        {/* Form Elements */}
        <VStack space={4}>
          <Heading size="md">Form Elements</Heading>

          <FormControl>
            <FormControl.Label>Email</FormControl.Label>
            <Input placeholder="Enter your email" />
            <FormControl.HelperText>
              We'll never share your email.
            </FormControl.HelperText>
          </FormControl>

          <FormControl>
            <FormControl.Label>Password</FormControl.Label>
            <Input type="password" placeholder="Enter password" />
          </FormControl>

          <FormControl>
            <FormControl.Label>Description</FormControl.Label>
            <TextArea
              placeholder="Enter description"
              autoCompleteType={undefined}
            />
          </FormControl>

          <FormControl>
            <FormControl.Label>Service Type</FormControl.Label>
            <Select placeholder="Select service">
              <Select.Item label="Lawn Mowing" value="lawn_mowing" />
              <Select.Item
                label="Garden Maintenance"
                value="garden_maintenance"
              />
              <Select.Item label="Hedge Trimming" value="hedge_trimming" />
            </Select>
          </FormControl>

          <HStack alignItems="center" space={2}>
            <Switch />
            <Text>Receive notifications</Text>
          </HStack>

          <Checkbox value="agree">I agree to terms and conditions</Checkbox>

          <Radio.Group name="frequency" defaultValue="1">
            <VStack space={2}>
              <Radio value="1">Weekly</Radio>
              <Radio value="2">Bi-weekly</Radio>
              <Radio value="3">Monthly</Radio>
            </VStack>
          </Radio.Group>
        </VStack>

        {/* Feedback Elements */}
        <VStack space={4}>
          <Heading size="md">Feedback Elements</Heading>

          <Alert status="info" mb={3}>
            <HStack space={2} alignItems="center">
              <Alert.Icon />
              <Text>This is an info alert</Text>
            </HStack>
          </Alert>

          <Alert status="success" mb={3}>
            <HStack space={2} alignItems="center">
              <Alert.Icon />
              <Text>This is a success alert</Text>
            </HStack>
          </Alert>

          <Alert status="error" mb={3}>
            <HStack space={2} alignItems="center">
              <Alert.Icon />
              <Text>This is an error alert</Text>
            </HStack>
          </Alert>

          <Progress value={75} mb={4} />

          <HStack space={2} alignItems="center">
            <Spinner />
            <Text>Loading...</Text>
          </HStack>

          <Button title="Show Toast" onPress={showToast} />
        </VStack>

        {/* Miscellaneous Components */}
        <VStack space={4}>
          <Heading size="md">Miscellaneous</Heading>

          <HStack space={2}>
            <Avatar
              bg="primary.500"
              source={{
                uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
              }}
            >
              JD
            </Avatar>
            <Avatar bg="secondary.500">RS</Avatar>
          </HStack>

          <HStack space={2}>
            <Badge colorScheme="success">Completed</Badge>
            <Badge colorScheme="danger">Overdue</Badge>
            <Badge colorScheme="info">In Progress</Badge>
          </HStack>
        </VStack>
      </VStack>
    </Box>
  );
};
