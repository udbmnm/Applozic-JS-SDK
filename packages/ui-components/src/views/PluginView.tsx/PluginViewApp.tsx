import { VStack, Box } from '@chakra-ui/react';
import React from 'react';
import SidebarWired from '../../components/Sidebar/SidebarWired';
import FeatureTabsWired from '../../components/FeatureTabs/FeatureTabsWired';
import useActiveChats from '../../hooks/useActiveChats';
import { ChatDetailsWired, ChatPanelWired } from '../..';
import ChatTabWired from '../../components/ChatTabHeadStrip/ChatTabWired';
import { getIdFromActiveChat } from '../../models/chat/ActiveChat';

const PluginViewApp = () => {
  const { activeChats, openIndex, detailOpenIndex } = useActiveChats();
  const activeChat = activeChats[openIndex];
  if (openIndex < 0) {
    return (
      <VStack height="full" width="full">
        <Box height="calc(100% - 82px)">
          <SidebarWired hideHamburger={true} />
        </Box>
        <FeatureTabsWired orientation="horizontal" />
      </VStack>
    );
  } else {
    if (detailOpenIndex < 0) {
      return (
        <Box height="full" width="full">
          <ChatTabWired
            key={getIdFromActiveChat(activeChat) ?? 'active_chat'}
            showBack={true}
          />
          <ChatPanelWired activeChat={activeChat} isPlugin={true} />
        </Box>
      );
    } else {
      return <ChatDetailsWired activeChat={activeChat} />;
    }
  }
};

export default PluginViewApp;
