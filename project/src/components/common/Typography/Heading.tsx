import React from 'react';
import { Heading as NBHeading, IHeadingProps } from 'native-base';

export interface HeadingProps extends IHeadingProps {
  /**
   * Predefined heading variants
   */
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'section' | 'subtitle';
}

/**
 * Heading component with consistent styling across the app
 */
export const Heading = ({ variant, children, ...props }: HeadingProps) => {
  // Define variant-specific props
  let variantProps: IHeadingProps = {};

  switch (variant) {
    case 'h1':
      variantProps = {
        fontSize: '4xl',
        fontWeight: 'bold',
        color: 'gray.900',
        lineHeight: 'shorter',
      };
      break;
    case 'h2':
      variantProps = {
        fontSize: '3xl',
        fontWeight: 'bold',
        color: 'gray.900',
        lineHeight: 'shorter',
      };
      break;
    case 'h3':
      variantProps = {
        fontSize: '2xl',
        fontWeight: 'semibold',
        color: 'gray.800',
        lineHeight: 'shorter',
      };
      break;
    case 'h4':
      variantProps = {
        fontSize: 'xl',
        fontWeight: 'semibold',
        color: 'gray.800',
        lineHeight: 'shorter',
      };
      break;
    case 'h5':
      variantProps = {
        fontSize: 'lg',
        fontWeight: 'semibold',
        color: 'gray.700',
        lineHeight: 'shorter',
      };
      break;
    case 'h6':
      variantProps = {
        fontSize: 'md',
        fontWeight: 'semibold',
        color: 'gray.700',
        lineHeight: 'shorter',
      };
      break;
    case 'section':
      variantProps = {
        fontSize: 'lg',
        fontWeight: 'medium',
        color: 'gray.700',
        lineHeight: 'shorter',
      };
      break;
    case 'subtitle':
      variantProps = {
        fontSize: 'md',
        fontWeight: 'medium',
        color: 'gray.600',
        lineHeight: 'shorter',
      };
      break;
    default:
      variantProps = {
        fontSize: '2xl',
        fontWeight: 'semibold',
        color: 'gray.800',
        lineHeight: 'shorter',
      };
  }

  return (
    <NBHeading {...variantProps} {...props}>
      {children}
    </NBHeading>
  );
};

export default Heading;
