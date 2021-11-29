import { useToast, ToastId, useWhyDidYouUpdate } from '@chakra-ui/react';
import React, { useCallback } from 'react';
import { MessageContentType } from '@applozic/core-sdk';
import { Message } from '../../models/chat';

import useGetMessages from '../../hooks/queries/useGetUserMessages';
import { useQuery, useQueryClient } from 'react-query';
import useGetSelfDetails from '../../hooks/queries/useGetSelfDetails';
import ChatPanel from './ChatPanel';
import useDeleteMesssage from '../../hooks/mutations/useDeleteMessage';
import { useApplozicClient } from '../../providers/useApplozicClient';
import useSendUserMessage from '../../hooks/mutations/useSendUserMessage';
import ActiveChat, { getIdFromActiveChat } from '../../models/chat/ActiveChat';
import { v4 } from 'uuid';
import { usePresence } from '../../hooks/usePresence';

export interface ChatPanelWiredProps {
  isPlugin?: boolean;
  activeChat: ActiveChat;
}

function ChatPanelWired({ isPlugin, activeChat }: ChatPanelWiredProps) {
  const toast = useToast();
  const { client, giphyApiKey, gMapsApiKey } = useApplozicClient();
  const contactId = getIdFromActiveChat(activeChat);
  const { fetchNextPage, isFetchingNextPage, hasNextPage } = useGetMessages(
    activeChat
  );

  useWhyDidYouUpdate('ChatPanelWired', { isPlugin, activeChat });

  const { data: self } = useGetSelfDetails();
  const presenceData = usePresence(activeChat.user?.userId ?? '');
  const { data: messages = [] } = useQuery<Message[]>([
    'messages-local',
    activeChat.group?.clientGroupId ?? activeChat.user?.userId
  ]);
  const queryClient = useQueryClient();
  const { mutate: deleteMessageMutation } = useDeleteMesssage();

  const getUploadResult = async (file: File) => {
    const x = toast({ description: 'Uploading...' });
    if (client) {
      const result = await client.files.upload(file);
      toast.close(x as ToastId);
      return result;
    } else {
      return undefined;
    }
  };

  const { mutate: sendMessage } = useSendUserMessage();

  const clearUnreadNotifications = useCallback(() => {
    queryClient.setQueryData(
      [
        'unread-count',
        activeChat.group?.clientGroupId ?? activeChat.user?.userId
      ],
      {
        unreadCount: 0
      }
    );
  }, []);

  const onMessageDelete = useCallback(
    (
      contactId: string | undefined,
      message: Message,
      deleteForAll?: boolean
    ) => {
      if (contactId) {
        deleteMessageMutation(
          {
            messageKey: message.key,
            contactId,
            deleteForAll
          },
          {
            onSuccess: () => {
              toast({ title: 'Message Deleted!' });
            }
          }
        );
      }
    },
    []
  );

  return (
    <ChatPanel
      sendQuickReply={text =>
        sendMessage({
          to: getIdFromActiveChat(activeChat),
          clientGroupId: getIdFromActiveChat(activeChat),
          message: text,
          metadata: { webUiKey: v4() }
        })
      }
      isPlugin={!!isPlugin}
      giphyApiKey={giphyApiKey}
      gMapsApiKey={gMapsApiKey}
      self={self}
      messages={messages}
      isOnline={presenceData.isOnline}
      isTyping={presenceData.isTyping}
      lastSeen={presenceData.lastSeen}
      activeChat={activeChat}
      handleTyping={typing => {
        setTimeout(
          () => contactId && client?.sendTypingStatus(contactId, typing),
          100
        );
      }}
      clearUnreadNotifications={clearUnreadNotifications}
      onSendLocation={position => {
        if (sendMessage) {
          sendMessage({
            to: getIdFromActiveChat(activeChat),
            clientGroupId: getIdFromActiveChat(activeChat),
            message: JSON.stringify({ lat: position.lat, lon: position.lng }),
            metadata: { webUiKey: v4() },
            contentType: MessageContentType.LOCATION
          });
        }
      }}
      onFileSelected={getUploadResult}
      fetchNextPage={fetchNextPage}
      isFetchingNextPage={isFetchingNextPage}
      hasNextPage={hasNextPage}
      handleSendFile={async file => {
        const result = await getUploadResult(file);
        if (result) {
          sendMessage({
            to: getIdFromActiveChat(activeChat),
            clientGroupId: getIdFromActiveChat(activeChat),
            message: '',
            fileMeta: result,
            metadata: { webUiKey: v4() }
          });
        }
      }}
      onMessageDelete={onMessageDelete}
      handleSendFileAndText={(text, fileMeta) => {
        sendMessage({
          to: getIdFromActiveChat(activeChat),
          clientGroupId: getIdFromActiveChat(activeChat),
          message: text,
          fileMeta,
          metadata: { webUiKey: v4() }
        });
        contactId && client?.sendTypingStatus(contactId, false);
      }}
    />
  );
}

export default ChatPanelWired;
