import React, { useEffect, useState } from "react";
import ChatDetails from "./ChatDetails";
import {
  getNameFromGroup,
  getNameFromUser,
  Group,
  User,
} from "@applozic/core-sdk";
import { ChatType, Message } from "../../models/chat";
import useUpdateGroupMembers from "../../hooks/mutations/useUpdateGroupMembers";
import useGetMessages from "../../hooks/queries/useGetUserMessages";
import { useQuery, useQueryClient } from "react-query";
import useGetUserContacts from "../../hooks/queries/useGetContacts";
import useBlockContact from "../../hooks/mutations/useBlockContact";
import useClearChat from "../../hooks/mutations/useClearChat";
import useUpdateGroupInfo from "../../hooks/mutations/useUpdateGroupInfo";
import { useApplozicClient } from "../../providers/useApplozicClient";
import useLeaveGroup from "../../hooks/mutations/useLeaveGroup";
import useDeleteGroup from "../../hooks/mutations/useDeleteGroup";
import ActiveChat, { getIdFromActiveChat } from "../../models/chat/ActiveChat";
import useActiveChats from "../../hooks/useActiveChats";

export interface ChatDetailWiredProps {
  activeChat: ActiveChat;
}

const ChatDetailsWired = ({ activeChat }: ChatDetailWiredProps) => {
  const { user, group } = activeChat;
  const queryClient = useQueryClient();
  const { loginResult } = useApplozicClient();
  const { hideChatDetail, removeActiveChat: removeContact } = useActiveChats();

  const { status: messagesStatus } = useGetMessages(activeChat);
  const [messages, setMessages] = useState<Message[]>();
  const [contacts, setContacts] = useState<{
    users: User[];
    groups: Group[];
  }>();

  const { status: contactsStatus } = useGetUserContacts();
  useEffect(() => {
    if (messagesStatus == "idle" || messagesStatus == "success") {
      setMessages(
        queryClient.getQueryData<Message[]>([
          "messages-local",
          getIdFromActiveChat(activeChat),
        ])
      );
    }
  }, [messagesStatus]);

  useEffect(() => {
    if (contactsStatus == "idle" || contactsStatus == "success") {
      setContacts(
        queryClient.getQueryData<{
          users: User[];
          groups: Group[];
        }>(["contacts-local"])
      );
    }
  }, [contactsStatus]);

  const { mutate: updateGroupMembers } = useUpdateGroupMembers();
  const { mutate: blockContact } = useBlockContact();
  const { mutate: clearChat } = useClearChat();
  const { mutate: updateGroupInfo } = useUpdateGroupInfo();
  const { mutate: leaveGroup } = useLeaveGroup();
  const { mutate: deleteGroup } = useDeleteGroup();

  return (
    <ChatDetails
      title={
        user ? getNameFromUser(user) : group ? getNameFromGroup(group) : ""
      }
      imageUrl={
        user?.imageLink ? user.imageLink : group?.imageUrl ? group.imageUrl : ""
      }
      type={group ? ChatType.GROUP : ChatType.USER}
      messages={messages}
      userContacts={contacts?.users}
      group={group}
      isBlocked={user && user?.blockedByThis}
      isAdmin={!!group && group?.adminId == loginResult?.userId}
      updateGroupInfo={(options) =>
        updateGroupInfo({
          clientGroupId: activeChat.group?.clientGroupId,
          ...options,
        })
      }
      updateMemberList={(userIds, onSuccess) =>
        group &&
        updateGroupMembers(
          {
            userIds,
            clientGroupId: group.clientGroupId,
          },
          {
            onSuccess,
          }
        )
      }
      onCloseClicked={() => hideChatDetail()}
      onBlockClicked={() =>
        activeChat.user && blockContact({ userId: activeChat.user.userId })
      }
      onChatClearClicked={() => {
        const toDelete = activeChat.group
          ? { groupId: activeChat.group.clientGroupId }
          : activeChat.user
          ? { userId: activeChat.user.userId }
          : undefined;
        if (toDelete) {
          clearChat(toDelete);
        }
      }}
      onDeleteGroupClicked={() =>
        activeChat.group &&
        deleteGroup(activeChat.group.clientGroupId, {
          onSuccess: () => removeContact(activeChat),
        })
      }
      onLeaveGroupClicked={() =>
        activeChat.group &&
        leaveGroup(activeChat.group.clientGroupId, {
          onSuccess: () => removeContact(activeChat),
        })
      }
    />
  );
};

export default ChatDetailsWired;
