import React, { useEffect, useRef } from 'react';
import { TabList, useColorModeValue as mode, useTab } from '@chakra-ui/react';
import ActiveChat from '../../models/chat/ActiveChat';
import ChatTab from './ChatTab';

export interface ChatTabHeadStripItem {
  text: string;
  imageUrl?: string;
}

export interface ChatTabHeadStripProps {
  activeChats: ActiveChat[] | undefined;
  openIndex: number | undefined;
  onItemClick?: (index: number) => void;
  onCloseClick?: (index: number) => void;
  onDetailsClick?: (index: number) => void;
  showBack?: boolean;
}

const ChatTabHeadStrip = ({
  showBack,
  activeChats,
  openIndex,
  onItemClick,
  onCloseClick,
  onDetailsClick
}: ChatTabHeadStripProps) => {
  const activeTab = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    activeTab?.current && activeTab?.current.scrollIntoView();
  }, [openIndex]);
  const tabProps = useTab({});
  return (
    <TabList
      w={'full'}
      overflowX="auto"
      border="none"
      sx={{
        '&::-webkit-scrollbar': {
          display: 'none'
        }
      }}
    >
      {activeChats?.map((chat, index) => {
        return (
          <ChatTab
            tabProps={tabProps}
            key={index}
            activeTab={activeTab}
            showBack={!!showBack}
            borderTopLeftRadius={15}
            borderTopRightRadius={15}
            borderColor="border.500"
            borderWidth={mode(1, 0)}
            activeChat={chat}
            index={index}
            onCloseClick={onCloseClick}
            onDetailsClick={onDetailsClick}
            onItemClick={onItemClick}
            isSelected={openIndex === index}
            isLast={activeChats && index !== activeChats.length - 1}
          />
        );
      })}
    </TabList>
  );
};

export default ChatTabHeadStrip;
