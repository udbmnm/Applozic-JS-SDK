import React from 'react';
import { Meta } from '@storybook/react/types-6-0';
import { Story } from '@storybook/react';
import MapPicker, { MapPickerProps } from './';
import { Box, Center } from '@chakra-ui/react';

// export default {
//   title: 'Components/MapPicker',
//   component: MapPicker,
//   argTypes: {
//     backgroundColor: { control: 'color' }
//   }
// } as Meta;

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
  defaultZoom: 13
};
