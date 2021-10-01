import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import theme, { ITheme } from "../../theme";
import { QueryClientProvider, QueryClient } from "react-query";
import FullViewBare, { IFullViewBare } from "./FullViewBare";

const applozicQueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
    },
  },
});

interface IFullView extends IFullViewBare, ITheme {}

const FullView = ({
  initialColorMode,
  useSystemColorMode,
  ...rest
}: IFullView) => {
  return (
    <QueryClientProvider client={applozicQueryClient}>
      <ChakraProvider theme={theme({ initialColorMode, useSystemColorMode })}>
        <FullViewBare {...rest} />
      </ChakraProvider>
    </QueryClientProvider>
  );
};
export default FullView;
