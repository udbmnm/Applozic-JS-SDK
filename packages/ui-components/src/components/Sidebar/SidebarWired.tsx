import React from "react";
import { useEffect } from "react";
import { useApplozicClient } from "../../providers/useApplozicClient";
import { ChatType, RecentChat } from "../../models/chat";
import Sidebar from "./Sidebar";
import useCreateGroup from "../../hooks/mutations/useCreateGroup";
// import useCreateNewContact from "../../hooks/mutations/useCreateNewContact";
import { useQuery, useQueryClient } from "react-query";
import { getNameFromUser, Group, User } from "@applozic/core-sdk";
import useClearChat from "../../hooks/mutations/useClearChat";
import { useSidebar } from "../../providers/useSidebar";
import useActiveChats from "../../hooks/useActiveChats";
import useUpdateSelfInfo from "../../hooks/mutations/useUpdateUserInfo";
import useUserLogout from "../../hooks/mutations/useUserLogout";
import useGetSelfDetails from "../../hooks/queries/useGetSelfDetails";

function SidebarWired() {
  const { activeFeature: type, setShowUserDetails } = useSidebar();
  const { setActiveChat } = useActiveChats();

  const queryClient = useQueryClient();
  const { mutate: clearChat } = useClearChat();

  const { client, loginResult } = useApplozicClient();
  const { data: contacts } = useQuery<{
    users: User[];
    groups: Group[];
  }>(["contacts-local"]);

  const { data: chatQueryResult } = useQuery<RecentChat[]>([
    "recent-chats-local",
    loginResult?.userId,
  ]);

  const chats = chatQueryResult ?? [];
  const users = contacts?.users ?? [];
  const groups = contacts?.groups ?? [];

  useEffect(() => {
    const missingUserInfoIds = chats
      ?.filter((chat) => chat.chatType === ChatType.USER)
      .filter((chat) => {
        const queryUser = queryClient.getQueryData([
          "user",
          chat.contactId,
          true,
        ]);
        return !!queryUser;
      })
      .map((chat) => chat.contactId);

    if (missingUserInfoIds && missingUserInfoIds.length > 0 && client) {
      client.contacts.getUserDetails(missingUserInfoIds).then((users) => {
        users.forEach((user) => {
          queryClient.setQueryData(["user", user.userId, true], user);
        });
      });
    }

    const missingGroupInfoIds = chats
      ?.filter((chat) => chat.chatType === ChatType.GROUP)
      .filter((chat) => {
        const queryUser = queryClient.getQueryData([
          "group",
          chat.contactId,
          true,
        ]);
        return !!queryUser;
      })
      .map((chat) => chat.contactId);

    missingGroupInfoIds?.forEach((groupId) => {
      if (client) {
        client.groups.groupInfo(groupId).then((group) => {
          queryClient.setQueryData(["group", groupId, true], group);
        });
      }
    });
  }, []);

  const { mutate: mutateNewGroup } = useCreateGroup();
  // const { mutate: mutateNewContact } = useCreateNewContact();
  const self = useGetSelfDetails();
  const { mutate: updateSelf } = useUpdateSelfInfo();
  const { mutate: logoutUser } = useUserLogout();

  return (
    <Sidebar
      handleClick={(type, contactId) => {
        let user: User | undefined, group: Group | undefined;
        if (type == ChatType.GROUP) {
          group = queryClient.getQueryData(["group", contactId, true]);
          if (!group) {
            if (client) {
              client.groups.groupInfo(contactId).then((group) => {
                queryClient.setQueryData(["group", contactId, true], group);
                setActiveChat({ group });
              });
            }
          } else {
            setActiveChat({ group });
          }
        }
        if (type == ChatType.USER) {
          user = queryClient.getQueryData(["user", contactId, true]);
          if (!user) {
            if (client) {
              client.contacts.getUserDetails([contactId]).then((users) => {
                if (users && users.length > 0) {
                  queryClient.setQueryData(["user", contactId, true], users[0]);
                  setActiveChat({ user: users[0] });
                }
              });
            }
          } else {
            setActiveChat({ user });
          }
        }
      }}
      tabs={type}
      recentChats={chats}
      users={users}
      onCreateGroup={async (newGroup) => {
        if (client && loginResult?.userId) {
          mutateNewGroup(newGroup, {
            onSuccess: (response) => {
              if (response) {
                setActiveChat({ group: response });
              }
            },
          });
        }
      }}
      onCreateContact={async (contactName) => {
        // mutateNewContact(contactName, {
        //   onSuccess: (response) => {
        //     if (response) {
        //       setActiveContactInfo(ChatType.USER, response);
        //     }
        //   },
        // });
      }}
      onClearConversation={(activeChat) => {
        if (activeChat.group) {
          clearChat({ groupId: activeChat.group.clientGroupId });
        } else if (activeChat.user) {
          clearChat({ userId: activeChat.user.userId });
        }
      }}
      selfDetails={{
        name: self ? getNameFromUser(self) : "",
        imageUrl: self?.imageLink,
        onCloseClicked: () => setShowUserDetails && setShowUserDetails(false),
        onLogOutClicked: () =>
          logoutUser(undefined, {
            onSuccess: () => setShowUserDetails && setShowUserDetails(false),
          }),
        onUpdateValue: (key, value) => {
          updateSelf({ [key]: value });
        },
      }}
    />
  );
}

export default SidebarWired;
