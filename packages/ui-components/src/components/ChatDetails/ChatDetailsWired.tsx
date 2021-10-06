import React from "react";
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
import { useQuery } from "react-query";
import useGetUserContacts from "../../hooks/queries/useGetContacts";
import useBlockContact from "../../hooks/mutations/useBlockContact";
import useClearChat from "../../hooks/mutations/useClearChat";
import useUpdateGroupInfo from "../../hooks/mutations/useUpdateGroupInfo";
import { useApplozicClient } from "../../providers/useApplozicClient";
import useLeaveGroup from "../../hooks/mutations/useLeaveGroup";
import useDeleteGroup from "../../hooks/mutations/useDeleteGroup";
import ActiveChat from "../../models/chat/ActiveChat";
import useActiveChats from "../../hooks/useActiveChats";

export interface ChatDetailWiredProps {
  activeChat: ActiveChat;
}

const ChatDetailsWired = ({ activeChat }: ChatDetailWiredProps) => {
  useGetMessages(
    activeChat.chatType,
    activeChat.group?.clientGroupId ?? activeChat.user?.userId
  );
  useGetUserContacts();

  const { data: messages = [] } = useQuery<Message[]>([
    "messages-local",
    activeChat.group?.clientGroupId ?? activeChat.user?.userId,
  ]);
  const { user, group } = activeChat;

  const { data: { users } = {} } = useQuery<{
    users: User[];
    groups: Group[];
  }>(["contacts-local"]);
  const { loginResult } = useApplozicClient();
  const { hideChatDetail, removeActiveChat: removeContact } = useActiveChats();
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
      type={activeChat.chatType}
      messages={messages}
      userContacts={users}
      group={group}
      isBlocked={activeChat.chatType == ChatType.USER && user?.blockedByThis}
      isAdmin={
        activeChat.chatType == ChatType.GROUP &&
        group?.adminId == loginResult?.userId
      }
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
