import { useColorModeValue as mode, Box } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import SendMessage, { SendMessageProps } from '../SendMessage';
import ChatWindow, { ChatWindowProps } from '../ChatWindow';
import { FileMeta } from '@applozic/core-sdk';

import MotionBox from '../MotionBox';
import ChatStatusBar, { ChatStatusBarProps } from '../ChatStatusBar';

export interface ChatPanelProps
  extends ChatWindowProps,
    Omit<SendMessageProps, 'handleSend'>,
    ChatStatusBarProps {
  handleSendFileAndText: (
    text: string,
    fileMeta?: FileMeta | undefined
  ) => void;
}

function ChatPanel({
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
}: ChatPanelProps & ChatWindowProps & ChatStatusBarProps & SendMessageProps) {
  const [fileMeta, setFileMeta] = useState<FileMeta | undefined>();

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
      height="full"
      backgroundColor={mode('#FFFFFF', '#1B191D')}
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
