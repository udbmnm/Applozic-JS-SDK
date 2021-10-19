import { Container, HStack, useColorModeValue as mode } from '@chakra-ui/react';
import React from 'react';
import ChatWindowWired from '../../components/ChatWindow/ChatWindowWired';
import SidebarWired from '../../components/Sidebar/SidebarWired';
import FeatureTabsWired from '../../components/FeatureTabs/FeatureTabsWired';

const FullViewApp = () => {
  return (
    <Container
      maxWidth="100vw"
      height="100vh"
      overflowX="hidden"
      overflowY="hidden"
      padding={2}
      backgroundColor={mode('background.light', 'background.dark')}
    >
      <HStack maxWidth="full" height="full">
        <FeatureTabsWired />
        <SidebarWired />
        <ChatWindowWired />
      </HStack>
    </Container>
  );
};

export default FullViewApp;
