import { Container, HStack, useColorModeValue as mode } from "@chakra-ui/react";
import React from "react";
import ChatWindowWired from "../../components/ChatWindow/ChatWindowWired";
import SidebarWired from "../../components/Sidebar/SidebarWired";
import FeatureSidebarWired from "../../components/FeatureSidebar/FeatureSidebarWired";

export interface FullViewAppProps {
  /** GIPHY API Key */
  giphyApiKey?: string;
  /** Google Maps API Key */
  gMapsApiKey?: string;
}

const FullViewApp = ({ giphyApiKey, gMapsApiKey }: FullViewAppProps) => {
  return (
    <Container
      maxWidth="100vw"
      height="100vh"
      overflowX="hidden"
      overflowY="hidden"
      padding={2}
      backgroundColor={mode("background.light", "background.dark")}
    >
      <HStack maxWidth="full" height="full" alignItems="flex-start">
        <FeatureSidebarWired />
        <SidebarWired />
        <ChatWindowWired giphyApiKey={giphyApiKey} gMapsApiKey={gMapsApiKey} />
      </HStack>
    </Container>
  );
};

export default FullViewApp;
