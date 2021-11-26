import { useColorModeValue as mode, Box, VStack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import SendMessage, { SendMessageProps } from '../SendMessage';
import ChatWindow, { ChatWindowProps } from '../ChatWindow';
import { FileMeta } from '@applozic/core-sdk';

import MotionBox from '../MotionBox';
import ChatStatusBar, { ChatStatusBarProps } from '../ChatStatusBar';

export interface ChatPanelProps
  extends ChatStatusBarProps,
    ChatWindowProps,
    Omit<SendMessageProps, 'handleSend'>,
    ChatStatusBarProps {
  /** define if this panel is being used by the plugin view */
  isPlugin: boolean;
  /** handle sending file and text */
  handleSendFileAndText: (
    text: string,
    fileMeta?: FileMeta | undefined
  ) => void;
}

function ChatPanel({
  isPlugin,
  self,
  activeChat,
  messages,
  isOnline,
  lastSeen,
  isTyping,
  giphyApiKey,
  gMapsApiKey,
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
  clearUnreadNotifications,
  handleSendFileAndText,
  handleSendFile,
  handleTyping,
  onMessageDelete,
  onFileSelected,
  onSendLocation
}: ChatPanelProps) {
  const [fileMeta, setFileMeta] = useState<FileMeta | undefined>();

  useEffect(() => {
    clearUnreadNotifications();
  }, []);

  return (
    <MotionBox
      p={0}
      m={0}
      borderBottomRadius={15}
      borderWidth={mode(1, 0)}
      borderColor="pane.light"
      h={isPlugin ? 'calc(100% - 48px)' : 'calc(100vh - 64px)'}
      w="full"
      backgroundColor={mode('card.light', 'pane.dark')}
      display="flex"
      flexWrap="nowrap"
      flexDirection="column"
    >
      {activeChat.user && (
        <ChatStatusBar
          isOnline={isOnline ?? false}
          lastSeen={lastSeen}
          isTyping={isTyping}
        />
      )}
      <ChatWindow
        clearUnreadNotifications={clearUnreadNotifications}
        activeChat={activeChat}
        self={self}
        fetchNextPage={fetchNextPage}
        isFetchingNextPage={isFetchingNextPage}
        hasNextPage={hasNextPage}
        gMapsApiKey={gMapsApiKey}
        hasAttachment={!!fileMeta}
        messages={messages}
        onMessageDelete={onMessageDelete}
        sendQuickReply={text => {
          handleSendFileAndText(text, fileMeta);
          setFileMeta(undefined);
        }}
      />
      <SendMessage
        giphyApiKey={giphyApiKey}
        gMapsApiKey={gMapsApiKey}
        attachment={fileMeta}
        handleTyping={handleTyping}
        handleSend={text => {
          handleSendFileAndText(text, fileMeta);
          setFileMeta(undefined);
        }}
        handleSendFile={handleSendFile}
        onFileSelected={async file => {
          if (onFileSelected) {
            const fileMeta = await onFileSelected(file);
            setFileMeta(fileMeta);
            return fileMeta;
          }
        }}
        onFileDiscarded={() => setFileMeta(undefined)}
        onSendLocation={onSendLocation}
      />
    </MotionBox>
  );
}

export default ChatPanel;
