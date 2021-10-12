import { useToast, ToastId } from "@chakra-ui/react";
import React, { useCallback, useState } from "react";
import { FileMeta, MessageContentType } from "@applozic/core-sdk";
import { Message } from "../../models/chat";

import useGetMessages from "../../hooks/queries/useGetUserMessages";
import { useQuery, useQueryClient } from "react-query";
import useGetSelfDetails from "../../hooks/queries/useGetSelfDetails";
import ChatPanel from "./ChatPanel";
import useDeleteMesssage from "../../hooks/mutations/useDeleteMessage";
import { useApplozicClient } from "../../providers/useApplozicClient";
import useSendUserMessage from "../../hooks/mutations/useSendUserMessage";
import ActiveChat, { getIdFromActiveChat } from "../../models/chat/ActiveChat";
import { v4 } from "uuid";

function ChatPanelWired({ activeChat }: { activeChat: ActiveChat }) {
  const toast = useToast();
  const { client } = useApplozicClient();
  const contactId = getIdFromActiveChat(activeChat);
  const { fetchNextPage, isFetchingNextPage, hasNextPage } = useGetMessages(
    activeChat
  );

  const self = useGetSelfDetails();

  const { data: messages = [] } = useQuery<Message[]>([
    "messages-local",
    activeChat.group?.clientGroupId ?? activeChat.user?.userId,
  ]);
  const queryClient = useQueryClient();
  const { mutate: deleteMessageMutation } = useDeleteMesssage();

  const getUploadResult = async (file: File) => {
    const x = toast({ description: "Uploading..." });
    if (client) {
      const result = await client.files.upload(file);
      toast.close(x as ToastId);
      return result;
    } else {
      return undefined;
    }
  };

  const { mutate: sendMessage } = useSendUserMessage();
  const [fileMeta, setFileMeta] = useState<FileMeta | undefined>();

  const handleTyping = useCallback((typing: boolean) => {
    setTimeout(
      () => contactId && client?.sendTypingStatus(contactId, typing),
      100
    );
  }, []);
  return (
    <ChatPanel
      fileMeta={fileMeta}
      clearUnreadNotifications={() => {
        queryClient.setQueryData(
          [
            "unread-count",
            activeChat.group?.clientGroupId ?? activeChat.user?.userId,
          ],
          {
            unreadCount: 0,
          }
        );
      }}
      self={self}
      messages={messages}
      activeChat={activeChat}
      handleTyping={handleTyping}
      onFileDiscarded={() => {
        setFileMeta(undefined);
      }}
      onSendLocation={(position) => {
        if (sendMessage) {
          sendMessage({
            to: getIdFromActiveChat(activeChat),
            clientGroupId: getIdFromActiveChat(activeChat),
            message: JSON.stringify({ lat: position.lat, lon: position.lng }),
            metadata: { webUiKey: v4() },
            contentType: MessageContentType.LOCATION,
          });
        }
      }}
      onFileSelected={async (file) => {
        console.log({ onFileSelected: file });
        const result = await getUploadResult(file);
        setFileMeta(result);
      }}
      handleSendFile={async (file) => {
        const result = await getUploadResult(file);
        if (result) {
          sendMessage({
            to: getIdFromActiveChat(activeChat),
            clientGroupId: getIdFromActiveChat(activeChat),
            message: "",
            fileMeta: result,
            metadata: { webUiKey: v4() },
          });
        }
      }}
      onMessageDelete={(message, deleteForAll) => {
        if (contactId) {
          deleteMessageMutation({
            messageKey: message.key,
            contactId,
            deleteForAll,
          });
        }
      }}
      handleSend={(text) => {
        if (sendMessage) {
          sendMessage({
            to: getIdFromActiveChat(activeChat),
            clientGroupId: getIdFromActiveChat(activeChat),
            message: text,
            fileMeta,
            metadata: { webUiKey: v4() },
          });
          contactId && client?.sendTypingStatus(contactId, false);
          setFileMeta(undefined);
        }
      }}
      fetchNextPage={() => {
        console.log("fetching more");
        fetchNextPage();
      }}
      isFetchingNextPage={isFetchingNextPage}
      hasNextPage={hasNextPage}
    />
  );
}

export default ChatPanelWired;
