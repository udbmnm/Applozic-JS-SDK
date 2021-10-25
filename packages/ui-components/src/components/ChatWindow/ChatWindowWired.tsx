import { Box, Tabs } from '@chakra-ui/react';
import React from 'react';
import NoChatSelected from './NoChatSelected';

import ChatDetailsWired from '../ChatDetails/ChatDetailsWired';
import ChatTabHeadStripWired from '../ChatTabHeadStrip/ChatTabHeadStripWired';
import { AnimatePresence } from 'framer-motion';
import MotionBox from '../MotionBox';
import useActiveChats from '../../hooks/useActiveChats';
import ChatPanelWired from '../ChatPanel/ChatPanelWired';

function ChatWindowWired() {
  const { activeChats, openIndex, detailOpenIndex } = useActiveChats();
  
  // const fullyOpen = sidebarCollapsed && detailOpenIndex < 0;
  // const onlyDetailOpen = sidebarCollapsed && detailOpenIndex >= 0;
  // const onlySidebarOpen = !sidebarCollapsed && detailOpenIndex < 0;
  const activeChat = activeChats[openIndex];
  return (
    <MotionBox
      display="flex"
      flex={1}
      height="calc(100vh - 63px)"
      flexDirection="row"
      flexGrow={1}
    >
      {activeChats.length === 0 || openIndex < 0 ? (
        <NoChatSelected />
      ) : (
        <Tabs
          isFitted
          variant="enclosed"
          width={detailOpenIndex > -1 ? 'calc(100% - 350px)' : 'full'}
          height="full"
          index={openIndex}
        >
          <ChatTabHeadStripWired />
          <ChatPanelWired activeChat={activeChat} />
        </Tabs>
      )}
      <AnimatePresence>
        {detailOpenIndex > -1 && <ChatDetailsWired activeChat={activeChat} />}
      </AnimatePresence>
    </MotionBox>
  );
}

export default ChatWindowWired;
