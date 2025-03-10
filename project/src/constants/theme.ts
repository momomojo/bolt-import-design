import { extendTheme } from 'native-base';

// Define our custom color palette
const colors = {
  primary: {
    50: '#e6f7ff',
    100: '#bae7ff',
    200: '#91d5ff',
    300: '#69c0ff',
    400: '#40a9ff',
    500: '#1890ff', // primary color
    600: '#096dd9',
    700: '#0050b3',
    800: '#003a8c',
    900: '#002766',
  },
  secondary: {
    50: '#f0f5ff',
    100: '#d6e4ff',
    200: '#adc6ff',
    300: '#85a5ff',
    400: '#597ef7',
    500: '#2f54eb', // secondary color
    600: '#1d39c4',
    700: '#10239e',
    800: '#061178',
    900: '#030852',
  },
  success: {
    50: '#f6ffed',
    100: '#d9f7be',
    200: '#b7eb8f',
    300: '#95de64',
    400: '#73d13d',
    500: '#52c41a', // success color
    600: '#389e0d',
    700: '#237804',
    800: '#135200',
    900: '#092b00',
  },
  error: {
    50: '#fff1f0',
    100: '#ffccc7',
    200: '#ffa39e',
    300: '#ff7875',
    400: '#ff4d4f',
    500: '#f5222d', // error color
    600: '#cf1322',
    700: '#a8071a',
    800: '#820014',
    900: '#5c0011',
  },
  warning: {
    50: '#fffbe6',
    100: '#fff1b8',
    200: '#ffe58f',
    300: '#ffd666',
    400: '#ffc53d',
    500: '#faad14', // warning color
    600: '#d48806',
    700: '#ad6800',
    800: '#874d00',
    900: '#613400',
  },
  gray: {
    50: '#f9fafb',
    100: '#f3f4f6',
    200: '#e5e7eb',
    300: '#d1d5db',
    400: '#9ca3af',
    500: '#6b7280',
    600: '#4b5563',
    700: '#374151',
    800: '#1f2937',
    900: '#111827',
  },
};

// Define custom font configuration
const fonts = {
  heading: 'System',
  body: 'System',
  mono: 'System',
};

// Define custom font sizes
const fontSizes = {
  '2xs': 10,
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 20,
  '2xl': 24,
  '3xl': 30,
  '4xl': 36,
  '5xl': 48,
  '6xl': 60,
  '7xl': 72,
  '8xl': 96,
  '9xl': 128,
};

// Define custom spacing
const space = {
  px: 1,
  0.5: 2,
  1: 4,
  1.5: 6,
  2: 8,
  2.5: 10,
  3: 12,
  3.5: 14,
  4: 16,
  5: 20,
  6: 24,
  7: 28,
  8: 32,
  9: 36,
  10: 40,
  12: 48,
  16: 64,
  20: 80,
  24: 96,
  32: 128,
  40: 160,
  48: 192,
  56: 224,
  64: 256,
  72: 288,
  80: 320,
  96: 384,
};

// Define custom component styles
const components = {
  Button: {
    baseStyle: {
      rounded: 'md',
      _text: {
        fontWeight: 'semibold',
      },
    },
    defaultProps: {
      colorScheme: 'primary',
    },
    variants: {
      solid: {
        _pressed: {
          opacity: 0.8,
        },
      },
      outline: {
        borderWidth: 1,
      },
      ghost: {
        _pressed: {
          opacity: 0.6,
        },
      },
      link: {
        _pressed: {
          opacity: 0.8,
        },
        _text: {
          textDecorationLine: 'none',
        },
      },
    },
    sizes: {
      xs: {
        px: 2,
        py: 1,
        _text: {
          fontSize: 'xs',
        },
      },
      sm: {
        px: 3,
        py: 1.5,
        _text: {
          fontSize: 'sm',
        },
      },
      md: {
        px: 4,
        py: 2,
        _text: {
          fontSize: 'md',
        },
      },
      lg: {
        px: 5,
        py: 2.5,
        _text: {
          fontSize: 'lg',
        },
      },
    },
  },
  Input: {
    baseStyle: {
      borderRadius: 'md',
      borderWidth: 1,
      _focus: {
        borderColor: 'primary.500',
      },
    },
    defaultProps: {
      size: 'md',
    },
  },
  FormControlLabel: {
    baseStyle: {
      _text: {
        fontSize: 'sm',
        fontWeight: 'medium',
        color: 'gray.700',
      },
    },
  },
  FormControlHelperText: {
    baseStyle: {
      _text: {
        fontSize: 'xs',
        color: 'gray.500',
      },
    },
  },
  FormControlErrorMessage: {
    baseStyle: {
      _text: {
        fontSize: 'xs',
        color: 'error.500',
      },
    },
  },
  Heading: {
    baseStyle: {
      color: 'gray.800',
      fontWeight: 'semibold',
    },
    sizes: {
      xs: { fontSize: 'md' },
      sm: { fontSize: 'lg' },
      md: { fontSize: 'xl' },
      lg: { fontSize: '2xl' },
      xl: { fontSize: '3xl' },
      '2xl': { fontSize: '4xl' },
      '3xl': { fontSize: '5xl' },
      '4xl': { fontSize: '6xl' },
    },
  },
  Text: {
    baseStyle: {
      color: 'gray.800',
    },
    variants: {
      subtle: {
        color: 'gray.500',
      },
      muted: {
        color: 'gray.400',
      },
    },
  },
  Card: {
    baseStyle: {
      p: 4,
      rounded: 'lg',
      bg: 'white',
      shadow: 1,
    },
  },
};

// Create and export the theme
export const theme = extendTheme({
  colors,
  fonts,
  fontSizes,
  space,
  components,
  config: {
    initialColorMode: 'light',
  },
});

// Type for theme
export type CustomThemeType = typeof theme;
