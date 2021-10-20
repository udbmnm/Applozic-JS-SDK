import React, { useState } from 'react';
import { useEffect } from 'react';
import { useApplozicClient } from '../../providers/useApplozicClient';
import { ChatType, RecentChat } from '../../models/chat';
import Sidebar from './Sidebar';
import useCreateGroup from '../../hooks/mutations/useCreateGroup';
// import useCreateNewContact from "../../hooks/mutations/useCreateNewContact";
import { useQuery, useQueryClient } from 'react-query';
import {
  getNameFromGroup,
  getNameFromUser,
  Group,
  User
} from '@applozic/core-sdk';
import useClearChat from '../../hooks/mutations/useClearChat';
import useActiveChats from '../../hooks/useActiveChats';
import useUpdateSelfInfo from '../../hooks/mutations/useUpdateUserInfo';
import useUserLogout from '../../hooks/mutations/useUserLogout';
import useGetSelfDetails from '../../hooks/queries/useGetSelfDetails';
import useSidebar from '../../hooks/useSidebar';
import FeatureTab from '../../models/Feature';
import useGetUserContacts from '../../hooks/queries/useGetContacts';
import useGetRecentChats from '../../hooks/queries/useGetRecentChats';
import { useAnimation } from 'framer-motion';

const hasSubString = (a: string, b: string) =>
  a.toLowerCase().indexOf(b.toLowerCase()) >= 0;

const findSearchTermInGroup = (query: string, group: Group) => {
  return (
    hasSubString(getNameFromGroup(group), query) ||
    hasSubString(group.clientGroupId, query)
  );
};
const findSearchTermInUser = (query: string, user: User) => {
  return (
    hasSubString(getNameFromUser(user), query) ||
    hasSubString(user.userId, query)
  );
};

