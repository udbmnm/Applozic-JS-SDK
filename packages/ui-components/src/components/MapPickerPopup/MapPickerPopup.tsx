import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Popover,
  PopoverArrow,
  PopoverContent,
  PopoverTrigger,
  useToast
} from '@chakra-ui/react';
import MapPicker, { Coords } from '../MapPicker';
import { CloseIcon } from '@chakra-ui/icons';
import useLocation from '../../hooks/utility/useLocation';
import Icon from '../Icon/';
import { MessageStatus } from '../../models/chat';

export interface MapPickerPopupProps {
  gMapsApiKey: string;
  onLocationSelected?: (pos: Coords) => void;
}

const MapPickerPopup = ({
  gMapsApiKey,
  onLocationSelected
}: MapPickerPopupProps) => {
  const {
    position,
    positionError,
    clearPositionError,
    getCurrentPosition
  } = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const close = () => setIsOpen(false);
  const toast = useToast();

  useEffect(() => {
    if (positionError) {
      // console.log('eefef', positionError);

      toast({
        title: 'Permission Error',
        description:
          'We could not determine your position. You can continue to use the map picker and search function',
        status: 'warning',
        duration: 4000,
        position: 'bottom',
        variant: 'left-accent',
        isClosable: true
      });
    }
    clearPositionError();
  }, [positionError]);

  const [center, setCenter] = useState({ lat: 37.7749, lng: -122.4194 });

  useEffect(() => {
    if (isOpen) {
      getCurrentPosition();
    }
  }, [isOpen]);

  useEffect(() => {
    if (position?.coords.latitude && position?.coords.longitude) {
      setCenter({
        lat: position.coords.latitude,
        lng: position.coords.longitude
      });
    }
  }, [position]);

  const onPositionSelect = (pos: Coords) => {
    if (onLocationSelected) {
      onLocationSelected(pos);
    }
    close();
  };
  return (
    <Popover
      placement="top-end"
      isOpen={isOpen}
      onClose={close}
      returnFocusOnClose={false}
      closeOnBlur={false}
    >
      <PopoverTrigger>
        <Box onClick={toggle} cursor="pointer">
          <Icon icon={'locations'} size={16} color={'textMain.400'} />
        </Box>
      </PopoverTrigger>
      <PopoverContent width="auto">
        <PopoverArrow />
        <Box width="408px" height="296px">
          <MapPicker
            gMapsApiKey={gMapsApiKey}
            defaultCenter={center}
            defaultZoom={12}
            onPositionSelect={onPositionSelect}
          />
        </Box>

        <CloseIcon
          bg="white"
          position="absolute"
          top="10px"
          right="10px"
          padding="4px"
          border="1px solid #ccc"
          color="accent.500"
          h="24px"
          w="24px"
          borderRadius="5px"
          cursor="pointer"
          onClick={close}
        ></CloseIcon>
      </PopoverContent>
    </Popover>
  );
};

export default MapPickerPopup;
