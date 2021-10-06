import {
  useColorModeValue as mode,
  Tabs,
  useToast,
  Box,
  ToastId,
} from "@chakra-ui/react";
import { v4 } from "uuid";
import React, { useEffect, useState } from "react";
import { useApplozicClient } from "../../providers/useApplozicClient";
import SendMessage from "../SendMessage";
import ChatWindow from "./ChatWindow";
import NoChatSelected from "./NoChatSelected";
import {
  getNameFromGroup,
  getNameFromUser,
  MessageContentType,
  FileMeta,
} from "@applozic/core-sdk";
import { ChatType, Message } from "../../models/chat";

import ChatDetailsWired from "../ChatDetails/ChatDetailsWired";
import ChatTabHeadStripWired from "../ChatTabHeadStrip/ChatTabHeadStripWired";
import { AnimatePresence } from "framer-motion";
import ChatStatusBarWired from "../ChatStatusBar/ChatStatusBarWired";
import useGetUserInfo from "../../hooks/queries/useGetUserInfo";
import useGetGroupInfo from "../../hooks/queries/useGetGroupInfo";
import useGetMessages from "../../hooks/queries/useGetUserMessages";
import { useQuery, useQueryClient } from "react-query";
import useSendUserMessage from "../../hooks/mutations/useSendUserMessage";
import { useSidebar } from "../../providers/useSidebar";
import MotionBox from "../MotionBox";
import useDeleteMesssage from "../../hooks/mutations/useDeleteMessage";
import SelfDetailsWired from "../ChatDetails/SelfDetailsWired";
import ActiveChat, { getIdFromActiveChat } from "../../models/chat/ActiveChat";
import { INewMessage } from "../../utils/parser";
import useActiveChats from "../../hooks/useActiveChats";

interface ChatMessageWindowProps {
  activeChat: ActiveChat;
  giphyApiKey?: string;
  gMapsApiKey?: string;
  deleteMessage: (
    messageKey: string,
    contactId: string | undefined,
    deleteForAll?: boolean
  ) => void | Promise<void>;
  sendMessage: (newMessage: INewMessage) => void | Promise<void>;
  getUploadResult: (file: File) => Promise<FileMeta>;
  sendTypingStatus: (userId: string | undefined, isTyping: boolean) => void;
}

function ChatMessagesWindow({
  activeChat,
  giphyApiKey,
  gMapsApiKey,
  deleteMessage,
  sendMessage,
  getUploadResult,
  sendTypingStatus,
}: ChatMessageWindowProps) {
  const toast = useToast();

  // useGetMessages(chatItem.chatType, chatItem.group?.clientGroupId ?? activeChat.user?.userId);
  const [fileMeta, setFileMeta] = useState<FileMeta | undefined>();

  const { data: messages = [] } = useQuery<Message[]>([
    "messages-local",
    activeChat.group?.clientGroupId ?? activeChat.user?.userId,
  ]);
  const queryClient = useQueryClient();
  queryClient.setQueryData(
    [
      "unread-count",
      activeChat.group?.clientGroupId ?? activeChat.user?.userId,
    ],
    {
      unreadCount: 0,
    }
  );

  const { user, group } = activeChat;

  const name = user
    ? getNameFromUser(user)
    : group
    ? getNameFromGroup(group)
    : "";

  const imageUrl = user?.imageLink || group?.imageUrl;

  // const [typing, settyping] = useState(false);
  // useEffect(() => {
  // client?.sendTypingStatus(chatItem.group?.clientGroupId ?? activeChat.user?.userId, typing);
  // }, [typing]);
  return (
    <MotionBox
      padding={0}
      borderBottomRadius={15}
      borderWidth={mode(1, 0)}
      borderColor="#E9E9E9"
      flexDirection="column"
      height="calc(100vh - 63px)"
      backgroundColor={mode("#FFFFFF", "#1B191D")}
    >
      {activeChat.user && (
        <ChatStatusBarWired userId={activeChat.user.userId} />
      )}
      <Box h={3} />
      <ChatWindow
        gMapsApiKey={gMapsApiKey}
        hasAttachment={!!fileMeta}
        chatItem={activeChat}
        messages={messages}
        contactName={name}
        contactImageUrl={imageUrl}
        onMessageDelete={async (message, deleteForAll) => {
          // await client.messages.delete(message.key);
          deleteMessage(
            message.key,
            activeChat.group?.clientGroupId ?? activeChat.user?.userId,
            deleteForAll
          );
        }}
      />
      <SendMessage
        giphyApiKey={giphyApiKey}
        gMapsApiKey={gMapsApiKey}
        attachment={fileMeta}
        handleTyping={(isTyping) => {
          setTimeout(
            () => sendTypingStatus(getIdFromActiveChat(activeChat), isTyping),
            100
          );
          // settyping(isTyping);
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
            setFileMeta(undefined);
            sendTypingStatus(getIdFromActiveChat(activeChat), false);
          }
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
        onFileSelected={async (file) => {
          const result = await getUploadResult(file);
          setFileMeta(result);
        }}
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
      />
    </MotionBox>
  );
}

interface ChatWindowWiredProps {
  giphyApiKey?: string;
  gMapsApiKey?: string;
}

function ChatWindowWired({ giphyApiKey, gMapsApiKey }: ChatWindowWiredProps) {
  const { loginResult } = useApplozicClient();
  const { activeChats, openIndex, detailOpenIndex } = useActiveChats();
  const { isCollapsed, showUserDetails, setShowUserDetails } = useSidebar();
  const fullyOpen = isCollapsed && detailOpenIndex < 0 && !showUserDetails;
  const onlyDetailOpen =
    isCollapsed && (detailOpenIndex >= 0 || showUserDetails);
  const onlySidebarOpen =
    !isCollapsed && detailOpenIndex < 0 && !showUserDetails;
  useEffect(() => {
    if (detailOpenIndex > -1) {
      setShowUserDetails && setShowUserDetails(false);
    }
  }, [detailOpenIndex]);
  return (
    <MotionBox
      display="flex"
      flex={1}
      height="full"
      flexDirection="row"
      w={`calc(100% - ${
        fullyOpen
          ? "200px"
          : onlySidebarOpen
          ? "420px"
          : onlyDetailOpen
          ? "200px"
          : "460px"
      })`}
    >
      {activeChats.length === 0 || openIndex < 0 ? (
        <NoChatSelected />
      ) : (
        <Tabs
          isFitted
          variant="enclosed"
          width={`calc(100% - ${detailOpenIndex > -1 ? "350px" : "12px"})`}
          height="full"
          index={openIndex}
        >
          <ChatTabHeadStripWired />
          <ChatMessagesWindow
            activeChat={activeChats[openIndex]}
            giphyApiKey={giphyApiKey}
            gMapsApiKey={gMapsApiKey}
          />
        </Tabs>
      )}
      <AnimatePresence>
        {detailOpenIndex > -1 && (
          <ChatDetailsWired
            activeChat={
              showUserDetails
                ? {
                    user: loginResult?.newUser,
                  }
                : activeChats[detailOpenIndex]
            }
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {showUserDetails && <SelfDetailsWired />}
      </AnimatePresence>
    </MotionBox>
  );
}

export default ChatWindowWired;
