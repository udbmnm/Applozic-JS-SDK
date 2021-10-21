import React from 'react';
import {
  VStack,
  Box,
  Flex,
  Spacer,
  Divider,
  useColorModeValue as mode
} from '@chakra-ui/react';
import ChatDetailsMeta, {
  ChatDetailsMetaProps
} from '../../ChatDetails/ChatDetailsMeta';
import { CloseLight } from '../../../icons/Close';
import PictureAndName from '../../ChatDetails/PictureAndName';
import MotionBox from '../../MotionBox';

import ScrollArea from '../../ScrollArea';
import SelfOptions from './SelfOptions';

export interface SelfDetailProps {
  /** name of logged in user */
  name: string;
  /** image url of the logged in user */
  imageUrl?: string;
  /** a list of ChatDetail metadata like email, phone number */
  metaProps?: ChatDetailsMetaProps;
  /** Callback to handle the close action */
  onCloseClicked: () => void | Promise<void>;
  /** Callback to handle the logout action */
  onLogOutClicked: () => void | Promise<void>;
  /** Callback to handle update of any of the properties of the user eg: name, image etc */
  onUpdateValue: (
    key: string,
    value: string | undefined
  ) => void | Promise<void>;
}

const SelfDetails = ({
  name,
  imageUrl,
  metaProps,
  onCloseClicked,
  onLogOutClicked,
  onUpdateValue
}: SelfDetailProps) => {
  const onClose = () => {
    if (onCloseClicked) {
      onCloseClicked();
    }
  };
  const onLogOut = () => {
    if (onLogOutClicked) {
      onLogOutClicked();
    }
  };

  return (
    <MotionBox
      height="full"
      padding={0}
      width="350px"
      exit={{ x: '-101%' }}
      transition={{
        type: 'tween'
      }}
      ml={2}
      animate={{ x: 0 }}
      initial={{ x: '-101%' }}
      borderRadius={15}
      borderWidth={mode(1, 0)}
      borderColor="#E9E9E9"
      backgroundColor={mode('#FFFFFF', '#272528')}
    >
      <ScrollArea padding={5} width={'full'}>
        <VStack>
          <Flex width="100%">
            <Spacer />
            <Box onClick={onClose}>
              <CloseLight />
            </Box>
          </Flex>

          <Box style={{ marginTop: '38px' }}>
            <PictureAndName
              photoKey={'imageLink'}
              nameKey="displayName"
              photoUrl={imageUrl}
              name={name}
              isBlocked={false}
              isEditable={true}
              onUpdateValue={onUpdateValue}
            />
          </Box>

          <Divider color="#e9e9e9" style={{ marginTop: '20px' }} />

          {metaProps && (
            <>
              <Box width="100%" style={{ marginTop: '30px' }}>
                <ChatDetailsMeta
                  items={metaProps?.items ? metaProps.items : []}
                />
              </Box>
              <Divider color="#e9e9e9" style={{ marginTop: '20px' }} />
            </>
          )}
          <Spacer />
          <Box width="100%" style={{ marginTop: '20px' }}>
            <SelfOptions onLogOut={onLogOut} />
          </Box>
        </VStack>
      </ScrollArea>
    </MotionBox>
  );
};

export default SelfDetails;
