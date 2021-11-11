import { HStack, VStack, Spacer, Box, Text, Avatar } from '@chakra-ui/react';
import { AnimationControls } from 'framer-motion';
import React, { useState } from 'react';
import { getNameFromGroup, getNameFromUser } from '@applozic/core-sdk';
import useGetUserInfo from '../../../hooks/queries/useGetUserInfo';
import { ChatType, Message, MessageStatus } from '../../../models/chat';
import { RecentChat } from '../../../models/chat';
import {
  isToday,
  getAmPm,
  wasInPast7Days,
  dayOfWeek,
  wasInThisYear,
  getMonthName,
  getReadableHours,
  getReadableMinutes
} from '../../../time-utils';
import MotionBox from '../../MotionBox';
import useGetGroupInfo from '../../../hooks/queries/useGetGroupInfo';
import { useQuery } from 'react-query';
import { useUnreadCount } from '../../../hooks/queries/useGetUnreadCount';
import MessageStatusIcon from '../../Icon/MessageStatusIcon';
import ChevronHover from '../../ChevronHover';

const getTimeStamp = (date: Date) => {
  if (isToday(date)) {
    return `${getReadableHours(date)}:${getReadableMinutes(date)} ${getAmPm(
      date
    )}`;
  } else if (wasInPast7Days(date)) {
    return dayOfWeek(date);
  } else if (wasInThisYear(date)) {
    return `${getMonthName(date)} ${date.getDate()}`;
  }
  return `${getMonthName(date)} ${date.getDate()}, ${date.getFullYear()}`;
};

interface IRecentChatItem {
  recentChat: RecentChat;
  controls?: AnimationControls;
  onClick: () => void;
  onClearChat: () => void;
}
const RecentChatItem = ({
  recentChat,
  controls,
  onClearChat,
  onClick
}: IRecentChatItem) => {
  const { data: user } = useGetUserInfo(
    recentChat.contactId,
    recentChat.chatType === ChatType.USER
  );
  const { data: group } = useGetGroupInfo(
    recentChat.contactId,
    recentChat.chatType === ChatType.GROUP
  );
  const { unreadCount } = useUnreadCount(recentChat.contactId);

  const name = user
    ? getNameFromUser(user)
    : group
    ? getNameFromGroup(group)
    : '';

  const imageUrl = user?.imageLink || group?.imageUrl || '';

  const { data: messages } = useQuery<Message[]>([
    'messages-local',
    recentChat.contactId
  ]);

  const lastMessage =
    messages && messages.length > 0 ? messages[messages.length - 1] : null;
  const [hovered, sethovered] = useState(false);
  let messageText = '';
  try {
    if (lastMessage?.messageText) {
      messageText = JSON.parse(lastMessage?.messageText);
      messageText = 'Location Shared';
    }
  } catch (e) {
    if (lastMessage?.messageText) {
      messageText = lastMessage?.messageText;
    } else {
      if (lastMessage?.file) {
        messageText = 'Audio Message Sent';
      }
    }
  }

  const chevronItems = [
    {
      label: 'Delete Conversation',
      onClick: onClearChat
    }
  ];

  return (
    <HStack
      key={recentChat.contactId}
      cursor="pointer"
      width={'full'}
      onClick={onClick}
      display={'flex'}
      alignItems="center"
      mb={2}
      justifyContent="center"
      onMouseEnter={() => sethovered(true)}
      onMouseLeave={() => sethovered(false)}
    >
      <Avatar src={imageUrl} height={9} width={9} name={name} />
      <MotionBox
        animate={controls}
        variants={{
          open: { opacity: 1, display: 'flex', flex: 1 },
          closed: { opacity: 0, display: 'none', flex: 0 }
        }}
        initial="open"
        transition={{ type: 'tween' }}
        flex={1}
        ml={2}
      >
        <VStack spacing={0} alignItems="flex-start">
          <Text fontSize="14px" color="textMain.700">
            {name}
          </Text>
          <HStack>
            {lastMessage?.status &&
              lastMessage.status !== MessageStatus.RECEIVED && (
                <MessageStatusIcon
                  color="textMain.400"
                  status={lastMessage.status}
                />
              )}
            <Text fontSize="11px" color="textMain.400" noOfLines={1}>
              {messageText}
            </Text>
          </HStack>
        </VStack>
        <Spacer />
        <VStack alignItems="flex-end" width="120px">
          <Text fontSize="11px" color="textHeader.500">
            {lastMessage ? getTimeStamp(lastMessage.timeStamp) : ''}
          </Text>
          <HStack>
            {unreadCount && (
              <Box
                bg="brand.primary"
                borderRadius="full"
                paddingLeft="6px"
                paddingRight="6px"
              >
                <Text color="white" fontSize="12px">
                  {unreadCount}
                </Text>
              </Box>
            )}
            <ChevronHover hovered={hovered} items={chevronItems} />
          </HStack>
        </VStack>
      </MotionBox>
    </HStack>
  );
};

export default RecentChatItem;
