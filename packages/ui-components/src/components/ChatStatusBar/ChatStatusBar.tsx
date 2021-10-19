import React from 'react';
import {
  Box,
  Center,
  HStack,
  Spacer,
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
  isOnline?: boolean;
  isTyping?: boolean;
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
      width="100%"
      borderColor="#E9E9E9"
      borderBottomWidth={1}
      backgroundColor={mode('#fff', '#1B191D')}
      paddingLeft={4}
      paddingTop={3}
      paddingBottom={3}
      h={'48px'}
    >
      {isOnline !== undefined && (
        <Center>
          <Square
            size="6px"
            borderRadius="full"
            bg={isOnline ? 'green.500' : 'grey'}
          ></Square>
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
