import React from 'react';
import { Meta } from '@storybook/react/types-6-0';
import { Story } from '@storybook/react';
import SendMessage, { SendMessageProps } from './SendMessage';
import { Box, Center } from '@chakra-ui/react';

// export default {
//   title: 'Components/SendMessage',
//   component: SendMessage
// } as Meta;

// Create a master template for mapping args to render the Button component
const Template: Story<SendMessageProps> = args => (
  <Center height="100vh" width="100%">
    <Box width="50%">
      <SendMessage {...args} />
    </Box>
  </Center>
);

// Reuse that template for creating different stories
export const Send = Template.bind({});
Send.args = {
  isSending: false,
  onFileSelected: (file: File) => {
    console.log('File selected', file);
  },
  handleSend: (message: string) => {
    console.log('message to send:', message);
  }
};

export const SendWithAttachment = Template.bind({});
SendWithAttachment.args = {
  ...Send.args,
  attachment: {
    blobKey:
      'AMIfv94ZsDcJ55BAT5BAPqENpkuTFSuWfbp1WOO8MuBkmnPXGH_kJhMNzw-4ScpsjCDbmc7ZlM5tJMVCBvFZMyaAOcV0DL5t-OG4BKtDc9s6Hlw5FEEiuv0S7bCLdDybvdw9OP5vePeCTvtOhHBi02995kB1Iknn7qWdIN0SOAa61zaBzo-wUrlGgZKebjzCR4TTtrouKrs18O9ZwHcv7-zz2gRNjoKXupDgYot7u0cb2rZ6E5eUYJW1J9c5SklGOoXGpdewv0uq',
    name: 'Screenshot 2021-07-22 at 1.16.39 AM.png',
    size: 21832,
    contentType: 'application/pdf'
  }
};
