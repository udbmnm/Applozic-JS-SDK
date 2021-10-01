import React from 'react';
import { Meta } from '@storybook/react/types-6-0';
import { Story } from '@storybook/react';
import EmojiPopupComponent, { EmojiPopupProps } from './EmojiPopup';
import { Center, Box } from '@chakra-ui/react';

// export default {
//   title: 'Components/EmojiPopup',
//   component: EmojiPopupComponent
// } as Meta;

// Create a master template for mapping args to render the Button component
const Template: Story<EmojiPopupProps> = args => (
  <Box height="100vh" width="100%">
    <Center height="100%">
      <EmojiPopupComponent {...args} />
    </Center>
  </Box>
);

// Reuse that template for creating different stories
export const EmojiPopup = Template.bind({});
EmojiPopup.args = { giphyApiKey: 'CBATnkyl4HPNGTSyBTN6PcFQTVozxLpM' };
