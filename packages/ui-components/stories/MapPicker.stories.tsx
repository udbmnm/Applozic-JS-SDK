import { Box, Center } from '@chakra-ui/react';
import { Story } from '@storybook/react';
import { Meta } from '@storybook/react/types-6-0';
import React from 'react';
import { MapPicker, MapPickerProps } from '../src';

export default {
  title: 'Core/MapPicker',
  component: MapPicker
} as Meta;

// Create a master template for mapping args to render the Button component
const Template: Story<MapPickerProps> = args => (
  <Center h="100%" w="100%">
    <Box height="50vh" width="50vw">
      <MapPicker {...args} />
    </Box>
  </Center>
);

// Reuse that template for creating different stories
export const Primary = Template.bind({});
Primary.args = {
  gMapsApiKey: 'AIzaSyBXW2LRG4ysc1Tt7i_Agj4RRCn2jScxox0',
  defaultCenter: { lat: 37.7749, lng: -122.4194 },
  defaultZoom: 13,
  onPositionSelect: pos => {
    alert(`You selected ${JSON.stringify(pos)}`);
  }
};
