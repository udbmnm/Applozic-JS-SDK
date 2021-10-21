import {
  Text,
  Container,
  VStack,
  Center,
  Avatar,
  useColorModeValue as mode,
  Spinner,
  HStack,
  Box,
  AvatarGroup
} from '@chakra-ui/react';
import React, { useEffect, useRef } from 'react';
import { ChatType, Message } from '../../models/chat';
import ScrollArea from '../ScrollArea';
import ChatBubble from './ChatBubble';
import { useInView } from 'react-intersection-observer';
import { getMonthName } from '../../time-utils';
import ActiveChat, {
  getContactNameAndImageFromActiveChat
} from '../../models/chat/ActiveChat';
import { User } from '@applozic/core-sdk';

export interface ChatWindowProps {
  /** GIPHY API Key to enable sending GIFs */
  giphyApiKey?: string;
  /** Google Maps API Key to enable sending Geo Location */
  gMapsApiKey?: string;
  /** The active selected chat to be shown in the window */
  activeChat: ActiveChat;
  /** The [User](https://websdk.applozic.com/docs/latest/interfaces/User.html) object of the logged in user */
  self: User | null | undefined;
  /** `true` if an attachment is uploaded successfully */
  hasAttachment?: boolean;
  /** Array list of `Message` sorted in reverse chronological order */
  messages?: Message[];
  /** callback to handle fetching the next page of messages */
  fetchNextPage: () => void;
  /** `true` if the next page is being fetched */
  isFetchingNextPage: boolean;
  /** `true` there are more messages to be fetched */
  hasNextPage: boolean | undefined;
  /** callback to clear all unread notifications when the window is mounted */
  clearUnreadNotifications: () => void;
  /** callback to handle deletion of message */
  onMessageDelete?: (message: Message, deleteForAll?: boolean) => void;
}

function ChatWindow({
  self,
  activeChat,
  messages,
  gMapsApiKey,
  hasAttachment,
  hasNextPage,
  isFetchingNextPage,
  clearUnreadNotifications,
  onMessageDelete,
  fetchNextPage
}: ChatWindowProps) {
  const elementRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    clearUnreadNotifications();
  }, []);

  const { contactName, contactImageUrl } = getContactNameAndImageFromActiveChat(
    activeChat
  );

  useEffect(() => {
    if (elementRef?.current) {
      elementRef.current.scrollIntoView({
        block: 'nearest',
        inline: 'nearest'
      });
    }
  }, [elementRef, messages]);
  const { ref: oldestMessage, inView, entry } = useInView({
    /* Optional options */
    threshold: 0,
    initialInView: false
  });
  useEffect(() => {
    if (!isFetchingNextPage && inView && fetchNextPage) {
      fetchNextPage();
    }
  }, [inView]);
  return (
    <Container
      maxW="100%"
      display="flex"
      flexShrink={1}
      flexGrow={1}
      flexBasis={0}
      h={`calc(100% - ${
        activeChat?.user
          ? `${hasAttachment ? '183px' : '115px'}`
          : `${hasAttachment ? '135px' : '67px'}`
      })`}
      backgroundColor={mode('#FFFFFF', '#1B191D')}
    >
      {messages && messages.length > 0 ? (
        <ScrollArea pr={3} pl={3}>
          <VStack
            as="ul"
            w="full"
            spacing={4}
            display="flex"
            flexDirection="column"
          >
            {isFetchingNextPage && hasNextPage && (
              <HStack>
                <Spinner />
                <Text>Fetching older messages...</Text>
              </HStack>
            )}
            {messages.map((message: Message, index: number) => (
              <>
                {(index === 0 ||
                  messages[index - 1].timeStamp.getDate() !==
                    message.timeStamp.getDate()) && (
                  <Box
                    bg="#F2F0F5"
                    p="2px"
                    pl="6px"
                    pr="6px"
                    borderRadius="4px"
                  >
                    <Text color="textMain.300" fontSize="11px">
                      {message.timeStamp.getDate()}{' '}
                      {getMonthName(message.timeStamp)}
                      {message.timeStamp.getFullYear() !==
                      new Date().getFullYear()
                        ? ' ' + message.timeStamp.getFullYear()
                        : ''}
                    </Text>
                  </Box>
                )}
                <ChatBubble
                  gMapsApiKey={gMapsApiKey}
                  chatType={activeChat.user ? ChatType.USER : ChatType.GROUP}
                  ref={index == 0 ? oldestMessage : null}
                  showTime={
                    index === 0 ||
                    messages[index - 1].timeStamp.getDate() !==
                      message.timeStamp.getDate() ||
                    message.timeStamp.getTime() -
                      messages[index - 1].timeStamp.getTime() >
                      1000 * 60 * 10
                  }
                  message={message}
                  showUserInfo={false}
                  onMessageDelete={deleteForAll => {
                    if (onMessageDelete) {
                      onMessageDelete(message, deleteForAll);
                    }
                  }}
                />
              </>
            ))}
            {/* {typing && <Text fontStyle="italic">Typing...</Text>} */}
          </VStack>
          <div ref={elementRef} />
        </ScrollArea>
      ) : (
        <Center justifyContent="center" w="full">
          <VStack spacing={3}>
            <AvatarGroup size="md" max={2}>
              <Avatar src={contactImageUrl} name={contactName} />
              <Avatar
                src={self?.imageLink}
                name={self?.displayName ?? self?.email ?? self?.userId}
              />
            </AvatarGroup>
            <Text>Start your conversation with</Text>
            <Text fontWeight="bold">{contactName}</Text>
          </VStack>
        </Center>
      )}
    </Container>
  );
}

export default ChatWindow;
