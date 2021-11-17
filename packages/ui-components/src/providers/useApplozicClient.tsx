import '@fontsource/roboto';
import 'focus-visible/dist/focus-visible';

import React, { createContext, useContext, useEffect, useState } from 'react';
import ApplozicClient, {
  LoginResult,
  MessageData,
  User
} from '@applozic/core-sdk';
import { useQueryClient } from 'react-query';
import { getUIMessageFromClientMessage } from '../utils/parser';
import {
  ChatType,
  Message as UIMessage,
  MessageStatus,
  RecentChat
} from '../models/chat';
import { mergeMessages } from '../utils/messagesMerger';
import { IPresence } from '../hooks/usePresence';
import { IUnreadCount } from '../hooks/queries/useGetUnreadCount';
import { mergeRecentChats } from '../utils/recentChatsMerger';
import useDeleteMesssage from '../hooks/mutations/useDeleteMessage';
import { ViewProps } from '../views/ViewProps';
import useActiveChats from '../hooks/useActiveChats';

interface IApplozicClient {
  client: ApplozicClient | undefined;
  loginResult: LoginResult | null | undefined;
  logoutUser?: () => Promise<void>;
  isClientLoaded: boolean;
  giphyApiKey?: string;
  gMapsApiKey?: string;
}

const ApplozicClientContext = createContext<IApplozicClient>({
  client: undefined,
  loginResult: null,
  isClientLoaded: false
});

