import React, { useEffect } from 'react';
import { List, ListIcon, ListItem, Text, Spinner } from '@chakra-ui/react';
import { ChatType } from '../../../models/chat';
import { RecentChat } from '../../../models/chat';
import RecentChatItem from './RecentChatItem';
import { useInView } from 'react-intersection-observer';
import { BaseSidebarProps } from '..';

export interface IRecentChats extends BaseSidebarProps {
  recentChats: RecentChat[] | undefined;
  onClickContact: (type: ChatType, contactId: string) => void | Promise<void>;
  onClickAddContact: () => void | Promise<void>;
  onClearConversation: (
    chatType: ChatType,
    contactId: string
  ) => void | Promise<void>;
}

const RecentChatsSidebar = ({
  recentChats,
  onClickContact,
  onClickAddContact,
  onClearConversation,
  fetchNextPage,
  isFetchingNextPage,
  hasMorePages,
  controls
}: IRecentChats) => {
  const handleClick = (type: ChatType, contactId: string) => () => {
    if (onClickContact) {
      onClickContact(type, contactId);
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
    <List width={'full'} height={'full'}>
      {recentChats &&
        recentChats?.length > 0 &&
        recentChats.map((recentChat, key) => (
          <ListItem key={key}>
            <RecentChatItem
              recentChat={recentChat}
              controls={controls}
              onClick={handleClick(recentChat.chatType, recentChat.contactId)}
              onClearChat={() => {
                onClearConversation(recentChat.chatType, recentChat.contactId);
              }}
            />
          </ListItem>
        ))}
      {isFetchingNextPage && (
        <ListItem>
          <ListIcon>
            <Spinner color="brand.primary" />
          </ListIcon>
          <Text>Fetching more recent chats...</Text>
        </ListItem>
      )}
      <ListItem key={'recentChatsBottom'} ref={bottom} h={2} />
    </List>
  );
};
/** : ( // <AddContact onClick={onClickAddContact} />
      // )*/
export default RecentChatsSidebar;
