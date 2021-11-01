import React from 'react';
import { Meta } from '@storybook/react/types-6-0';
import { Story } from '@storybook/react';
import { ChatPanelWired, ActiveChat } from '../src';

export default {
  title: 'WiredComponents/ChatPanel',
  component: ChatPanelWired
} as Meta;

// Create a master template for mapping args to render the Button component
const Template: Story<{ activeChat: ActiveChat }> = args => (
  <ChatPanelWired {...args} />
);

// Reuse that template for creating different stories
export const Default = Template.bind({});
Default.args = {
  activeChat: {
    user: {
      active: true,
      connected: true,
      connectedClientCount: 0,
      createdAtTime: new Date().getTime(),
      deactivated: false,
      email: 'Test@mail.com',
      lastLoggedInAtTime: new Date().getTime(),
      lastSeenAtTime: new Date().getTime(),
      metadata: {},
      roleKey: '1',
      roleType: 1,
      status: 1,
      unreadCount: 0,
      userId: 'test',
      userName: 'john_doe',
      displayName: 'John Doe',
      connectedLastSeenTime: new Date().getTime()
    }
  }
};
