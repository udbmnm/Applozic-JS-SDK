import { WarningIcon } from '@chakra-ui/icons';
import { HStack, VStack, Spacer, Box, Text, Avatar } from '@chakra-ui/react';
import { AnimationControls } from 'framer-motion';
import React from 'react';
import MotionBox from '../../MotionBox';
import { User } from '@applozic/core-sdk';

const ContactItem = ({
  user,
  onClick,
  controls
}: {
  user: User;
  onClick: () => void;
  controls?: AnimationControls;
}) => {
  return (
    <HStack
      key={user.userId}
      cursor="pointer"
      width={'100%'}
      onClick={onClick}
      display={'flex'}
      alignItems="center"
      mb={2}
      justifyContent="center"
    >
      <Avatar
        src={user.imageLink}
        height={9}
        width={9}
        name={user.userName ?? user.email ?? user.userId}
      />
      <MotionBox
        animate={controls}
        variants={{
          open: { opacity: 1, visibility: 'initial' },
          closed: { opacity: 0, visibility: 'hidden' }
        }}
        transition={{ type: 'tween' }}
        flex={1}
        display={'flex'}
        ml={2}
      >
        <VStack spacing={0} alignItems="flex-start">
          <Text fontSize="14px" color="textMain.700">
            {user.userName ?? user.email ?? user.userId}
          </Text>
        </VStack>
      </MotionBox>
    </HStack>
  );
};

export default ContactItem;
