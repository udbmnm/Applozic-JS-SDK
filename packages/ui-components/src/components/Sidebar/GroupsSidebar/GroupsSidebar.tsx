import React, { useEffect } from 'react';
import { ListItem, List, ListIcon, Spinner, Text } from '@chakra-ui/react';
import { ChatType } from '../../../models/chat';
import { RecentChat } from '../../../models/chat';
import RecentChatItem from '../RecentChatsSidebar/RecentChatItem';
import AddGroup from './AddGroup';
import { AnimationControls } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { BaseSidebarProps } from '..';

export interface IGroups extends BaseSidebarProps {
  recentChats: RecentChat[];
  onClickRecentChat: (
    type: ChatType,
    contactId: string
  ) => void | Promise<void>;
  onClickAddGroup: () => void;
}

const GroupsSidebar = ({
  recentChats,
  onClickRecentChat,
  onClickAddGroup,
  fetchNextPage,
  isFetchingNextPage,
  hasMorePages,
  controls
}: IGroups) => {
  const handleClick = (type: ChatType, contactId: string) => () => {
    if (onClickRecentChat) {
      onClickRecentChat(type, contactId);
    }
  };

  const { ref: bottom, inView } = useInView({
    threshold: 0,
    initialInView: false
  });

  useEffect(() => {
    if (inView && fetchNextPage && !isFetchingNextPage && hasMorePages) {
      fetchNextPage();
    }
  }, [inView]);

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
      {isFetchingNextPage && (
        <ListItem>
          <ListIcon>
            <Spinner color="brand.primary" />
          </ListIcon>
          <Text>Fetching more groups...</Text>
        </ListItem>
      )}
      <ListItem key={'groupsBottom'} ref={bottom} h={2} />
    </List>
  );
};

export default GroupsSidebar;
