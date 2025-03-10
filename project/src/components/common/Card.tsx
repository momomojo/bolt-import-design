import React from 'react';
import { Box, IBoxProps, useTheme } from 'native-base';

export interface CardProps extends IBoxProps {
  /**
   * Whether to show a shadow
   * @default true
   */
  withShadow?: boolean;

  /**
   * Whether to show a border
   * @default false
   */
  withBorder?: boolean;

  /**
   * Card content padding
   * @default 4
   */
  padding?: number | string;
}

/**
 * Card component for displaying content in a contained box
 * with consistent styling across the app
 */
export const Card = ({
  withShadow = true,
  withBorder = false,
  padding = 4,
  children,
  ...props
}: CardProps) => {
  const theme = useTheme();

  return (
    <Box
      bg="white"
      rounded="lg"
      p={padding}
      shadow={withShadow ? 2 : 0}
      borderWidth={withBorder ? 1 : 0}
      borderColor={withBorder ? 'gray.200' : undefined}
      {...props}
    >
      {children}
    </Box>
  );
};

/**
 * Card.Header component for card headers
 */
export const CardHeader = ({ children, ...props }: IBoxProps) => (
  <Box
    pb={3}
    mb={3}
    borderBottomWidth={1}
    borderBottomColor="gray.100"
    {...props}
  >
    {children}
  </Box>
);

/**
 * Card.Body component for card content
 */
export const CardBody = ({ children, ...props }: IBoxProps) => (
  <Box {...props}>{children}</Box>
);

/**
 * Card.Footer component for card footers
 */
export const CardFooter = ({ children, ...props }: IBoxProps) => (
  <Box pt={3} mt={3} borderTopWidth={1} borderTopColor="gray.100" {...props}>
    {children}
  </Box>
);

// Attach components to Card
Card.Header = CardHeader;
Card.Body = CardBody;
Card.Footer = CardFooter;

export default Card;
