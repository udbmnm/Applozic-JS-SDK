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

const PluginViewWithoutBase = ({
  applicationId,
  giphyApiKey,
  gMapsApiKey,
  ...rest
}: ViewProps) => {
  const { onOpen, onClose, isOpen } = useDisclosure();
  const firstFieldRef = useRef(null);

  return (
    <Popover
      isLazy
      isOpen={isOpen}
      initialFocusRef={firstFieldRef}
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
            style={{ borderRadius: '50%' }}
            icon={<Icon icon="chat" color="black" size={24} />}
          />
        </PopoverTrigger>
      </Box>
      <PopoverContent
        w={400}
        maxH={'40%'}
        p={2}
        backgroundColor={mode('background.light', 'background.dark')}
      >
        <FocusLock returnFocus persistentFocus={false}>
          <PopoverArrow />
          <PopoverCloseButton />
          <ProvideApplozicClient
            applicationId={applicationId}
            giphyApiKey={giphyApiKey}
            gMapsApiKey={gMapsApiKey}
          >
            <PluginViewWithLogin {...rest} />
          </ProvideApplozicClient>
        </FocusLock>
      </PopoverContent>
    </Popover>
  );
};

export default PluginViewWithoutBase;
