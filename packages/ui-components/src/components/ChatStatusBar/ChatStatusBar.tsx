import React from 'react';
import {
  Center,
  HStack,
  Square,
  Text,
  useColorModeValue as mode
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import {
  getAmPm,
  getMinutesAgo,
  getMonthName,
  getReadableHours,
  getReadableMinutes,
  isToday,
  wasInLastHour,
  wasInThisYear
} from '../../time-utils';

export interface ChatStatusBarProps {
  /** `true` if user is online */
  isOnline?: boolean;
  /** `true` if user is typing */
  isTyping?: boolean;
  /** The `Date` of the timestamp of last seen message by the user */
  lastSeen?: Date;
}

const getTimeString = (lastSeen: Date) => {
  if (wasInLastHour(lastSeen)) {
    return `${getMinutesAgo(lastSeen)} minutes ago`;
  } else if (isToday(lastSeen)) {
    return `${getReadableHours(lastSeen)}:${getReadableMinutes(
      lastSeen
    )} ${getAmPm(lastSeen)}`;
  } else if (wasInThisYear(lastSeen)) {
    return `${getMonthName(lastSeen)} ${lastSeen.getDate()}`;
  }
  return `${getMonthName(
    lastSeen
  )} ${lastSeen.getDate()}, ${lastSeen.getFullYear()}`;
};

const ChatStatusBar = ({
  isOnline,
  isTyping,
  lastSeen
}: ChatStatusBarProps) => {
  return (
    <HStack
      w="full"
      flexShrink={0}
      borderColor="pane.light"
      borderBottomWidth={1}
      backgroundColor={mode('card.light', 'pane.dark')}
      paddingLeft={4}
      paddingTop={3}
      paddingBottom={3}
      marginBottom={3}
    >
      {isOnline !== undefined && (
        <Center>
          <Square
            size="6px"
            borderRadius="full"
            bg={isOnline ? 'green.500' : 'grey'}
          />
        </Center>
      )}
      {isTyping ? (
        <Text
          fontSize="14px"
          color="textHeader.500"
          fontWeight="400"
          fontStyle="italic"
        >
          typing...
        </Text>
      ) : isOnline ? (
        <Text fontSize="14px" color="textHeader.500" fontWeight="400">
          online
        </Text>
      ) : (
        lastSeen && (
          <Text fontSize="14px" color="textHeader.500" fontWeight="400">
            {getTimeString(lastSeen)}
          </Text>
        )
      )}
    </HStack>
  );
};

export default ChatStatusBar;
