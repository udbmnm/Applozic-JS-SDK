import {
  Box,
  HStack,
  Image,
  Text,
  useColorModeValue,
  VStack
} from '@chakra-ui/react';
import React from 'react';
import Icon from '../Icon';

export interface GroupOptionsProps {
  onLeaveGroup?: () => void | Promise<void>;
  onDeleteGroup?: () => void | Promise<void>;
  onClearChat?: () => void | Promise<void>;
  isAdmin: boolean;
}

const GroupOptions = ({
  onLeaveGroup,
  onDeleteGroup,
  onClearChat,
  isAdmin
}: GroupOptionsProps) => {
  const clearChat = () => {
    if (onClearChat) {
      onClearChat();
    }
  };
  const leaveGroup = () => {
    if (onLeaveGroup) {
      onLeaveGroup();
    }
  };
  const deleteGroup = () => {
    if (onDeleteGroup) {
      onDeleteGroup();
    }
  };

  return (
    <VStack minWidth="200px" spacing={4} align="stretch">
      <Box>
        <Text fontSize="14px" fontWeight="400" color="textHeader.500">
          {'Privacy & Support'}
        </Text>
      </Box>
      <HStack onClick={leaveGroup}>
        <Icon
          icon="cancel"
          size={16}
          style={{ opacity: 0.6 }}
          color={useColorModeValue('#09021A', '#FFF')}
        />

        <Text
          color="textMain.700"
          fontSize="16px"
          fontWeight="400"
          style={{ marginLeft: '16px' }}
        >
          Exit Group
        </Text>
      </HStack>
      {isAdmin && (
        <HStack onClick={deleteGroup}>
          <Icon
            icon="delete"
            size={16}
            style={{ opacity: 0.6 }}
            color={useColorModeValue('#09021A', '#FFF')}
          />

          <Text
            color="textMain.700"
            fontSize="16px"
            fontWeight="400"
            style={{ marginLeft: '16px' }}
          >
            Delete Group
          </Text>
        </HStack>
      )}
    </VStack>
  );
};

export default GroupOptions;
