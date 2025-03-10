import React from 'react';
import { Button as NBButton, IButtonProps } from 'native-base';

export type ButtonProps = IButtonProps;

/**
 * Primary button component that extends NativeBase Button
 * with consistent styling across the app
 */
export const Button = (props: ButtonProps) => {
  return <NBButton {...props} />;
};

/**
 * Primary button with default styling
 */
export const PrimaryButton = (props: ButtonProps) => (
  <Button colorScheme="primary" {...props} />
);

/**
 * Secondary button with outline styling
 */
export const SecondaryButton = (props: ButtonProps) => (
  <Button variant="outline" colorScheme="primary" {...props} />
);

/**
 * Ghost button with transparent background
 */
export const GhostButton = (props: ButtonProps) => (
  <Button variant="ghost" colorScheme="primary" {...props} />
);

/**
 * Link button that looks like a text link
 */
export const LinkButton = (props: ButtonProps) => (
  <Button variant="link" colorScheme="primary" {...props} />
);

/**
 * Danger button for destructive actions
 */
export const DangerButton = (props: ButtonProps) => (
  <Button colorScheme="error" {...props} />
);

/**
 * Success button for confirmations
 */
export const SuccessButton = (props: ButtonProps) => (
  <Button colorScheme="success" {...props} />
);

/**
 * Warning button for cautionary actions
 */
export const WarningButton = (props: ButtonProps) => (
  <Button colorScheme="warning" {...props} />
);
