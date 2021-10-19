import { Tabs } from '@chakra-ui/react';
import React from 'react';
import NoChatSelected from './NoChatSelected';

import ChatDetailsWired from '../ChatDetails/ChatDetailsWired';
import ChatTabHeadStripWired from '../ChatTabHeadStrip/ChatTabHeadStripWired';
import { AnimatePresence } from 'framer-motion';
import MotionBox from '../MotionBox';
import useActiveChats from '../../hooks/useActiveChats';
import ChatPanelWired from '../ChatPanel/ChatPanelWired';
import useSidebar from '../../hooks/useSidebar';

function ChatWindowWired() {
  const { activeChats, openIndex, detailOpenIndex } = useActiveChats();
  const { sidebarCollapsed } = useSidebar();
  const fullyOpen = sidebarCollapsed && detailOpenIndex < 0;
  const onlyDetailOpen = sidebarCollapsed && detailOpenIndex >= 0;
  const onlySidebarOpen = !sidebarCollapsed && detailOpenIndex < 0;
  const activeChat = activeChats[openIndex];
  return (
    <MotionBox
      display="flex"
      flex={1}
      height="calc(100vh - 63px)"
      flexDirection="row"
      w={`calc(100% - ${
        fullyOpen
          ? '200px'
          : onlySidebarOpen
          ? '420px'
          : onlyDetailOpen
          ? '200px'
          : '460px'
      })`}
    >
      {activeChats.length === 0 || openIndex < 0 ? (
        <NoChatSelected />
      ) : (
        <Tabs
          isFitted
          variant="enclosed"
          width={`calc(100% - ${detailOpenIndex > -1 ? '350px' : '12px'})`}
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
