import React from 'react';
import { Button as NBButton, IButtonProps, Text } from 'native-base';
import { TouchableOpacity } from 'react-native';

export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'outline'
  | 'danger'
  | 'success'
  | 'link';

export type ButtonProps = Omit<IButtonProps, 'variant'> & {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  isFullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
};

// Map our variant names to NativeBase variants
const variantMap: Record<
  ButtonVariant,
  { colorScheme?: string; variant: string }
> = {
  primary: { colorScheme: 'primary', variant: 'solid' },
  secondary: { colorScheme: 'secondary', variant: 'solid' },
  outline: { colorScheme: 'primary', variant: 'outline' },
  danger: { colorScheme: 'error', variant: 'solid' },
  success: { colorScheme: 'success', variant: 'solid' },
  link: { variant: 'link' },
};

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  isFullWidth = false,
  leftIcon,
  rightIcon,
  ...props
}) => {
  // Get the appropriate NativeBase variant props
  const variantProps = variantMap[variant];

  return (
    <NBButton
      onPress={onPress}
      size={size}
      isLoading={isLoading}
      width={isFullWidth ? 'full' : undefined}
      leftIcon={leftIcon}
      rightIcon={rightIcon}
      colorScheme={variantProps.colorScheme}
      variant={variantProps.variant}
      {...props}
    >
      {title}
    </NBButton>
  );
};
