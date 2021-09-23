import React from 'react';
import { Meta } from '@storybook/react/types-6-0';
import { Story } from '@storybook/react';
import ChatStatusBarComponent, {
  ChatStatusBarProps as ChatStatusBarProps
} from './ChatStatusBar';
export default {
  title: 'Components/ChatStatusBar',
  component: ChatStatusBarComponent,
  argTypes: {
    backgroundColor: { control: 'color' }
  }
} as Meta;

// Create a master template for mapping args to render the Button component
const Template: Story<ChatStatusBarProps> = args => (
  <ChatStatusBarComponent {...args} />
);

// Reuse that template for creating different stories
export const Online = Template.bind({});
Online.args = {
  isOnline: true
};

export const Offline = Template.bind({});
Offline.args = {
  isOnline: false,
  lastSeen: new Date(Date.now() - 12 * 60 * 60 * 1000)
};
