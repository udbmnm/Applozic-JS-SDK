import React from 'react';
import { Meta } from '@storybook/react/types-6-0';
import { Story } from '@storybook/react';
import ChatBubble, { ChatBubbleProps } from './ChatBubble';
import { MessageStatus } from '../../models/chat';

export default {
  title: 'Components/ChatBubble',
  component: ChatBubble
} as Meta;

// Create a master template for mapping args to render the Button component
const Template: Story<ChatBubbleProps> = args => <ChatBubble {...args} />;

// Reuse that template for creating different stories
// export const PendingSentMessage = Template.bind({});
// PendingSentMessage.args = {
//   message: {
//     key: '1aseq13123',
//     messageText:
//       'Lorem ipsum dolor sit amet, consectetur amet adipiscing elit. Aliquet suscipit nibh aliquet.',
//     isReply: true,
//     timeStamp: new Date(),
//     status: MessageStatus.PENDING
//   }
// };

// export const SentSentMessage = Template.bind({});
// SentSentMessage.args = {
//   message: {
//     key: '1aseq13123',
//     messageText:
//       'Lorem ipsum dolor sit amet, consectetur amet adipiscing elit. Aliquet suscipit nibh aliquet.',
//     isReply: true,
//     timeStamp: new Date(),
//     status: MessageStatus.SENT
//   }
// };

// export const DeliveredSentMessage = Template.bind({});
// DeliveredSentMessage.args = {
//   message: {
//     key: '1aseq13123',
//     messageText:
//       'Lorem ipsum dolor sit amet, consectetur amet adipiscing elit. Aliquet suscipit nibh aliquet.',
//     isReply: true,
//     timeStamp: new Date(),
//     status: MessageStatus.DELIVERED
//   }
// };

// export const ReadSentMessage = Template.bind({});
// ReadSentMessage.args = {
//   message: {
//     key: '1aseq13123',
//     messageText:
//       'Lorem ipsum dolor sit amet, consectetur amet adipiscing elit. Aliquet suscipit nibh aliquet.',
//     isReply: true,
//     timeStamp: new Date(),
//     status: MessageStatus.READ
//   }
// };

// export const RecievedMessageFrom = Template.bind({});
// RecievedMessageFrom.args = {
//   message: {
//     key: '1aseq13123',
//     messageText:
//       'Lorem ipsum dolor sit amet, consectetur amet adipiscing elit. Aliquet suscipit nibh aliquet.',
//     isReply: false,
//     from: {
//       name: 'Sidhant Panda',
//       imageUrl:
//         'https://pickaface.net/gallery/avatar/unr_random_180410_1905_z1exb.png'
//     },
//     timeStamp: new Date(),
//     status: MessageStatus.PENDING
//   }
// };

// export const RecievedMessage = Template.bind({});
// RecievedMessage.args = {
//   message: {
//     key: '1aseq13123',
//     messageText:
//       'Lorem ipsum dolor sit amet, consectetur amet adipiscing elit. Aliquet suscipit nibh aliquet.',
//     isReply: false,
//     timeStamp: new Date(),
//     status: MessageStatus.PENDING
//   }
// };

// export const RecievedLinkMessage = Template.bind({});
// RecievedLinkMessage.args = {
//   message: {
//     key: '1aseq13123',
//     messageText:
//       'fef fefe https://www.figma.com/file/PszlJBttTgaSoxRcup68pN/Applozic-UI-kit?node-id\u003d340%3A8955 ferfwq',
//     isReply: true,
//     timeStamp: new Date(),
//     status: MessageStatus.PENDING
//   }
// };

// export const SentImageMessage = Template.bind({});
// SentImageMessage.args = {
//   message: {
//     key: '1aseq13123',
//     messageText:
//       'Lorem ipsum dolor sit amet, consectetur amet adipiscing elit. Aliquet suscipit nibh aliquet.',
//     isReply: true,
//     timeStamp: new Date(),
//     status: MessageStatus.PENDING,
//     file: {
//       thumbnailUrl:
//         'https://lh3.googleusercontent.com/g6nmRvlvBP0kz-WprV-6AbyxE9ypgN1T0_nwrRWkfFudOb23r2mLlcl6zKCpIR9ctFD2FSK1vu5IiCM0-qhhcXRGPuUF-hoF\u003ds120',
//       blobKey:
//         'https://applozic.appspot.com/rest/ws/aws/file/AMIfv94ZsDcJ55BAT5BAPqENpkuTFSuWfbp1WOO8MuBkmnPXGH_kJhMNzw-4ScpsjCDbmc7ZlM5tJMVCBvFZMyaAOcV0DL5t-OG4BKtDc9s6Hlw5FEEiuv0S7bCLdDybvdw9OP5vePeCTvtOhHBi02995kB1Iknn7qWdIN0SOAa61zaBzo-wUrlGgZKebjzCR4TTtrouKrs18O9ZwHcv7-zz2gRNjoKXupDgYot7u0cb2rZ6E5eUYJW1J9c5SklGOoXGpdewv0uq',
//       name: 'Screenshot 2021-07-22 at 1.16.39 AM.png',
//       size: 21832,
//       contentType: 'application/pdf'
//     }
//   }
// };

