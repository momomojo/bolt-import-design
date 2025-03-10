import React from 'react';
import { Text as NBText, ITextProps } from 'native-base';

export interface TextProps extends ITextProps {
  /**
   * Predefined text variants
   */
  variant?: 'body' | 'subtitle' | 'caption' | 'muted' | 'error' | 'success';
}

/**
 * Text component with consistent styling across the app
 */
export const Text = ({ variant, children, ...props }: TextProps) => {
  // Define variant-specific props
  let variantProps: ITextProps = {};

  switch (variant) {
    case 'body':
      variantProps = {
        fontSize: 'md',
        color: 'gray.800',
      };
      break;
    case 'subtitle':
      variantProps = {
        fontSize: 'sm',
        fontWeight: 'medium',
        color: 'gray.700',
      };
      break;
    case 'caption':
      variantProps = {
        fontSize: 'xs',
        color: 'gray.500',
      };
      break;
    case 'muted':
      variantProps = {
        fontSize: 'sm',
        color: 'gray.400',
      };
      break;
    case 'error':
      variantProps = {
        fontSize: 'sm',
        color: 'error.500',
      };
      break;
    case 'success':
      variantProps = {
        fontSize: 'sm',
        color: 'success.500',
      };
      break;
    default:
      variantProps = {
        fontSize: 'md',
        color: 'gray.800',
      };
  }

  return (
    <NBText {...variantProps} {...props}>
      {children}
    </NBText>
  );
};

export default Text;
