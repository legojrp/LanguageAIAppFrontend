import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  colors: {
    primary: {
      50: '#B2EBF2',  // Light Teal
      500: '#009688',  // Teal
      700: '#00796B',  // Dark Teal
    },
    secondary: {
      50: '#C8E6C9',  // Light Green
      500: '#81C784',  // Light Green
      700: '#388E3C',  // Dark Green
    },
    accent: {
      50: '#F5E0B3',  // Light Tan
      500: '#D7CCC8',  // Warm Tan
      700: '#A1887F',  // Dark Tan
    },
    background: {
      50: '#E1F5FE',  // Light Blue
      100: '#B3E5FC', // Base Blue
      200: '#81D4FA', // Dark Blue
    },
    text: {
      50: '#757575',  // Light Gray
      800: '#424242',  // Dark Gray
      900: '#212121',  // Darker Gray
    },
  },
  styles: {
    global: {
      body: {
        backgroundColor: 'background.50',
        color: 'text.800',
      },
    },
  },
});

export default theme;
