import React, { useEffect } from 'react';
import { VStack } from '@chakra-ui/react';
import { ChatType } from '../../../models/chat';
import { RecentChat } from '../../../models/chat';
import RecentChatItem from './RecentChatItem';
import { useInView } from 'react-intersection-observer';
import { AnimationControls } from 'framer-motion';

export interface IRecentChats {
  recentChats: RecentChat[] | undefined;
  onClickContact: (type: ChatType, contactId: string) => void | Promise<void>;
  onClickAddContact: () => void | Promise<void>;
  onClearConversation: (
    chatType: ChatType,
    contactId: string
  ) => void | Promise<void>;
  fetchNextRecentChats: () => void;
  isFetchingNextRecentChatsPage: boolean;
  controls?: AnimationControls;
}

const RecentChatsSidebar = ({
  recentChats,
  onClickContact,
  onClickAddContact,
  onClearConversation,
  fetchNextRecentChats,
  isFetchingNextRecentChatsPage,
  controls
}: IRecentChats) => {
  const handleClick = (type: ChatType, contactId: string) => () => {
    if (onClickContact) {
      onClickContact(type, contactId);
    }
  };

  const { ref: oldestChat, inView } = useInView({
    threshold: 0,
    initialInView: false
  });
  useEffect(() => {
    if (!isFetchingNextRecentChatsPage && inView && fetchNextRecentChats) {
      fetchNextRecentChats();
    }
  }, [inView]);

  return (
    <VStack width={'full'} height={'full'}>
      {recentChats &&
        recentChats?.length > 0 &&
        recentChats.map((recentChat, key) => (
          <RecentChatItem
            key={key}
            ref={oldestChat}
            recentChat={recentChat}
            controls={controls}
            onClick={handleClick(recentChat.chatType, recentChat.contactId)}
            onClearChat={() => {
              onClearConversation(recentChat.chatType, recentChat.contactId);
            }}
          />
        ))}
    </VStack>
  );
};
/** : ( // <AddContact onClick={onClickAddContact} />
      // )*/
export default RecentChatsSidebar;
