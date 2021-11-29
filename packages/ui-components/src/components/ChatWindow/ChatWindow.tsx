import {
  Text,
  List,
  VStack,
  Center,
  Avatar,
  useColorModeValue as mode,
  Spinner,
  HStack,
  AvatarGroup,
  ListItem,
  useWhyDidYouUpdate
} from '@chakra-ui/react';
import React, { useEffect, useMemo, useRef } from 'react';
import { Message } from '../../models/chat';
import ScrollArea from '../ScrollArea';
import { useInView } from 'react-intersection-observer';
import ActiveChat, {
  getContactNameAndImageFromActiveChat
} from '../../models/chat/ActiveChat';
import MessageItem from './MessageItem';
import { User } from '@applozic/core-sdk';
import MotionListItem from '../MotionListItem';
import { getMonthName } from '../../time-utils';

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
  onMessageDelete?: (
    contactId: string | undefined,
    message: Message,
    deleteForAll?: boolean
  ) => void;
  /** callback to handle Rich Text Actions */
  sendQuickReply: (text: string) => void;
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
  fetchNextPage,
  sendQuickReply
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
    threshold: 0
  });
  useEffect(() => {
    if (!isFetchingNextPage && inView && fetchNextPage && hasNextPage) {
      fetchNextPage();
    }
  }, [inView]);

  useWhyDidYouUpdate('ChatWindow', {
    self,
    activeChat,
    messages,
    gMapsApiKey,
    hasNextPage,
    isFetchingNextPage,
    clearUnreadNotifications,
    onMessageDelete,
    fetchNextPage,
    sendQuickReply
  });

  return (
    <ScrollArea
      w="full"
      h="full"
      flexGrow={1}
      px={3}
      backgroundColor={mode('card.light', 'pane.dark')}
    >
      {messages && messages.length > 0 ? (
        <List
          h="full"
          w="full"
          spacing={4}
          display="flex"
          flexDirection="column"
        >
          {isFetchingNextPage && (
            <ListItem>
              <HStack>
                <Spinner />
                <Text>Fetching older messages...</Text>
              </HStack>
            </ListItem>
          )}
          <ListItem ref={oldestMessage} />
          {messages.map((message: Message, index: number) => {
            const previousMessage = messages[index - 1];
            const showTime =
              previousMessage === undefined ||
              previousMessage.timeStamp.getDate() !==
                message.timeStamp.getDate() ||
              message.timeStamp.getTime() -
                previousMessage.timeStamp.getTime() >
                1000 * 60 * 10;
            return showTime ? (
              [
                <MotionListItem
                  key={message.timeStamp.getDate().toString()}
                  display="flex"
                  alignSelf="center"
                >
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
                    {message.timeStamp.getFullYear() !==
                    new Date().getFullYear()
                      ? ' ' + message.timeStamp.getFullYear()
                      : ''}
                  </Text>
                </MotionListItem>,
                <MessageItem
                  message={message}
                  key={index}
                  showTime={showTime}
                  gMapsApiKey={gMapsApiKey}
                  sendQuickReply={sendQuickReply}
                  onMessageDelete={onMessageDelete}
                  activeChat={activeChat}
                />
              ]
            ) : (
              <MessageItem
                message={message}
                key={index}
                showTime={showTime}
                gMapsApiKey={gMapsApiKey}
                sendQuickReply={sendQuickReply}
                onMessageDelete={onMessageDelete}
                activeChat={activeChat}
              />
            );
          })}

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
