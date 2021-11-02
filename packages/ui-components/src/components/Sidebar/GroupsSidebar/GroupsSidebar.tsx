import React from 'react';
import { ListItem, List } from '@chakra-ui/react';
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
    <List height="full" width={'full'}>
      <ListItem key="add_group">
        <AddGroup onClick={onClickAddGroup} />
      </ListItem>
      {recentChats.map((recentChat, key) => (
        <ListItem key={key}>
          <RecentChatItem
            onClearChat={() => {}} // eslint-disable-line
            recentChat={recentChat}
            controls={controls}
            onClick={handleClick(recentChat.chatType, recentChat.contactId)}
          />
        </ListItem>
      ))}
    </List>
  );
};

export default GroupsSidebar;
