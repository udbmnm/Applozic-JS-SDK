import { AddIcon } from '@chakra-ui/icons';
import { HStack, Text, Avatar } from '@chakra-ui/react';
import { AnimationControls } from 'framer-motion';
import React, { useRef } from 'react';
import MotionBox from '../../MotionBox';

function AddContact({
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
      display={'flex'}
      alignItems="center"
      justifyContent="center"
    >
      <Avatar
        icon={<AddIcon color={'white'} />}
        background={'brand.primary'}
        height={9}
        width={9}
      />
      <MotionBox
        animate={controls}
        variants={{
          open: { opacity: 1, display: 'flex', flex: 1 },
          closed: { opacity: 0, display: 'none', flex: 0 }
        }}
        transition={{ type: 'tween' }}
        ml={2}
      >
        <Text fontSize="14px" color="textMain.700">
          Create a contact
        </Text>
      </MotionBox>
    </HStack>
  );
}

export default AddContact;
