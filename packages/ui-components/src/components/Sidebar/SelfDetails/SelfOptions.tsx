import {
  Box,
  HStack,
  Image,
  Text,
  useColorModeValue,
  VStack
} from '@chakra-ui/react';
import React from 'react';
import Icon from '../../Icon';

export interface SelfOptionsProps {
  onLogOut?: () => void | Promise<void>;
}

const SelfOptions = ({ onLogOut }: SelfOptionsProps) => {
  const logOut = () => {
    if (onLogOut) {
      onLogOut();
    }
  };

  return (
    <VStack minWidth="200px" spacing={4} align="stretch">
      <HStack onClick={logOut}>
        <Icon
          icon="logout"
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
          Log Out
        </Text>
      </HStack>
    </VStack>
  );
};

export default SelfOptions;