const useGetApplozicClient = (
  applicationId: string,
  giphyApiKey?: string,
  gMapsApiKey?: string
) => {
  const [client, setClient] = useState<ApplozicClient | undefined>();
  const { mutate: deleteMessageMutation } = useDeleteMesssage();
  const { activeChats, openIndex } = useActiveChats();
  const [isClientLoaded, setIsClientLoaded] = useState(false);
  const queryClient = useQueryClient();

  const messageUpdateHandler = (message: MessageData) => {
    const messagesLocal =
      queryClient.getQueryData<UIMessage[]>([
        'messages-local',
        message.clientGroupId ? message.clientGroupId : message.contactIds
      ]) ?? [];
    const uiMessage = getUIMessageFromClientMessage(message);
    queryClient.setQueryData<UIMessage[]>(
      [
        'messages-local',
        message.clientGroupId ? message.clientGroupId : message.contactIds
      ],
      mergeMessages([uiMessage], messagesLocal)
    );
    let currentRecentChats =
      queryClient.getQueryData<RecentChat[]>(['recent-chats-local']) ?? [];

    currentRecentChats = mergeRecentChats(currentRecentChats, [
      {
        lastMessageKey: message.key,
        lastMessageTime: message.createdAtTime,
        contactId: message.clientGroupId
          ? message.clientGroupId
          : message.contactIds,
        chatType: message.clientGroupId ? ChatType.GROUP : ChatType.USER
      }
    ]);
    queryClient.setQueryData<RecentChat[]>(
      ['recent-chats-local'],
      currentRecentChats
    );
  };

  const deleteMessage = (contactId: string, messageKey: string) => {
    deleteMessageMutation({ messageKey, contactId });
  };

  const logoutUser = async () => {
    if (client) {
      await client.logout();
      queryClient.setQueryData(['self', client.loginResult?.userId], null);
      queryClient.clear();
    }
  };

  useEffect(() => {
    const initSdk = async () => {
      await logoutUser();
      const _client = new ApplozicClient(applicationId, {
        useSocket: true,
        events: {
          onMessageReceived: ({ message }) => {
            messageUpdateHandler(message as MessageData);
            if (openIndex >= 0) {
              const chat = activeChats[openIndex];
              const chatId = chat.group?.clientGroupId || chat.user?.userId;
              const messageFromId = (message as MessageData).clientGroupId
                ? (message as MessageData).clientGroupId
                : (message as MessageData).contactIds;

              if (messageFromId !== chatId) {
                queryClient.setQueryData<IUnreadCount>(
                  [
                    'unread-count',
                    (message as MessageData).clientGroupId
                      ? (message as MessageData).clientGroupId
                      : (message as MessageData).contactIds
                  ],
                  ({ unreadCount } = { unreadCount: 0 }) => ({
                    unreadCount: unreadCount ? unreadCount + 1 : 1
                  })
                );
              }
            }
          },
          onMessageDelivered: ({ message }) => {
            messageUpdateHandler(message as MessageData);
          },
          onMessageRead: (contactId, messageKey) => {
            const currentMessages = queryClient.getQueryData<UIMessage[]>([
              'messages-local',
              contactId
            ]);
            if (currentMessages) {
              const newMessages = currentMessages.map(message => {
                if (message.key === messageKey) {
                  return {
                    ...message,
                    status: MessageStatus.READ
                  };
                } else {
                  return { ...message };
                }
              });
              queryClient.setQueryData<UIMessage[]>(
                ['messages-local', contactId],
                newMessages
              );
              // queryClient.invalidateQueries(['messages', contactId]);
            }
          },
          onMessageSent: ({ message }) => {
            messageUpdateHandler(message as MessageData);
          },
          onMessageSentUpdate: message => {
            // TODO: handle this
          },
          onConversationDeliveredAndRead: userId => {
            console.log('onConversationDeliveredAndRead', { userId });
          },
          onMessageDeleted: deleteMessage,
          onConversationRead: userId => {
            const currentMessages = queryClient.getQueryData<UIMessage[]>([
              'messages-local',
              ChatType.USER,
              userId
            ]);
            if (currentMessages) {
              queryClient.setQueryData<UIMessage[]>(
                ['messages-local', userId],
                currentMessages.map(message => ({
                  ...message,
                  status: MessageStatus.READ
                }))
              );
            }
          },

          onConversationDeleted: contactId => {
            queryClient.setQueryData<UIMessage[]>(
              ['messages-local', contactId],
              []
            );
            // queryClient.invalidateQueries(["messages", contactId]);
          },

          onUserActivated: message => {
            // TODO: handle this
          },
          onUserConnect: message => {
            // TODO: handle this
          },
          onUserOnlineStatus: (userId, isOnline, timestamp) => {
            const user = queryClient.getQueryData<User>(['user', userId, true]);
            if (user) {
              queryClient.setQueryData<User>(['user', userId, true], {
                ...user,
                lastSeenAtTime: timestamp,
                connected: isOnline
              });
            }
          },
          onTypingStatus: (userId, status) => {
            const presenceData =
              queryClient.getQueryData<IPresence>(['user-presence', userId]) ??
              {};
            queryClient.setQueryData<IPresence>(['user-presence', userId], {
              ...presenceData,
              isTyping: status === 1
            });
          }
        }
      });
      try {
        await _client.init();
        setClient(_client);
        if (_client.loginResult) {
          queryClient.invalidateQueries(['self', _client.loginResult.userId]);
        }
        (window as any).alClient = _client;
        setIsClientLoaded(true);
      } catch (e) {
        setIsClientLoaded(false);
      }
    };
    setIsClientLoaded(false);
    initSdk();
  }, [applicationId]);

  return {
    client,
    loginResult: client?.loginResult,
    logoutUser,
    isClientLoaded,
    giphyApiKey,
    gMapsApiKey
  };
};

export interface ProvideApplozicClientProps
  extends Omit<ViewProps, 'loginPage'> {
  children: React.ReactNode;
}

export function ProvideApplozicClient({
  children,
  applicationId,
  giphyApiKey,
  gMapsApiKey
}: ProvideApplozicClientProps) {
  return (
    <ApplozicClientContext.Provider
      value={useGetApplozicClient(applicationId, giphyApiKey, gMapsApiKey)}
    >
      {children}
    </ApplozicClientContext.Provider>
  );
}

export const useApplozicClient = () => useContext(ApplozicClientContext);
