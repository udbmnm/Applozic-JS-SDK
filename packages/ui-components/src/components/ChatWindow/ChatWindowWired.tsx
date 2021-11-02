import { TabPanels, TabPanel, Tabs, Box } from '@chakra-ui/react';
import React from 'react';
import NoChatSelected from './NoChatSelected';

import ChatDetailsWired from '../ChatDetails/ChatDetailsWired';
import ChatTabHeadStripWired from '../ChatTabHeadStrip/ChatTabHeadStripWired';
import { AnimatePresence } from 'framer-motion';
import MotionBox from '../MotionBox';
import useActiveChats from '../../hooks/useActiveChats';
import ChatPanelWired from '../ChatPanel/ChatPanelWired';
import { getIdFromActiveChat } from '../../models/chat/ActiveChat';
import useSidebar from '../../hooks/useSidebar';

function ChatWindowWired() {
  const { activeChats, openIndex, detailOpenIndex } = useActiveChats();
  const { sidebarCollapsed } = useSidebar();

  const fullyOpen = sidebarCollapsed && detailOpenIndex < 0;
  const onlyDetailOpen = sidebarCollapsed && detailOpenIndex >= 0;
  const onlySidebarOpen = !sidebarCollapsed && detailOpenIndex < 0;
  return (
    <MotionBox
      h="full"
      maxW={`calc(100% - ${
        fullyOpen
          ? '200px'
          : onlySidebarOpen
          ? '420px'
          : onlyDetailOpen
          ? '200px'
          : '460px'
      })`}
      flexGrow={1}
      display="flex"
      flexDirection="row"
      m={0}
    >
      <Tabs
        h="full"
        w={detailOpenIndex > -1 ? 'calc(100% - 350px)' : 'full'}
        isLazy
        lazyBehavior="keepMounted"
        isFitted
        variant="enclosed"
        index={openIndex}
      >
        <ChatTabHeadStripWired />
        {activeChats.length === 0 || openIndex < 0 ? (
          <NoChatSelected />
        ) : (
          <TabPanels>
            {activeChats.map(activeChat => (
              <TabPanel p={0} key={getIdFromActiveChat(activeChat)}>
                <ChatPanelWired activeChat={activeChat} />
              </TabPanel>
            ))}
          </TabPanels>
        )}
      </Tabs>
      <AnimatePresence>
        {detailOpenIndex > -1 && (
          <Box ml={2}>
            <ChatDetailsWired activeChat={activeChats[openIndex]} />
          </Box>
        )}
      </AnimatePresence>
    </MotionBox>
  );
}

export default ChatWindowWired;
