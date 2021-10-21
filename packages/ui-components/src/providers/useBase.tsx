import React, { useEffect, useState } from 'react';
import theme from '../theme';
import { ChakraProvider } from '@chakra-ui/react';
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
}

interface BaseProviderProps extends BaseProps {
  children: React.ReactNode;
}

function ProvideBase({
  children,
  colorMode,
  useSystemColorMode = false,
  environment
}: BaseProviderProps) {
  const [initialColorMode, setinitialColorMode] = useState<'light' | 'dark'>(
    'light'
  );
  const [_useSystemColorMode, setuseSystemColorMode] = useState<boolean>(false);

  const [themeDict, setthemeDict] = useState<Dict<any>>(
    theme({
      initialColorMode,
      useSystemColorMode
    })
  );

  useEffect(() => {
    if (colorMode) {
      setinitialColorMode(colorMode);
    }
  }, [colorMode]);

  useEffect(() => {
    if (useSystemColorMode) {
      setuseSystemColorMode(useSystemColorMode);
    }
  }, [useSystemColorMode]);

  useEffect(() => {
    setthemeDict(
      theme({
        initialColorMode,
        useSystemColorMode: _useSystemColorMode
      })
    );
  }, [initialColorMode, _useSystemColorMode]);

  return (
    <QueryClientProvider client={applozicQueryClient}>
      <ChakraProvider theme={themeDict}>
        <Global styles={GlobalStyles} />
        {children}
      </ChakraProvider>
      {environment === "development" && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
    </QueryClientProvider>
  );
}

export default ProvideBase;
