import React from 'react';
import { Meta } from '@storybook/react/types-6-0';
import { Story } from '@storybook/react';
import {
  EmojiPicker,
  BOTTOM_CATEGORIES,
  EmojiPickerProps,
  EMOJI_CATEGORY,
  EmojiPopupProps,
  EmojiPopup as EmojiPopupComponent
} from '../src';
import { Box, Center } from '@chakra-ui/react';

export default {
  title: 'Core/EmojiPicker',
  component: EmojiPicker,
  argTypes: {
    backgroundColor: { control: 'color' },
    defaultSearchText: { control: 'text' }
  }
} as Meta;

// Create a master template for mapping args to render the Button component
const Template: Story<EmojiPickerProps> = args => <EmojiPicker {...args} />;

// Reuse that template for creating different stories
export const Smileys = Template.bind({});
Smileys.args = {
  giphyApiKey: 'CBATnkyl4HPNGTSyBTN6PcFQTVozxLpM',
  defaultCategory: EMOJI_CATEGORY.SMILEYS,
  onEmojiSelected: item => {
    console.log(item);
  }
};

export const GifSearch = Template.bind({});
GifSearch.args = {
  giphyApiKey: 'CBATnkyl4HPNGTSyBTN6PcFQTVozxLpM',
  defaultSearchText: 'everything is awesome',
  defaultBottomCategory: BOTTOM_CATEGORIES.GIF
};

export const RecentEmojis = Template.bind({});
RecentEmojis.args = {
  giphyApiKey: 'CBATnkyl4HPNGTSyBTN6PcFQTVozxLpM',
  defaultBottomCategory: BOTTOM_CATEGORIES.RECENT
};

const Template2: Story<EmojiPopupProps> = args => (
  <Box height="100vh" width="100%">
    <Center height="100%">
      <EmojiPopupComponent {...args} />
    </Center>
  </Box>
);

// Reuse that template for creating different stories
export const EmojiPopup = Template2.bind({});
EmojiPopup.args = { giphyApiKey: 'CBATnkyl4HPNGTSyBTN6PcFQTVozxLpM' };
