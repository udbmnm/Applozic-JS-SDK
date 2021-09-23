import React from 'react';
import { Meta } from '@storybook/react/types-6-0';
import { Story } from '@storybook/react';
import MapPickerPopupComponent, { MapPickerPopupProps } from './MapPickerPopup';
import { Center, Box } from '@chakra-ui/react';

export default {
  title: 'Components/MapPickerPopup',
  component: MapPickerPopupComponent
} as Meta;

// Create a master template for mapping args to render the Button component
const Template: Story<MapPickerPopupProps> = args => (
  <Box height="100vh" width="100%">
    <Center height="100%">
      <MapPickerPopupComponent {...args} />
    </Center>
  </Box>
);

// Reuse that template for creating different stories
export const Primary = Template.bind({});
Primary.args = { gMapsApiKey: 'AIzaSyBXW2LRG4ysc1Tt7i_Agj4RRCn2jScxox0' };
