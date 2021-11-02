import {
  Container,
  VStack,
  useColorModeValue as mode,
  Box
} from '@chakra-ui/react';
import React from 'react';
import SidebarWired from '../../components/Sidebar/SidebarWired';
import FeatureTabsWired from '../../components/FeatureTabs/FeatureTabsWired';
import useActiveChats from '../../hooks/useActiveChats';
import { ChatDetailsWired, ChatPanelWired } from '../..';
import ChatTabWired from '../../components/ChatTabHeadStrip/ChatTabWired';
import { getIdFromActiveChat } from '../../models/chat/ActiveChat';

const PluginViewApp = () => {
  const { activeChats, openIndex, detailOpenIndex } = useActiveChats();

  // const fullyOpen = sidebarCollapsed && detailOpenIndex < 0;
  // const onlyDetailOpen = sidebarCollapsed && detailOpenIndex >= 0;
  // const onlySidebarOpen = !sidebarCollapsed && detailOpenIndex < 0;
  const activeChat = activeChats[openIndex];

  return (
    <Container
      maxW="full"
      h={480}
      overflowX="hidden"
      overflowY="hidden"
      padding={0}
      backgroundColor={mode('background.light', 'background.dark')}
    >
      {openIndex < 0 ? (
        <VStack height="full" width="full">
          <Box height="calc(100% - 82px)">
            <SidebarWired hideHamburger={true} />
          </Box>
          <FeatureTabsWired orientation="horizontal" />
        </VStack>
      ) : detailOpenIndex < 0 ? (
        <Box height="full" width="full">
          <ChatTabWired
            key={getIdFromActiveChat(activeChat) ?? 'active_chat'}
            showBack={true}
          />
          <ChatPanelWired activeChat={activeChat} isPlugin={true} />
        </Box>
      ) : (
        <ChatDetailsWired activeChat={activeChat} />
      )}
    </Container>
  );
};

export default PluginViewApp;
