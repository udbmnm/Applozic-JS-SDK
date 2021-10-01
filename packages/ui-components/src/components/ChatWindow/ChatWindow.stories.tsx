import React from "react";
import { Meta } from "@storybook/react/types-6-0";
import { Story } from "@storybook/react";
import { MessageStatus } from "../../models/chat";
import ChatWindow from ".";
import { ChatWindowProps } from "./ChatWindow";

// export default {
//   title: "Components/ChatWindow",
//   component: ChatWindow,
// } as Meta;

// Create a master template for mapping args to render the Button component
const Template: Story<ChatWindowProps> = (args) => <ChatWindow {...args} />;

// Reuse that template for creating different stories
export const ChatWindowIdle = Template.bind({});
ChatWindowIdle.args = {
  messages: [
    {
      key: "zslkjq23asd",
      fromUserId: "1aseq13123",
      messageText: "Hi there! How are you doing?",
      isReply: true,
      timeStamp: new Date(),
      status: MessageStatus.READ,
    },
    {
      key: "asdfljase231",
      fromUserId: "1aseq13123",
      messageText: "I'm fine how are you?",
      isReply: false,
      timeStamp: new Date(),
    },
    {
      key: "zslkjq23asd",
      fromUserId: "1aseq13123",
      messageText: "It's been a long time",
      isReply: false,
      timeStamp: new Date(),
    },
    {
      key: "zslkjq23asd",
      fromUserId: "1aseq13123",
      messageText:
        "Lorem ipsum dolor sit amet, consectetur amet adipiscing elit. Aliquet suscipit nibh aliquet.",
      isReply: true,
      timeStamp: new Date(),
      status: MessageStatus.PENDING,
      file: {
        blobKey:
          "https://applozic.appspot.com/rest/ws/aws/file/AMIfv94ZsDcJ55BAT5BAPqENpkuTFSuWfbp1WOO8MuBkmnPXGH_kJhMNzw-4ScpsjCDbmc7ZlM5tJMVCBvFZMyaAOcV0DL5t-OG4BKtDc9s6Hlw5FEEiuv0S7bCLdDybvdw9OP5vePeCTvtOhHBi02995kB1Iknn7qWdIN0SOAa61zaBzo-wUrlGgZKebjzCR4TTtrouKrs18O9ZwHcv7-zz2gRNjoKXupDgYot7u0cb2rZ6E5eUYJW1J9c5SklGOoXGpdewv0uq",
        name: "Screenshot 2021-07-22 at 1.16.39 AM.png",
        size: 21832,
        contentType: "application/pdf",
      },
    },
    {
      key: "zslkjq23asd",
      fromUserId: "1aseq13123",
      messageText:
        "Lorem ipsum dolor sit amet, consectetur amet adipiscing elit. Aliquet suscipit nibh aliquet.",
      isReply: false,
      timeStamp: new Date(),
      status: MessageStatus.PENDING,
      file: {
        blobKey:
          "https://applozic.appspot.com/rest/ws/aws/file/AMIfv94ZsDcJ55BAT5BAPqENpkuTFSuWfbp1WOO8MuBkmnPXGH_kJhMNzw-4ScpsjCDbmc7ZlM5tJMVCBvFZMyaAOcV0DL5t-OG4BKtDc9s6Hlw5FEEiuv0S7bCLdDybvdw9OP5vePeCTvtOhHBi02995kB1Iknn7qWdIN0SOAa61zaBzo-wUrlGgZKebjzCR4TTtrouKrs18O9ZwHcv7-zz2gRNjoKXupDgYot7u0cb2rZ6E5eUYJW1J9c5SklGOoXGpdewv0uq",
        name: "Screenshot 2021-07-22 at 1.16.39 AM.png",
        size: 21832,
        contentType: "application/pdf",
      },
    },
    {
      key: "zslkjq23asd",
      fromUserId: "1aseq13123",
      messageText:
        "Message with a link: https://www.figma.com/file/PszlJBttTgaSoxRcup68pN/Applozic-UI-kit?node-id=65%3A4719",
      isReply: false,
      timeStamp: new Date(),
      status: MessageStatus.PENDING,
    },
    {
      key: "zslkjq23asd",
      fromUserId: "1aseq13123",
      messageText: "Hi there! How are you doing?",
      isReply: true,
      timeStamp: new Date(),
      status: MessageStatus.READ,
    },
  ],
};

export const ChatWindowTyping = Template.bind({});
ChatWindowTyping.args = {
  messages: [
    {
      key: "zslkjq23asd",
      fromUserId: "1aseq13123",
      messageText: "Cursus consequat lorem massa.",
      isReply: true,
      timeStamp: new Date(),
      status: MessageStatus.READ,
    },
    {
      key: "zslkjq23asd",
      fromUserId: "1aseq13123",
      messageText:
        "Lorem ipsum dolor sit amet, consectetur amet adipiscing elit. Aliquet suscipit nibh aliquet.",
      isReply: false,
      timeStamp: new Date(),
    },
    {
      key: "zslkjq23asd",
      fromUserId: "1aseq13123",
      messageText:
        "Lorem ipsum dolor sit amet, consectetur amet et amet, est umed adipiscing elit.",
      isReply: false,
      timeStamp: new Date(),
    },
  ],
};
