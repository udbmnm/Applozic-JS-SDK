import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "../theme";
import { QueryClientProvider, QueryClient } from "react-query";
import { ProvideApplozicClient } from "../providers/useApplozicClient";
import { ProvideActiveChats } from "../providers/useActiveChats";
import { ProvideSidebar } from "../providers/useSidebar";

export interface WithWiresProps {
  applicationId: string;
}

const applozicQueryClient = new QueryClient({
  defaultOptions: {
    queries: { refetchOnWindowFocus: false },
  },
});

const withWires = <P extends object>(
  Component: React.ComponentType<P>
): React.FC<P & WithWiresProps> => ({
  applicationId,
  ...props
}: WithWiresProps) => {
  return (
    <QueryClientProvider client={applozicQueryClient}>
      <ChakraProvider theme={theme}>
        <ProvideApplozicClient applicationId={applicationId}>
          <ProvideActiveChats>
            <ProvideSidebar defaultCollapsed={true}>
              <Component {...(props as P)} />
            </ProvideSidebar>
          </ProvideActiveChats>
        </ProvideApplozicClient>
      </ChakraProvider>
    </QueryClientProvider>
  );
};

export default withWires;
