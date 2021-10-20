import { AddIcon } from '@chakra-ui/icons';
import { HStack, Text, Avatar } from '@chakra-ui/react';
import { AnimationControls } from 'framer-motion';
import React, { useRef } from 'react';
import MotionBox from '../../MotionBox';

function AddGroup({
  onClick,
  controls
}: {
  onClick: () => void;
  controls?: AnimationControls;
}) {
  return (
    <HStack
      cursor="pointer"
      width={'100%'}
      onClick={onClick}
      spacing={2}
      mb={2}
      display={'flex'}
      alignItems="center"
      justifyContent="center"
    >
      <Avatar
        icon={<AddIcon color={'white'} />}
        background={'primary.500'}
        height={9}
        width={9}
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
        <Text fontSize="14px" color="textMain.700">
          Create a group
        </Text>
      </MotionBox>
    </HStack>
  );
}

export default AddGroup;
