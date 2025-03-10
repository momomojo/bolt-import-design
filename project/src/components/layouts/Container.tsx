import React from 'react';
import { Box, IBoxProps } from 'native-base';

export interface ContainerProps extends IBoxProps {
  /**
   * Whether to add padding to the container
   * @default true
   */
  withPadding?: boolean;

  /**
   * Amount of padding to add when withPadding is true
   * @default 4
   */
  padding?: number | string;

  /**
   * Whether the container should take up the full height
   * @default false
   */
  fullHeight?: boolean;
}

/**
 * Container component for consistent layout spacing
 * Used as the main wrapper for screen content
 */
export const Container = ({
  withPadding = true,
  padding = 4,
  fullHeight = false,
  children,
  ...props
}: ContainerProps) => {
  return (
    <Box
      width="full"
      height={fullHeight ? 'full' : undefined}
      px={withPadding ? padding : 0}
      py={withPadding ? padding : 0}
      {...props}
    >
      {children}
    </Box>
  );
};

export default Container;
