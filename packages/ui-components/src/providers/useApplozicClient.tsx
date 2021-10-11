import React, { createContext, useContext, useEffect, useState } from "react";
import ApplozicClient, {
  LoginResult,
  MessageData,
  User,
} from "@applozic/core-sdk";
import { useQueryClient } from "react-query";
import { getUIMessageFromClientMessage } from "../utils/parser";
import {
  ChatType,
  Message as UIMessage,
  MessageStatus,
  RecentChat,
} from "../models/chat";
import { mergeMessages } from "../utils/messagesMerger";
import { IPresence } from "../hooks/usePresence";
import { IUnreadCount } from "../hooks/queries/useGetUnreadCount";
import { mergeRecentChats } from "../utils/recentChatsMerger";
import useDeleteMesssage from "../hooks/mutations/useDeleteMessage";

import { ChakraProvider } from "@chakra-ui/react";
import { QueryClientProvider, QueryClient } from "react-query";
import theme from "../theme";

const applozicQueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
    },
  },
});

interface IApplozicClient {
  client: ApplozicClient | undefined;
  loginResult: LoginResult | null | undefined;
  isClientLoaded: boolean;
  giphyApiKey?: string;
  gMapsApiKey?: string;
}

const ApplozicClientContext = createContext<IApplozicClient>({
  client: undefined,
  loginResult: null,
  isClientLoaded: false,
});

const useGetApplogicClient = (
  applicationId: string,
  giphyApiKey?: string,
  gMapsApiKey?: string
) => {
  const [client, setClient] = useState<ApplozicClient | undefined>();
  const { mutate: deleteMessageMutation } = useDeleteMesssage();
  const [isClientLoaded, setIsClientLoaded] = useState(false);
  const queryClient = useQueryClient();

  const messageUpdateHandler = (message: MessageData) => {
    const messagesLocal =
      queryClient.getQueryData<UIMessage[]>([
        "messages-local",
        message.clientGroupId ? message.clientGroupId : message.contactIds,
      ]) ?? [];
    const uiMessage = getUIMessageFromClientMessage(message);
    queryClient.setQueryData<UIMessage[]>(
      [
        "messages-local",
        message.clientGroupId ? message.clientGroupId : message.contactIds,
      ],
      mergeMessages([uiMessage], messagesLocal)
    );
    let currentRecentChats =
      queryClient.getQueryData<RecentChat[]>([
        "recent-chats-local",
        client?.loginResult?.userId,
      ]) ?? [];

    currentRecentChats = mergeRecentChats(currentRecentChats, [
      {
        lastMessageKey: message.key,
        lastMessageTime: message.createdAtTime,
        contactId: message.clientGroupId
          ? message.clientGroupId
          : message.contactIds,
        chatType: message.clientGroupId ? ChatType.GROUP : ChatType.USER,
      },
    ]);
    queryClient.setQueryData<RecentChat[]>(
      ["recent-chats-local", client?.loginResult?.userId],
      currentRecentChats
    );
  };

  const deleteMessage = (contactId: string, messageKey: string) => {
    deleteMessageMutation({ messageKey, contactId });
  };

  useEffect(() => {
    const initSdk = async () => {
      const client = new ApplozicClient(applicationId ?? "", {
        useSocket: true,
        events: {
          onMessageReceived: ({ message }) => {
            messageUpdateHandler(message as MessageData);
            queryClient.setQueryData<IUnreadCount>(
              [
                "unread-count",
                (message as MessageData).clientGroupId
                  ? (message as MessageData).clientGroupId
                  : (message as MessageData).contactIds,
              ],
              ({ unreadCount } = { unreadCount: 0 }) => ({
                unreadCount: unreadCount ? unreadCount + 1 : 1,
              })
            );
          },
          onMessageDelivered: ({ message }) => {
            messageUpdateHandler(message as MessageData);
          },
          onMessageRead: (contactId, messageKey) => {
            const currentMessages = queryClient.getQueryData<UIMessage[]>([
              "messages-local",
              contactId,
            ]);
            if (currentMessages) {
              const newMessages = currentMessages.map((message) => {
                if (message.key === messageKey) {
                  return {
                    ...message,
                    status: MessageStatus.READ,
                  };
                } else {
                  return { ...message };
                }
              });
              queryClient.setQueryData<UIMessage[]>(
                ["messages-local", contactId],
                newMessages
              );
              // queryClient.invalidateQueries(['messages', contactId]);
            }
          },
          onMessageSent: ({ message }) => {
            messageUpdateHandler(message as MessageData);
          },
          onMessageSentUpdate: (message) => {
            console.log({ sentMessageUpdate: message });
          },
          onMessageDeleted: deleteMessage,
          onConversationRead: (userId) => {
            const currentMessages = queryClient.getQueryData<UIMessage[]>([
              "messages-local",
              ChatType.USER,
              userId,
            ]);
            if (currentMessages) {
              queryClient.setQueryData<UIMessage[]>(
                ["messages-local", userId],
                currentMessages.map((message) => ({
                  ...message,
                  status: MessageStatus.READ,
                }))
              );
            }
          },

          onConversationDeleted: (contactId) => {
            queryClient.setQueryData<UIMessage[]>(
              ["messages-local", contactId],
              []
            );
            // queryClient.invalidateQueries(["messages", contactId]);
          },

          onUserActivated: (message) => {
            console.log({ onUserActivated: message });
          },
          onUserConnect: (message) => {
            console.log({ userConnected: message });
          },
          onUserOnlineStatus: (userId, isOnline, timestamp) => {
            const user = queryClient.getQueryData<User>(["user", userId, true]);
            if (user) {
              queryClient.setQueryData<User>(["user", userId, true], {
                ...user,
                lastSeenAtTime: timestamp,
                connected: isOnline,
              });
            }
          },
          onTypingStatus: (userId, status) => {
            const presenceData =
              queryClient.getQueryData<IPresence>(["user-presence", userId]) ??
              {};
            queryClient.setQueryData<IPresence>(["user-presence", userId], {
              ...presenceData,
              isTyping: status === 1,
            });
          },
        },
      });
      await client.init();
      setClient(client);
      if (client.loginResult) {
        const response = await client?.contacts.getUserDetails([
          client.loginResult.userId,
        ]);
        const user = response && response?.length > 0 ? response[0] : undefined;
        queryClient.setQueryData<User | undefined>(["self"], user);
      }
      (window as any).alClient = client;
      setIsClientLoaded(true);
    };
    initSdk();
  }, [applicationId]);
  
  return {
    client,
    loginResult: client?.loginResult,
    isClientLoaded,
    giphyApiKey,
    gMapsApiKey,
  };
};

export function ProvideApplozicClient({
  children,
  applicationId,
  colorMode = "light",
  useSystemColorMode = false,
  giphyApiKey,
  gMapsApiKey,
}: {
  children: React.ReactNode;
  applicationId: string;
  colorMode: "light" | "dark";
  useSystemColorMode: boolean;
  giphyApiKey?: string;
  gMapsApiKey?: string;
}) {
  return (
    <QueryClientProvider client={applozicQueryClient}>
      <ChakraProvider
        theme={theme({ initialColorMode: colorMode, useSystemColorMode })}
      >
        <ApplozicClientContext.Provider
          value={useGetApplogicClient(applicationId, giphyApiKey, gMapsApiKey)}
        >
          {children}
        </ApplozicClientContext.Provider>
      </ChakraProvider>
    </QueryClientProvider>
  );
}

export const useApplozicClient = () => useContext(ApplozicClientContext);
