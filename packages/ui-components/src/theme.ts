import { extendTheme } from '@chakra-ui/react';

export interface ITheme {
  /**
   * Initial color mode of the chat application
   */
  initialColorMode: 'light' | 'dark';
  /**
   * Decide the chat application color based on user's system theme
   */
  useSystemColorMode: boolean;
}

const theme = ({
  initialColorMode = 'light',
  useSystemColorMode = false
}: ITheme) =>
  extendTheme({
    config: {
      initialColorMode: initialColorMode,
      useSystemColorMode: useSystemColorMode
    },
    fonts: {
      heading: 'Roboto, sans-serif',
      body: 'Roboto, sans-serif'
    },
    space: {
      xs: '0.25rem',
      sm: '0.5rem',
      md: '1rem',
      lg: '1.5rem',
      xl: '2rem',
      xxl: '3rem'
    },
    colors: {
      background: {
        light: '#F8F8F8',
        dark: '#2E2D32'
      },
      primary: {
        500: '#6139C0',
        700: '#3D227C'
      },
      accent: { 500: '#6139C0', 700: '#3D227C' },
      textHeader: {
        500: '#9d9aa2'
      },
      textMain: {
        300: '#4d4858',
        400: '#6B6776',
        500: '#09021A'
      },
      textAccent: {
        500: '#6139C0'
      },
      textLight: {
        900: '#ffffff',
        500: '#b1a7c9'
      },
      sendMessageBg: {
        500: '#EBEBEC'
      }
    }
  });

export default theme;
