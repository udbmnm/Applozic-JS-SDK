import React from "react";
import { useEffect } from "react";
import Feature from "../../models/Feature";
import { useApplozicClient } from "../../providers/useApplozicClient";
import { ChatType, RecentChat } from "../../models/chat";
import Sidebar from "./Sidebar";
import useCreateGroup from "../../hooks/mutations/useCreateGroup";
import { useActiveChats } from "../../providers/useActiveChats";
import useCreateNewContact from "../../hooks/mutations/useCreateNewContact";
import { useQuery, useQueryClient } from "react-query";
import { Group, User } from "@applozic/core-sdk";
import useClearChat from "../../hooks/mutations/useClearChat";
import { useSidebar } from "../../providers/useSidebar";

function SidebarWired() {
  const { activeFeature: type } = useSidebar();

  const queryClient = useQueryClient();
  const { mutate: clearChat } = useClearChat();
  // useGetContacts();
  // useGetRecentChats();

  const { client, loginResult } = useApplozicClient();
  const { data: contacts } = useQuery<{
    users: User[];
    groups: Group[];
  }>(["contacts-local"]);

  const { data: chatQueryResult } = useQuery<RecentChat[]>([
    "recent-chats-local",
    loginResult?.userId,
  ]);
  const { setActiveContactInfo } = useActiveChats();

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
  const { mutate: mutateNewContact } = useCreateNewContact();
  return (
    <Sidebar
      type={type}
      recentChats={chats}
      users={users}
      onCreateGroup={async (newGroup) => {
        if (client && loginResult?.userId) {
          mutateNewGroup(newGroup, {
            onSuccess: (response) => {
              if (response) {
                setActiveContactInfo(ChatType.GROUP, response.clientGroupId);
              }
            },
          });
        }
      }}
      onCreateContact={async (contactName) => {
        mutateNewContact(contactName, {
          onSuccess: (response) => {
            if (response) {
              setActiveContactInfo(ChatType.USER, response);
            }
          },
        });
      }}
      onClearConversation={(type, contactId) => {
        if (type === ChatType.GROUP) {
          clearChat({ groupId: contactId });
        } else if (type === ChatType.USER) {
          clearChat({ userId: contactId });
        }
      }}
    />
  );
}

export default SidebarWired;
