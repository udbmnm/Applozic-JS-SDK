import React from "react";
import { ActiveChat, useActiveChats } from "../../providers/useActiveChats";
import ChatDetails from "./ChatDetails";
import {
  getNameFromGroup,
  getNameFromUser,
  Group,
  User,
} from "@applozic/core-sdk";
import { ChatType, Message } from "../../models/chat";
import useUpdateGroupMembers from "../../hooks/mutations/useUpdateGroupMembers";
import useGetUserInfo from "../../hooks/queries/useGetUserInfo";
import useGetGroupInfo from "../../hooks/queries/useGetGroupInfo";
import useGetMessages from "../../hooks/queries/useGetUserMessages";
import { useQuery } from "react-query";
import useGetUserContacts from "../../hooks/queries/useGetContacts";
import useBlockContact from "../../hooks/mutations/useBlockContact";
import useClearChat from "../../hooks/mutations/useClearChat";
import useUpdateGroupInfo from "../../hooks/mutations/useUpdateGroupInfo";
import { useApplozicClient } from "../../providers/useApplozicClient";
import useLeaveGroup from "../../hooks/mutations/useLeaveGroup";
import useDeleteGroup from "../../hooks/mutations/useDeleteGroup";

export interface ChatDetailWiredProps {
  chatItem: ActiveChat;
}

const ChatDetailsWired = ({ chatItem }: ChatDetailWiredProps) => {
  useGetMessages(chatItem.type, chatItem.contactId);
  useGetUserContacts();

  const { data: user } = useGetUserInfo(
    chatItem.contactId,
    chatItem.type === ChatType.USER
  );

  const { data: group } = useGetGroupInfo(
    chatItem.contactId,
    chatItem.type === ChatType.GROUP
  );

  const { data: messages = [] } = useQuery<Message[]>([
    "messages-local",
    chatItem.contactId,
  ]);
  const { data: { users } = {} } = useQuery<{
    users: User[];
    groups: Group[];
  }>(["contacts-local"]);
  const { loginResult } = useApplozicClient();
  const { setActiveContactInfo, removeContact } = useActiveChats();
  const { mutate: updateGroupMembers } = useUpdateGroupMembers();
  const { mutate: blockContact } = useBlockContact();
  const { mutate: clearChat } = useClearChat();
  const { mutate: updateGroupInfo } = useUpdateGroupInfo();
  const { mutate: leaveGroup } = useLeaveGroup();
  const { mutate: deleteGroup } = useDeleteGroup();

  return (
    <ChatDetails
      title={user ? getNameFromUser(user) : group ? getNameFromGroup(group) : ""}
      imageUrl={
        user?.imageLink ? user.imageLink : group?.imageUrl ? group.imageUrl : ""
      }
      type={chatItem.type}
      messages={messages}
      userContacts={users}
      group={group}
      isBlocked={chatItem.type == ChatType.USER && user?.blockedByThis}
      isAdmin={
        chatItem.type == ChatType.GROUP && group?.adminId == loginResult?.userId
      }
      updateGroupInfo={(options) =>
        updateGroupInfo({ clientGroupId: chatItem.contactId, ...options })
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
      onCloseClicked={() =>
        setActiveContactInfo(chatItem.type, chatItem.contactId, false)
      }
      onBlockClicked={() => blockContact({ userId: chatItem.contactId })}
      onChatClearClicked={() =>
        clearChat(
          chatItem.type === ChatType.GROUP
            ? { groupId: chatItem.contactId }
            : { userId: chatItem.contactId }
        )
      }
      onDeleteGroupClicked={() =>
        deleteGroup(chatItem.contactId, {
          onSuccess: () => removeContact(chatItem.contactId),
        })
      }
      onLeaveGroupClicked={() =>
        leaveGroup(chatItem.contactId, {
          onSuccess: () => removeContact(chatItem.contactId),
        })
      }
    />
  );
};

export default ChatDetailsWired;
