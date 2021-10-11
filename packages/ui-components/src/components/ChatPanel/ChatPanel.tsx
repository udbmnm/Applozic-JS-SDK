import { useColorModeValue as mode, Box } from "@chakra-ui/react";
import React, { useEffect } from "react";
import SendMessage, { SendMessageProps } from "../SendMessage";
import ChatWindow, { ChatWindowProps } from "../ChatWindow";
import { FileMeta } from "@applozic/core-sdk";

import MotionBox from "../MotionBox";
import ChatStatusBar, { ChatStatusBarProps } from "../ChatStatusBar";

interface ChatPanelProps {
  clearUnreadNotifications: () => void | Promise<void>;
  fileMeta: FileMeta | undefined;
}

function ChatPanel({
  clearUnreadNotifications,
  activeChat,
  messages,
  giphyApiKey,
  gMapsApiKey,
  fetchNextPage,
  isFetchingNextPage,
  self,
  handleSend,
  handleSendFile,
  hasNextPage,
  isOnline,
  lastSeen,
  isTyping,
  handleTyping,
  fileMeta,
  onMessageDelete,
  onFileDiscarded,
  onFileSelected,
  onSendLocation,
}: ChatPanelProps & ChatWindowProps & ChatStatusBarProps & SendMessageProps) {
  useEffect(() => {
    clearUnreadNotifications();
  }, []);

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
        <ChatStatusBar
          isOnline={isOnline ?? false}
          lastSeen={lastSeen}
          isTyping={isTyping}
        />
      )}
      <Box h={3} />
      <ChatWindow
        activeChat={activeChat}
        self={self}
        fetchNextPage={fetchNextPage}
        isFetchingNextPage={isFetchingNextPage}
        hasNextPage={hasNextPage}
        gMapsApiKey={gMapsApiKey}
        hasAttachment={!!fileMeta}
        messages={messages}
        onMessageDelete={onMessageDelete}
      />
      <SendMessage
        giphyApiKey={giphyApiKey}
        gMapsApiKey={gMapsApiKey}
        attachment={fileMeta}
        handleTyping={handleTyping}
        handleSend={handleSend}
        handleSendFile={handleSendFile}
        onFileSelected={onFileSelected}
        onFileDiscarded={onFileDiscarded}
        onSendLocation={onSendLocation}
      />
    </MotionBox>
  );
}

export default ChatPanel;
