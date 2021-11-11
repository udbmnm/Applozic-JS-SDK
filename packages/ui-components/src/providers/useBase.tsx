import React, {
  useEffect,
  useState,
  FunctionComponent,
  ReactNode,
  PropsWithChildren
} from 'react';
import theme from '../theme';
import { ChakraProvider, useColorMode } from '@chakra-ui/react';
import { Dict } from '@chakra-ui/utils';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Global, css } from '@emotion/core';
import { ReactQueryDevtools } from 'react-query/devtools';

const GlobalStyles = css`
  /*
    This will hide the focus indicator if the element receives focus via the mouse,
    but it will still show up on keyboard focus.
  */
  .js-focus-visible :focus:not([data-focus-visible-added]) {
    outline: none;
    box-shadow: none;
  }
`;

const applozicQueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      staleTime: Infinity
    }
  }
});

export interface BaseProps {
  /**
   * Set the default theme of the UI components
   */
  colorMode?: 'light' | 'dark';
  /**
   * Use the user's system level theme to decide if the UI components should be `light` or `dark`
   */
  useSystemColorMode?: boolean;

  /** The envrionment in which to initialize the UI, hides the [react query devtools](https://react-query.tanstack.com/devtools) in production mode */
  environment?: 'development' | 'production';
  /** Brand Colors */
  brandColors?: {
    /** Primary color of the theme */
    primary: string;
    /** Secondary color of the theme */
    secondary: string;
  };
}

interface BaseProviderProps extends BaseProps {
  children: React.ReactNode;
}

interface ToggledChildProps {
  colorMode: string;
}

const ToggledChild = ({
  colorMode,
  children
}: PropsWithChildren<ToggledChildProps>) => {
  const { setColorMode } = useColorMode();
  useEffect(() => {
    setColorMode(colorMode);
  }, [colorMode]);
  return <div>{children}</div>;
};

function ProvideBase({
  children,
  colorMode,
  useSystemColorMode = false,
  environment,
  brandColors
}: BaseProviderProps) {
  return (
    <QueryClientProvider client={applozicQueryClient}>
      <ChakraProvider
        theme={theme({
          useSystemColorMode,
          brandColors
        })}
      >
        <Global styles={GlobalStyles} />
        <ToggledChild colorMode={colorMode ?? 'light'}>{children}</ToggledChild>
      </ChakraProvider>
      {environment === 'development' && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
    </QueryClientProvider>
  );
}

export default ProvideBase;
