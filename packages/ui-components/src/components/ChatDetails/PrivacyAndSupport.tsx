import {
  Box,
  HStack,
  Image,
  Text,
  useColorModeValue,
  VStack
} from '@chakra-ui/react';
import React from 'react';
import { ReportIcon } from '../../icons/ReportIcon';
import { StopIcon } from '../../icons/StopIcon';
import { BinIcon } from '../../icons/BinIcon';
import Icon from '../Icon';

export interface PrivacyAndSupportProps {
  onChatClear?: () => void | Promise<void>;
  onBlockUser?: () => void | Promise<void>;
}

const PrivacyAndSupport = ({
  onChatClear,
  onBlockUser
}: PrivacyAndSupportProps) => {
  const clearChat = () => {
    if (onChatClear) {
      onChatClear();
    }
  };
  const blockUser = () => {
    if (onBlockUser) {
      onBlockUser();
    }
  };

  return (
    <VStack minWidth="200px" spacing={4} align="stretch">
      <Box>
        <Text fontSize="14px" fontWeight="400" color="textHeader.500">
          {'Privacy & Support'}
        </Text>
      </Box>
      {/* <HStack onClick={clearChat}>
        <Icon
          icon="delete"
          size={16}
          style={{ opacity: 0.6 }}
          color={useColorModeValue("#09021A", "#FFF")}
        />
        <Text
          color="textMain.700"
          fontSize="16px"
          fontWeight="400"
          style={{ marginLeft: "16px" }}
        >
          Clear Chat
        </Text>
      </HStack> */}
      <HStack onClick={blockUser}>
        <Icon icon="cancel" size={16} style={{ opacity: 0.6 }} />

        <Text
          color="textMain.700"
          fontSize="16px"
          fontWeight="400"
          style={{ marginLeft: '16px' }}
        >
          Block User
        </Text>
      </HStack>
    </VStack>
  );
};

export default PrivacyAndSupport;
