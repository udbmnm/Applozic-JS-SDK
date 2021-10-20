import { Box, Center } from '@chakra-ui/react';
import { Story } from '@storybook/react';
import { Meta } from '@storybook/react/types-6-0';
import React from 'react';
import { MapPickerPopup, MapPickerPopupProps } from '../src';

export default {
  title: 'Core/MapPickerPopup',
  component: MapPickerPopup
} as Meta;

const PopupTemplate: Story<MapPickerPopupProps> = args => (
  <Box height="100vh" width="100%">
    <Center height="100%">
      <MapPickerPopup {...args} />
    </Center>
  </Box>
);

// Reuse that template for creating different stories
export const Popup = PopupTemplate.bind({});
Popup.args = {
  gMapsApiKey: 'AIzaSyBXW2LRG4ysc1Tt7i_Agj4RRCn2jScxox0',
  onPositionSelect: pos => {
    alert(`You selected ${JSON.stringify(pos)}`);
  }
};