// export const RecievedImageMessage = Template.bind({});
// RecievedImageMessage.args = {
//   message: {
//     key: '1aseq13123',
//     messageText:
//       'Lorem ipsum dolor sit amet, consectetur amet adipiscing elit. Aliquet suscipit nibh aliquet.',
//     isReply: false,
//     timeStamp: new Date(),
//     status: MessageStatus.PENDING,
//     file: {
//       thumbnailUrl:
//         'https://lh3.googleusercontent.com/g6nmRvlvBP0kz-WprV-6AbyxE9ypgN1T0_nwrRWkfFudOb23r2mLlcl6zKCpIR9ctFD2FSK1vu5IiCM0-qhhcXRGPuUF-hoF\u003ds120',
//       blobKey:
//         'https://applozic.appspot.com/rest/ws/aws/file/AMIfv94ZsDcJ55BAT5BAPqENpkuTFSuWfbp1WOO8MuBkmnPXGH_kJhMNzw-4ScpsjCDbmc7ZlM5tJMVCBvFZMyaAOcV0DL5t-OG4BKtDc9s6Hlw5FEEiuv0S7bCLdDybvdw9OP5vePeCTvtOhHBi02995kB1Iknn7qWdIN0SOAa61zaBzo-wUrlGgZKebjzCR4TTtrouKrs18O9ZwHcv7-zz2gRNjoKXupDgYot7u0cb2rZ6E5eUYJW1J9c5SklGOoXGpdewv0uq',
//       name: 'Screenshot 2021-07-22 at 1.16.39 AM.png',
//       size: 21832,
//       contentType: 'application/pdf'
//     }
//   }
// };

// export const SentDocMessage = Template.bind({});
// SentDocMessage.args = {
//   message: {
//     key: '1aseq13123',
//     messageText:
//       'Lorem ipsum dolor sit amet, consectetur amet adipiscing elit. Aliquet suscipit nibh aliquet.',
//     isReply: true,
//     timeStamp: new Date(),
//     status: MessageStatus.PENDING,
//     file: {
//       blobKey:
//         'https://applozic.appspot.com/rest/ws/aws/file/AMIfv94ZsDcJ55BAT5BAPqENpkuTFSuWfbp1WOO8MuBkmnPXGH_kJhMNzw-4ScpsjCDbmc7ZlM5tJMVCBvFZMyaAOcV0DL5t-OG4BKtDc9s6Hlw5FEEiuv0S7bCLdDybvdw9OP5vePeCTvtOhHBi02995kB1Iknn7qWdIN0SOAa61zaBzo-wUrlGgZKebjzCR4TTtrouKrs18O9ZwHcv7-zz2gRNjoKXupDgYot7u0cb2rZ6E5eUYJW1J9c5SklGOoXGpdewv0uq',
//       name: 'Screenshot 2021-07-22 at 1.16.39 AM.png',
//       size: 21832,
//       contentType: 'application/pdf'
//     }
//   }
// };

// export const ReceivedDocMessage = Template.bind({});
// ReceivedDocMessage.args = {
//   message: {
//     key: '1aseq13123',
//     messageText:
//       'Lorem ipsum dolor sit amet, consectetur amet adipiscing elit. Aliquet suscipit nibh aliquet.',
//     isReply: false,
//     timeStamp: new Date(),
//     status: MessageStatus.PENDING,
//     file: {
//       blobKey:
//         'https://applozic.appspot.com/rest/ws/aws/file/AMIfv94ZsDcJ55BAT5BAPqENpkuTFSuWfbp1WOO8MuBkmnPXGH_kJhMNzw-4ScpsjCDbmc7ZlM5tJMVCBvFZMyaAOcV0DL5t-OG4BKtDc9s6Hlw5FEEiuv0S7bCLdDybvdw9OP5vePeCTvtOhHBi02995kB1Iknn7qWdIN0SOAa61zaBzo-wUrlGgZKebjzCR4TTtrouKrs18O9ZwHcv7-zz2gRNjoKXupDgYot7u0cb2rZ6E5eUYJW1J9c5SklGOoXGpdewv0uq',
//       name: 'Screenshot 2021-07-22 at 1.16.39 AM.png',
//       size: 21832,
//       contentType: 'application/pdf'
//     }
//   }
// };
