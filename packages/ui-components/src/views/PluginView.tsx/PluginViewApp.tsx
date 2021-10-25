import { Container, VStack, useColorModeValue as mode } from '@chakra-ui/react';
import React from 'react';
import SidebarWired from '../../components/Sidebar/SidebarWired';
import FeatureTabsWired from '../../components/FeatureTabs/FeatureTabsWired';
import useActiveChats from '../../hooks/useActiveChats';
import { ChatDetailsWired, ChatPanelWired } from '../..';

const PluginViewApp = () => {
  const { activeChats, openIndex, detailOpenIndex } = useActiveChats();

  // const fullyOpen = sidebarCollapsed && detailOpenIndex < 0;
  // const onlyDetailOpen = sidebarCollapsed && detailOpenIndex >= 0;
  // const onlySidebarOpen = !sidebarCollapsed && detailOpenIndex < 0;
  const activeChat = activeChats[openIndex];

  return (
    <Container
      maxW="container.sm"
      overflowX="hidden"
      overflowY="hidden"
      padding={2}
      backgroundColor={mode('background.light', 'background.dark')}
    >
      <VStack maxWidth="full" height="full">
        {openIndex < 0 && <SidebarWired />}
        {/* <ChatWindowWired /> */}
        {openIndex >= 0 ? (
          detailOpenIndex < 0 ? (
            <ChatPanelWired activeChat={activeChat} />
          ) : (
            <ChatDetailsWired activeChat={activeChat} />
          )
        ) : (
          <div />
        )}
        <FeatureTabsWired orientation="horizontal" />
      </VStack>
    </Container>
  );
};

export default PluginViewApp;
