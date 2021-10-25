import { Container, VStack, useColorModeValue as mode } from '@chakra-ui/react';
import React from 'react';
import ChatWindowWired from '../../components/ChatWindow/ChatWindowWired';
import SidebarWired from '../../components/Sidebar/SidebarWired';
import FeatureTabsWired from '../../components/FeatureTabs/FeatureTabsWired';

const PluginViewApp = () => {
  return (
    <Container
      maxW="container.sm"
      //   height="80vh"
      overflowX="hidden"
      overflowY="hidden"
      padding={2}
      backgroundColor={mode('background.light', 'background.dark')}
    >
      <VStack maxWidth="full" height="full">
        <SidebarWired />
        {/* <ChatWindowWired /> */}
        <FeatureTabsWired orientation="horizontal" />
      </VStack>
    </Container>
  );
};

export default PluginViewApp;
