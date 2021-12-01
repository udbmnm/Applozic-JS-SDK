import React, { useEffect, useState } from 'react';
import { ChatType, RecentChat } from '../../models/chat';
import RecentChatsSidebar from './RecentChatsSidebar';
import { Box } from '@chakra-ui/react';
import FeatureTab from '../../models/Feature';
import GroupsSidebar from './GroupsSidebar';
import CreateGroup from './GroupsSidebar/CreateGroup';
import { GroupTypes } from '@applozic/core-sdk';
import { INewGroup } from '../../utils/parser';
import CreateContact from './RecentChatsSidebar/CreateContact';
import ContactsSidebar from './ContactsSidebar/ContactsSidebar';
import { User } from '@applozic/core-sdk';
import SelfDetails, { SelfDetailProps } from './SelfDetails/SelfDetails';
import { Divider, useColorModeValue as mode } from '@chakra-ui/react';
import { AnimatePresence, useAnimation } from 'framer-motion';
import MotionBox from '../MotionBox';
import ScrollArea from '../ScrollArea';
import Search, { SearchProps } from './Search';

export interface SidebarProps {
  /** currently selected FeatureTab */
  selectedFeatureTab: FeatureTab;
  /** Properties to handle the search action */
  search: SearchProps;
  /** Properties to handle the logged in user's detail page */
  selfDetails: SelfDetailProps;
  /** List of `RecentChat` items */
  recentChats: RecentChat[] | undefined;
  /** List of all the users which are the logged in user's contact list */
  users: User[] | undefined;
  /** `true` if the sidebar is in collapsed state */
  isCollapsed: boolean;
  /** Callback to handle group creation */
  onCreateGroup: (newGroup: INewGroup) => void | Promise<void>;
  /** Callback to handle clearing a given conversation */
  onClearConversation: (
    chatType: ChatType,
    contactId: string
  ) => void | Promise<void>;
  /** Callback to handle item click */
  handleItemClick: (type: ChatType, contactId: string) => void | Promise<void>;
  /** Callback to handle fetching more recent chats when the bottom of a long list comes into view */
  fetchNextRecentChats: () => void;
  /** `true` if next page of the recent chats is being fetched */
  isFetchingNextRecentChatsPage: boolean;
  /** `true` if next page of recent chats exists */
  hasMoreRecentChats: boolean | undefined;
  /** Callback to handle fetching more contacts when the bottom of a long list comes into view */
  fetchNextContacts: () => void;
  /** `true` if next page of the recent chats is being fetched */
  isFetchingNextContactsPage: boolean;
  /** `true` if next page of contacts exists */
  hasMoreContacts: boolean | undefined;
  /** [Optional] Callback to handle creation of new contact */
  onCreateContact?: (contactName: string) => void | Promise<void>;
}

export interface BaseSidebarProps {
  fetchNextPage: () => void;
  isFetchingNextPage: boolean;
  hasMorePages: boolean | undefined;
  isFiltered: boolean;
}

function Sidebar({
  selectedFeatureTab,
  search,
  selfDetails,
  recentChats,
  users,
  isCollapsed,
  onCreateGroup: onClickCreateGroup,
  onCreateContact: onClickCreateContact,
  onClearConversation: onClickClearConversation,
  fetchNextRecentChats,
  isFetchingNextRecentChatsPage,
  hasMoreRecentChats,
  fetchNextContacts,
  isFetchingNextContactsPage,
  hasMoreContacts,
  handleItemClick
}: SidebarProps) {
  const controls = useAnimation();
  useEffect(() => {
    controls.start(isCollapsed ? 'closed' : 'open');
  }, [isCollapsed]);

  const [showAddGroup, setShowAddGroup] = useState(false);
  const [showAddContact, setShowAddContact] = useState(false);

  if (FeatureTab.USER === selectedFeatureTab)
    return <SelfDetails {...selfDetails} />;

  const getOverlayComponent = () => {
    if (showAddContact) {
      return (
        <CreateContact
          onClickCloseCreateContact={() => setShowAddContact(false)}
          onClickCreateContact={contactName => {
            setShowAddContact(false);
            onClickCreateContact && onClickCreateContact(contactName);
          }}
        />
      );
    }
    if (showAddGroup) {
      return (
        <CreateGroup
          contacts={users}
          onClickCloseCreateGroup={() => setShowAddGroup(false)}
          onClickCreateGroup={(groupName, groupType, imageUrl, memberIds) => {
            setShowAddGroup(false);
            onClickCreateGroup({
              groupName,
              imageUrl,
              type: groupType,
              memberIds
            });
          }}
        />
      );
    }
  };

  const getComponent = () => {
    switch (selectedFeatureTab) {
      case FeatureTab.RECENT_CHATS:
        return (
          <RecentChatsSidebar
            controls={controls}
            recentChats={recentChats}
            onClickAddContact={() => setShowAddContact(true)}
            onClearConversation={onClickClearConversation}
            onClickContact={handleItemClick}
            fetchNextRecentChats={fetchNextRecentChats}
            isFetchingNextRecentChatsPage={isFetchingNextRecentChatsPage}
            hasMoreRecentChats={hasMoreRecentChats}
          />
        );
      case FeatureTab.GROUPS:
        return (
          <GroupsSidebar
            controls={controls}
            recentChats={
              recentChats?.filter(chat => chat.chatType == ChatType.GROUP) ?? []
            }
            onClickAddGroup={() => setShowAddGroup(true)}
            onClickRecentChat={handleItemClick}
            fetchNextRecentChats={fetchNextRecentChats}
            hasMoreRecentChats={hasMoreRecentChats}
            isFetchingNextRecentChatsPage={isFetchingNextRecentChatsPage}
          />
        );
      case FeatureTab.CONTACTS:
        return (
          <ContactsSidebar
            controls={controls}
            users={users}
            onClickAddContact={() => setShowAddContact(true)}
            onClickContact={contactId =>
              handleItemClick(ChatType.USER, contactId)
            }
            fetchNextContacts={fetchNextContacts}
            isFetchingNextContactsPage={isFetchingNextContactsPage}
            hasMoreContacts={hasMoreContacts}
          />
        );
      default:
        return <Box />;
    }
  };

  return (
    <MotionBox
      w={'350px'}
      h="full"
      m={0}
      borderColor="pane.light"
      borderWidth={mode(1, 0)}
      borderRadius={15}
      backgroundColor={mode('card.light', 'pane.dark')}
      animate={controls}
      initial="open"
      variants={{ open: { width: '350px' }, closed: { width: '100px' } }}
      transition={{ type: 'tween' }}
    >
      <AnimatePresence>
        {(showAddGroup || showAddContact) && (
          <MotionBox
            width={'full'}
            height="full"
            initial={{ y: '101%', opacity: 0 }}
            transition={{ type: 'tween' }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '101%', opacity: 0 }}
          >
            {getOverlayComponent()}
          </MotionBox>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {!(showAddGroup || showAddContact) && (
          <MotionBox
            display={'flex'}
            flex={1}
            h="full"
            w="full"
            px={6}
            pt={6}
            flexFlow="column"
            borderRadius={15}
            initial={{ x: '101%', opacity: 0 }}
            transition={{ type: 'tween' }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '101%', opacity: 0 }}
          >
            <Search {...search} />
            <Divider mt={1.5} mb={1.5} />
            <ScrollArea
              width={'full'}
              height="full"
              hideScrollbar={true}
              overflowX="hidden"
            >
              {getComponent()}
            </ScrollArea>
          </MotionBox>
        )}
      </AnimatePresence>
    </MotionBox>
  );
}

export default Sidebar;
