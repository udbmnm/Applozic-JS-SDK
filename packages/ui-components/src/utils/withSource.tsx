import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "../theme";
import { QueryClientProvider, QueryClient } from "react-query";

export interface WithSourceProps {
  //   applicationId: string;
}

const applozicQueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
    },
  },
});

const withSource = <P extends object>(
  Component: React.ComponentType<P>
): React.FC<P & WithSourceProps> => ({
  //   applicationId,
  ...props
}: WithSourceProps) => {
  return (
    <QueryClientProvider client={applozicQueryClient}>
      <ChakraProvider theme={theme}>
        <Component {...(props as P)} />
      </ChakraProvider>
    </QueryClientProvider>
  );
};

export default withSource;
