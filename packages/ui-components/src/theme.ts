import { extendTheme } from '@chakra-ui/react';

export interface ITheme {
  /**
   * Decide the chat application color based on user's system theme
   */
  useSystemColorMode: boolean;
  /** theme Colors */
  brandColors?: {
    /** Primary color of the theme */
    primary: string;
    /** Secondary color of the theme */
    secondary: string;
  };
}

const theme = ({ useSystemColorMode = false, brandColors }: ITheme) =>
  extendTheme({
    config: {
      initialColorMode: 'light',
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
      container: {
        light: '#F8F8F8',
        dark: '#2E2D32'
      },
      card: {
        light: '#FFFFFF',
        dark: '#272528'
      },
      pane: {
        light: '#E9E9E9',
        dark: '#1B191D'
      },
      border: {
        500: '#E9E9E9'
      },
      icon: {
        light: '#09021A',
        dark: '#FFFFFF'
      },
      brand: {
        primary: brandColors?.primary ?? '#6139C0',
        secondary: brandColors?.secondary ?? '#3D227C'
      },
      secondary: {
        700: '#E3DFE8'
      },
      textHeader: {
        500: '#9d9aa2'
      },
      textMain: {
        300: '#4d4858',
        400: '#6B6776',
        500: '#09021A'
      },
      textLight: {
        900: '#ffffff',
        500: '#b1a7c9'
      },
      sendMessageBg: {
        light: '#EBEBEC',
        dark: '#373539'
      }
    }
  });

export default theme;
