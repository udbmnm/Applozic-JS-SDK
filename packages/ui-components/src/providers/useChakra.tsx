import React from "react";
import theme from "../theme";
import { ChakraProvider } from "@chakra-ui/react";

function ProvideChakra({
  children,
  initialColorMode,
  useSystemColorMode,
}: {
  children: React.ReactNode;
  initialColorMode: "light" | "dark";
  useSystemColorMode: boolean;
}) {
  return (
    <ChakraProvider theme={theme({ initialColorMode, useSystemColorMode })}>
      {children}
    </ChakraProvider>
  );
}

export default ProvideChakra;
