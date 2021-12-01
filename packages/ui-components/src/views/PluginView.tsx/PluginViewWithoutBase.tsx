import React from 'react';
import { ProvideApplozicClient } from '../../providers/useApplozicClient';
import { ViewProps } from '../ViewProps';
import PluginViewWithLogin from './PluginViewWithLogin';
import { useRef } from 'react';
import {
  IconButton,
  Popover,
  PopoverArrow,
  PopoverCloseButton,
  PopoverContent,
  PopoverTrigger,
  Box,
  useColorModeValue as mode,
  useDisclosure
} from '@chakra-ui/react';
import FocusLock from 'react-focus-lock';
import { Icon } from '../..';

export interface PluginViewWithoutBaseProps extends ViewProps {
  /** load the chat application lazyly, this will improve performance of your application but will add a short loading delay*/
  isLazy: boolean;
}

const PluginViewWithoutBase = ({
  applicationId,
  giphyApiKey,
  gMapsApiKey,
  isLazy,
  ...rest
}: PluginViewWithoutBaseProps) => {
  const { onOpen, onClose, isOpen } = useDisclosure();
  // const firstFieldRef = useRef(null);

  return (
    <Popover
      isLazy={isLazy}
      lazyBehavior="keepMounted"
      isOpen={isOpen}
      onOpen={onOpen}
      onClose={onClose}
      placement="top"
      closeOnBlur={false}
    >
      <Box position={'fixed'} right={4} bottom={4}>
        <PopoverTrigger>
          <IconButton
            aria-label="edit"
            size="lg"
            backgroundColor="brand.primary"
            style={{ borderRadius: '50%' }}
            icon={<Icon icon="chat" color="white" size={24} />}
          />
        </PopoverTrigger>
      </Box>
      <PopoverContent
        w={350}
        p={0}
        borderRadius={15}
        backgroundColor={mode('container.light', 'container.dark')}
      >
        {/* <FocusLock returnFocus persistentFocus={false}> */}
        <PopoverArrow />
        <ProvideApplozicClient
          applicationId={applicationId}
          giphyApiKey={giphyApiKey}
          gMapsApiKey={gMapsApiKey}
        >
          <PluginViewWithLogin {...rest} />
        </ProvideApplozicClient>
        {/* </FocusLock> */}
      </PopoverContent>
    </Popover>
  );
};

export default PluginViewWithoutBase;
