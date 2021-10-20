import React from 'react';
import { VStack } from '@chakra-ui/react';
import { ChatType } from '../../../models/chat';
import { RecentChat } from '../../../models/chat';
import RecentChatItem from '../RecentChatsSidebar/RecentChatItem';
import AddGroup from './AddGroup';
import { AnimationControls } from 'framer-motion';

export interface IGroups {
  recentChats: RecentChat[];
  onClickRecentChat: (
    type: ChatType,
    contactId: string
  ) => void | Promise<void>;
  onClickAddGroup: () => void;
  controls?: AnimationControls;
}

const GroupsSidebar = ({
  recentChats,
  onClickRecentChat,
  onClickAddGroup,
  controls
}: IGroups) => {
  const handleClick = (type: ChatType, contactId: string) => () => {
    if (onClickRecentChat) {
      onClickRecentChat(type, contactId);
    }
  };

  return (
    <VStack height="full" width={'full'}>
      <AddGroup onClick={onClickAddGroup} />
      {recentChats.map((recentChat, key) => (
        <RecentChatItem
          key={key}
          onClearChat={() => console.log('{ object }')}
          recentChat={recentChat}
          controls={controls}
          onClick={handleClick(recentChat.chatType, recentChat.contactId)}
        />
      ))}
    </VStack>
  );
};

export default GroupsSidebar;
