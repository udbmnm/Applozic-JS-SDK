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
import ActiveChat from "../../models/chat/ActiveChat";

interface ChatMessageWindowProps {
  activeChat: ActiveChat;
  giphyApiKey?: string;
  gMapsApiKey?: string;
}

function ChatMessagesWindow({
  activeChat,
  giphyApiKey,
  gMapsApiKey,
}: ChatMessageWindowProps) {
  const toast = useToast();

  // useGetMessages(chatItem.chatType, chatItem.group?.clientGroupId ?? activeChat.user?.userId);
  const [fileMeta, setFileMeta] = useState<FileMeta | undefined>();
  const { mutate: deleteMessageMutation } = useDeleteMesssage();
  const { client } = useApplozicClient();
  const { mutate: sendMessage } = useSendUserMessage();
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

  const getUploadResult = async (file: File) => {
    if (client) {
      const x = toast({ description: "Uploading..." });
      const result = await client.files.upload(file);
      toast.close(x as ToastId);
      return result;
    }
  };
  // const [typing, settyping] = useState(false);
  // useEffect(() => {
  // client?.sendTypingStatus(chatItem.group?.clientGroupId ?? activeChat.user?.userId, typing);
  // }, [typing]);
  console.log({ fileMeta, check: !!fileMeta });
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
          if (client) {
            // await client.messages.delete(message.key);
            deleteMessageMutation({
              messageKey: message.key,
              contactId:
                activeChat.group?.clientGroupId ?? activeChat.user?.userId,
              deleteForAll,
            });
          }
        }}
      />
      <SendMessage
        giphyApiKey={giphyApiKey}
        gMapsApiKey={gMapsApiKey}
        attachment={fileMeta}
        handleTyping={(isTyping) => {
          console.log({ isTyping });
          setTimeout(
            () =>
              client?.sendTypingStatus(
                activeChat.group?.clientGroupId ?? activeChat.user?.userId,
                isTyping
              ),
            100
          );
          // settyping(isTyping);
        }}
        handleSend={(text) => {
          if (sendMessage) {
            sendMessage({
              to:
                activeChat.chatType === ChatType.USER
                  ? activeChat.group?.clientGroupId ?? activeChat.user?.userId
                  : undefined,
              clientGroupId:
                activeChat.chatType === ChatType.GROUP
                  ? activeChat.group?.clientGroupId ?? activeChat.user?.userId
                  : undefined,
              message: text,
              fileMeta,
              metadata: { webUiKey: v4() },
            });
            setFileMeta(undefined);
            client?.sendTypingStatus(
              activeChat.group?.clientGroupId ?? activeChat.user?.userId,
              false
            );
          }
        }}
        handleSendFile={async (file) => {
          if (client) {
            const result = await getUploadResult(file);
            if (result) {
              sendMessage({
                to:
                  activeChat.chatType === ChatType.USER
                    ? activeChat.group?.clientGroupId ?? activeChat.user?.userId
                    : undefined,
                clientGroupId:
                  activeChat.chatType === ChatType.GROUP
                    ? activeChat.group?.clientGroupId ?? activeChat.user?.userId
                    : undefined,
                message: "",
                fileMeta: result,
                metadata: { webUiKey: v4() },
              });
            }
          }
        }}
        onFileSelected={async (file) => {
          if (client) {
            const result = await getUploadResult(file);
            setFileMeta(result);
          }
        }}
        onFileDiscarded={() => {
          setFileMeta(undefined);
        }}
        onSendLocation={(position) => {
          if (sendMessage) {
            sendMessage({
              to:
                activeChat.chatType === ChatType.USER
                  ? activeChat.group?.clientGroupId ?? activeChat.user?.userId
                  : undefined,
              clientGroupId:
                activeChat.chatType === ChatType.GROUP
                  ? activeChat.group?.clientGroupId ?? activeChat.user?.userId
                  : undefined,
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
  const { chats, openIndex, detailIndex } = useActiveChats();
  const { isCollapsed, showUserDetails, setShowUserDetails } = useSidebar();
  const fullyOpen = isCollapsed && detailIndex < 0 && !showUserDetails;
  const onlyDetailOpen = isCollapsed && (detailIndex >= 0 || showUserDetails);
  const onlySidebarOpen = !isCollapsed && detailIndex < 0 && !showUserDetails;
  useEffect(() => {
    if (detailIndex > -1) {
      setShowUserDetails && setShowUserDetails(false);
    }
  }, [detailIndex]);
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
      {chats.length === 0 || openIndex < 0 ? (
        <NoChatSelected />
      ) : (
        <Tabs
          isFitted
          variant="enclosed"
          width={`calc(100% - ${detailIndex > -1 ? "350px" : "12px"})`}
          height="full"
          index={openIndex}
        >
          <ChatTabHeadStripWired />
          <ChatMessagesWindow
            activeChat={chats[openIndex]}
            giphyApiKey={giphyApiKey}
            gMapsApiKey={gMapsApiKey}
          />
        </Tabs>
      )}
      <AnimatePresence>
        {detailIndex > -1 && (
          <ChatDetailsWired
            activeChat={
              showUserDetails
                ? {
                    contactId: loginResult?.userId as string,
                    type: ChatType.SELF,
                  }
                : chats[detailIndex]
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