function SidebarWired() {
  const { client, loginResult } = useApplozicClient();
  const queryClient = useQueryClient();
  const self = useGetSelfDetails();
  const {
    activeTab,
    setActiveTab,
    searchQuery,
    setSearchQuery,
    setSidebarCollapsed,
    sidebarCollapsed
  } = useSidebar();

  const { status: contactsStatus } = useGetUserContacts();
  const {
    status: recentChatStatus,
    fetchNextPage: fetchNextRecentChats,
    isFetchingNextPage: isFetchingNextRecentChatsPage
  } = useGetRecentChats();

  const [recentChats, setRecentChats] = useState<RecentChat[]>();
  const [users, setUsers] = useState<User[] | undefined>();

  const { setActiveChat } = useActiveChats();

  useEffect(() => {
    if (recentChatStatus === 'success' || recentChatStatus === 'idle') {
      setRecentChats(
        queryClient.getQueryData<RecentChat[]>(['recent-chats-local'])
      );
    }
  }, [recentChatStatus]);

  useEffect(() => {
    if (contactsStatus === 'success' || contactsStatus === 'idle') {
      const contacts = queryClient.getQueryData<{
        users: User[];
        groups: Group[];
      }>(['contacts-local']);
      setUsers(contacts?.users);
    }
  }, [contactsStatus]);

  useEffect(() => {
    if (searchQuery && searchQuery.length > 0) {
      setRecentChats(
        recentChats?.filter(recentChat => {
          if (recentChat.chatType == ChatType.USER) {
            const user = queryClient.getQueryData<User>([
              'user',
              recentChat.contactId,
              true
            ]);
            return user && findSearchTermInUser(searchQuery, user);
          } else {
            const group = queryClient.getQueryData<Group>([
              'group',
              recentChat.contactId,
              true
            ]);
            return group && findSearchTermInGroup(searchQuery, group);
          }
        })
      );
      setUsers(users?.filter(user => findSearchTermInUser(searchQuery, user)));
    }
    // else {
    //   setRecentChats(recentChats);
    //   setUsers(users);
    // }
  }, [searchQuery]);

  useEffect(() => {
    const missingUserInfoIds = recentChats
      ?.filter(chat => chat.chatType === ChatType.USER)
      .filter(chat => {
        const queryUser = queryClient.getQueryData([
          'user',
          chat.contactId,
          true
        ]);
        return !!queryUser;
      })
      .map(chat => chat.contactId);

    if (missingUserInfoIds && missingUserInfoIds.length > 0 && client) {
      client.contacts.getUserDetails(missingUserInfoIds).then(users => {
        users.forEach(user => {
          queryClient.setQueryData(['user', user.userId, true], user);
        });
      });
    }

    const missingGroupInfoIds = recentChats
      ?.filter(chat => chat.chatType === ChatType.GROUP)
      .filter(chat => {
        const queryUser = queryClient.getQueryData([
          'group',
          chat.contactId,
          true
        ]);
        return !!queryUser;
      })
      .map(chat => chat.contactId);

    missingGroupInfoIds?.forEach(groupId => {
      if (client) {
        client.groups.groupInfo(groupId).then(group => {
          queryClient.setQueryData(['group', groupId, true], group);
        });
      }
    });
  }, []);

  const { mutate: clearChat } = useClearChat();
  const { mutate: mutateNewGroup } = useCreateGroup();
  // const { mutate: mutateNewContact } = useCreateNewContact();
  const { mutate: updateSelf } = useUpdateSelfInfo();
  const { mutate: logoutUser } = useUserLogout();
  const controls = useAnimation();
  useEffect(() => {
    controls.start(sidebarCollapsed ? 'closed' : 'open');
  }, [sidebarCollapsed]);

  return (
    <Sidebar
      selfDetails={{
        name: self ? getNameFromUser(self) : '',
        imageUrl: self?.imageLink,
        onCloseClicked: () => setActiveTab(FeatureTab.RECENT_CHATS),
        onLogOutClicked: () =>
          logoutUser(undefined, {
            onSuccess: () => setActiveTab(FeatureTab.RECENT_CHATS)
          }),
        onUpdateValue: (key, value) => {
          updateSelf({ [key]: value });
        }
      }}
      selectedFeatureTab={activeTab}
      controls={controls}
      recentChats={recentChats}
      users={users}
      search={{
        searchValue: searchQuery,
        setSearchValue: setSearchQuery,
        setCollapsed: setSidebarCollapsed,
        isCollapsed: sidebarCollapsed
      }}
      isFetchingNextRecentChatsPage={isFetchingNextRecentChatsPage}
      fetchNextRecentChats={() => fetchNextRecentChats()}
      handleItemClick={(type, contactId) => {
        let user: User | undefined, group: Group | undefined;
        if (type == ChatType.GROUP) {
          group = queryClient.getQueryData(['group', contactId, true]);
          if (!group) {
            if (client) {
              client.groups.groupInfo(contactId).then(group => {
                queryClient.setQueryData(['group', contactId, true], group);
                setActiveChat({ group });
              });
            }
          } else {
            setActiveChat({ group });
          }
        }
        if (type == ChatType.USER) {
          user = queryClient.getQueryData(['user', contactId, true]);
          if (!user) {
            if (client) {
              client.contacts.getUserDetails([contactId]).then(users => {
                if (users && users.length > 0) {
                  queryClient.setQueryData(['user', contactId, true], users[0]);
                  setActiveChat({ user: users[0] });
                }
              });
            }
          } else {
            setActiveChat({ user });
          }
        }
      }}
      onCreateGroup={async newGroup => {
        if (client && loginResult?.userId) {
          mutateNewGroup(newGroup, {
            onSuccess: response => {
              if (response) {
                setActiveChat({ group: response });
              }
            }
          });
        }
      }}
      // onCreateContact={async (contactName) => {
      //   mutateNewContact(contactName, {
      //     onSuccess: (response) => {
      //       if (response) {
      //         setActiveContactInfo(ChatType.USER, response);
      //       }
      //     },
      //   });
      // }}
      onClearConversation={(chatType, contactId) => {
        if (chatType == ChatType.GROUP) {
          clearChat({ groupId: contactId });
        } else if (chatType == ChatType.USER) {
          clearChat({ userId: contactId });
        }
      }}
    />
  );
}

export default SidebarWired;
