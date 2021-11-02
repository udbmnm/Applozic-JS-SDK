import {
  Text,
  List,
  VStack,
  Center,
  Avatar,
  useColorModeValue as mode,
  Spinner,
  HStack,
  Box,
  AvatarGroup,
  ListItem
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
  hasNextPage,
  isFetchingNextPage,
  clearUnreadNotifications,
  onMessageDelete,
  fetchNextPage
}: ChatWindowProps) {
  const elementRef = useRef<null | HTMLLIElement>(null);

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
  const { ref: oldestMessage, inView } = useInView({
    /* Optional options */
    threshold: 0,
    initialInView: false
  });
  useEffect(() => {
    if (!isFetchingNextPage && inView && fetchNextPage) {
      fetchNextPage();
    }
  }, [inView]);
  // `calc(100% - ${
  //   activeChat?.user
  //     ? `${hasAttachment ? '183px' : '115px'}`
  //     : `${hasAttachment ? '135px' : '67px'}`
  // })`
  return (
    <ScrollArea
      w="full"
      h="full"
      flexGrow={1}
      px={3}
      backgroundColor={mode('#FFFFFF', '#1B191D')}
    >
      {messages && messages.length > 0 ? (
        <List
          h="full"
          w="full"
          spacing={4}
          display="flex"
          flexDirection="column"
        >
          {isFetchingNextPage && hasNextPage && (
            <ListItem>
              <HStack>
                <Spinner />
                <Text>Fetching older messages...</Text>
              </HStack>
            </ListItem>
          )}
          {messages.map((message: Message, index: number) => (
            <ListItem
              key={message.key}
              ref={index == 0 ? oldestMessage : null}
              display="flex"
              flexDirection="column"
            >
              {(index === 0 ||
                messages[index - 1].timeStamp.getDate() !==
                  message.timeStamp.getDate()) && (
                <Text
                  color="textMain.300"
                  fontSize="11px"
                  bg="#F2F0F5"
                  py={0.5}
                  px={1.5}
                  mb={2}
                  alignSelf="center"
                  borderRadius={4}
                >
                  {message.timeStamp.getDate()}{' '}
                  {getMonthName(message.timeStamp)}
                  {message.timeStamp.getFullYear() !== new Date().getFullYear()
                    ? ' ' + message.timeStamp.getFullYear()
                    : ''}
                </Text>
              )}
              <ChatBubble
                gMapsApiKey={gMapsApiKey}
                chatType={activeChat.user ? ChatType.USER : ChatType.GROUP}
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
            </ListItem>
          ))}
          <ListItem ref={elementRef} />
        </List>
      ) : (
        <Center justifyContent="center" maxW="full" maxH="full">
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
    </ScrollArea>
  );
}

export default ChatWindow;
