import React from 'react';
import { NativeBaseProvider as NBProvider, extendTheme } from 'native-base';

// Define a custom theme that uses our app's color palette
const theme = extendTheme({
  colors: {
    primary: {
      50: '#e6f7ed',
      100: '#c3ebd6',
      200: '#9fdfbe',
      500: '#16a34a', // Our primary color
      600: '#138c40',
      700: '#107536',
      800: '#0c5d2c',
      900: '#084622',
    },
    secondary: {
      50: '#e6e8ed',
      100: '#c3c7d5',
      200: '#9fa6bd',
      500: '#0f172a', // Our secondary color
      600: '#0d1425',
      700: '#0b101f',
      800: '#080d19',
      900: '#060914',
    },
    accent: {
      50: '#fef4e6',
      100: '#fde3c3',
      200: '#fbd29f',
      500: '#f59e0b', // Our accent color
      600: '#d08609',
      700: '#ac6f08',
      800: '#885806',
      900: '#654205',
    },
    error: {
      500: '#ef4444',
    },
    success: {
      500: '#22c55e',
    },
    warning: {
      500: '#f59e0b',
    },
    info: {
      500: '#3b82f6',
    },
  },
  fontConfig: {
    // Define font configurations if needed
  },
  components: {
    // Override or create custom component styles
    Button: {
      defaultProps: {
        colorScheme: 'primary',
      },
    },
    Input: {
      defaultProps: {
        focusOutlineColor: 'primary.500',
      },
    },
  },
});

// Log color config (this will help with debugging)
console.log('NativeBase theme configured with custom colors');

export const NativeBaseProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <NBProvider theme={theme}>{children}</NBProvider>;
};
