import React from "react";
import { Meta } from "@storybook/react/types-6-0";
import { Story } from "@storybook/react";
import ChatDetails, { ChatDetailProps } from "./ChatDetails";
import { Photos as PrimarySharedMedia } from "../SharedMedia/SharedMedia.stories";
// import sampleContactDp from "../../assets/images/sample-contact-dp.png";
import ChatDetailsMetaComponent, {
  ChatDetailsMetaProps,
} from "./ChatDetailsMeta";
import PictureAndNameComponent, { PictureAndNameProps } from "./PictureAndName";
import PrivacyAndSupportComponent, {
  PrivacyAndSupportProps,
} from "./PrivacyAndSupport";
import { MessageStatus } from "../../models/chat";

// export default {
//   title: "Components/Chat Details",
//   component: ChatDetails,
//   argTypes: {
//     backgroundColor: { control: "color" },
//   },
// } as Meta;

// Create a master template for mapping args to render the Button component
const Template: Story<ChatDetailProps> = (args) => <ChatDetails {...args} />;

const PictureAndNameTemplate: Story<PictureAndNameProps> = (args) => (
  <PictureAndNameComponent {...args} />
);

const ChatDetailsMetaTemplate: Story<ChatDetailsMetaProps> = (args) => (
  <ChatDetailsMetaComponent {...args} />
);

const PrivacyAndSupportTemplate: Story<PrivacyAndSupportProps> = (args) => (
  <PrivacyAndSupportComponent {...args} />
);

// Reuse that template for creating different stories
export const Primary = Template.bind({});
export const PictureAndName = PictureAndNameTemplate.bind({});
export const ChatDetailsMeta = ChatDetailsMetaTemplate.bind({});
export const PrivacyAndSupport = PrivacyAndSupportTemplate.bind({});

PictureAndName.args = {
  photoUrl: 'sampleContactDp',
  name: "John Doe",
};

ChatDetailsMeta.args = {
  items: [
    {
      header: "About",
      text:
        "Lorem ipsum dolor sit amet, consectetur amet amet, adipiscing elit. Aliquet suscipit nibh aliquet.",
    },
    {
      header: "E-mail",
      text: "example@gmail.com",
    },
    {
      header: "Phone",
      text: "+1 123-456-7890",
    },
  ],
};

Primary.args = {
  name: "Siddharth.V",
  imageUrl: 'sampleContactDp',
  metaProps: ChatDetailsMeta.args,
  // messageList: [
  //   {
  //     key: "4-null-1629930405232",
  //     messageText: "cool",
  //     fromUserId: "some-email-4@applozic.com",
  //     timeStamp: new Date("2021-08-25T22:26:45.252Z"),
  //     status: MessageStatus.RECEIVED,
  //     metadata: {
  //       webUiKey: "14e96af2-9307-47a2-9b1a-55ac30d8c731",
  //     },
  //     isReply: false,
  //     contentType: 0,
  //   },
  //   {
  //     key: "4-null-1629930753616",
  //     messageText: "123",
  //     fromUserId: "some-email-4@applozic.com",
  //     timeStamp: new Date("2021-08-25T22:32:33.632Z"),
  //     status: MessageStatus.RECEIVED,
  //     isReply: false,
  //     metadata: {
  //       webUiKey: "14e96af2-9307-47a2-9b1a-55ac30d8c731",
  //     },
  //     contentType: 0,
  //   },
  //   {
  //     key: "4-null-1630322290066",
  //     messageText: "123",
  //     fromUserId: "some-email-4@applozic.com",
  //     timeStamp: new Date("2021-08-25T22:32:33.632Z"),
  //     status: MessageStatus.RECEIVED,
  //     file: {
  //       blobKey:
  //         "AMIfv94V8jvdx-CFony9W3X2r6kbXyAlQLB-JnMXl1uANexDcyZP_JVr-k9V5-DOQeZiG6wINGicZEwOe1mN_Nf-BU4VlFCQaSwQ6LMn1ySwu1BI0tE7vBNhdVdHBX2CXVHe_1ETKpmk0IXeRw5l6X1kQ6zgJo8jgjKzlhxUlUTpE55A48TBQxlPV7x6KIlo5W0-iHnBLWH_vwKvY-cv87zWmIjd5fEURb9QbXpk3_5wcadbYZf3Nv1qV0osvdZBdogGqTBHex3p",
  //       name: "000_96P7A8-1.webp",
  //       size: 126366,
  //       contentType: "image/webp",
  //       thumbnailUrl:
  //         "https://lh3.googleusercontent.com/WYUU5uYbv9hVsPaKi8dhTjyVHaukdDawMgM70GDhy5DBfcmYcWxkHsGeTiremxNFSqLLj9cnWS94o_6ACCym2LT104FpD97m=s120",
  //     },
  //     isReply: false,
  //     metadata: {
  //       webUiKey: "14e96af2-9307-47a2-9b1a-55ac30d8c731",
  //     },
  //     contentType: 0,
  //   },
  //   {
  //     key: "4-null-1630322290066",
  //     messageText: "123",
  //     fromUserId: "some-email-4@applozic.com",
  //     timeStamp: new Date("2021-08-25T22:32:33.632Z"),
  //     status: MessageStatus.RECEIVED,
  //     file: {
  //       blobKey:
  //         "AMIfv94V8jvdx-CFony9W3X2r6kbXyAlQLB-JnMXl1uANexDcyZP_JVr-k9V5-DOQeZiG6wINGicZEwOe1mN_Nf-BU4VlFCQaSwQ6LMn1ySwu1BI0tE7vBNhdVdHBX2CXVHe_1ETKpmk0IXeRw5l6X1kQ6zgJo8jgjKzlhxUlUTpE55A48TBQxlPV7x6KIlo5W0-iHnBLWH_vwKvY-cv87zWmIjd5fEURb9QbXpk3_5wcadbYZf3Nv1qV0osvdZBdogGqTBHex3p",
  //       name: "000_96P7A8-1.webp",
  //       size: 126366,
  //       contentType: "image/webp",
  //       thumbnailUrl:
  //         "https://lh3.googleusercontent.com/WYUU5uYbv9hVsPaKi8dhTjyVHaukdDawMgM70GDhy5DBfcmYcWxkHsGeTiremxNFSqLLj9cnWS94o_6ACCym2LT104FpD97m=s120",
  //     },
  //     isReply: false,
  //     metadata: {
  //       webUiKey: "14e96af2-9307-47a2-9b1a-55ac30d8c731",
  //     },
  //     contentType: 0,
  //   },
  //   {
  //     key: "4-null-1630322290066",
  //     messageText: "123",
  //     fromUserId: "some-email-4@applozic.com",
  //     timeStamp: new Date("2021-08-25T22:32:33.632Z"),
  //     status: MessageStatus.RECEIVED,
  //     file: {
  //       blobKey:
  //         "AMIfv95mWr7J9rbTKg4BAzz6Ip4o6CQ3fhHJRF5U8J2AZnK6ePWRew3eVFtVYNOxTSR0b2ititPCRqjN6oQkKQJgqapdGSbwzuwUWbRGEXUizXLukY4F0yfopMjloephpp9qYo6ODFlGS_VWbIWIwOJeB7uUoBgoppSrcwvoAwnzKfQ2a0ccn6SgNmjmmphNXO9CPkqjsJiohilx8sAWrz9oATHwVNWZ44PoSvfGFGuavSpv1AetYZY0IZdVrBmkVo2qSfnCE9qR",
  //       contentType: "application/pdf",
  //       // key: "0f27dd2f-d72a-4681-b4de-7a8d4e0f637e",
  //       name:
  //         "Annex 2-Disposal Instruction for Handling Foreign Inward Remittances (1).docx.pdf",
  //       size: 68417,
  //     },
  //     isReply: false,
  //     metadata: {
  //       webUiKey: "14e96af2-9307-47a2-9b1a-55ac30d8c731",
  //     },
  //     contentType: 0,
  //   },
  // ],
  onBlockClicked: () => {
    console.log("onBlockClicked");
  },
  onChatClearClicked: () => {
    console.log("onChatClearClicked");
  },
  onCloseClicked: () => {
    console.log("onCloseClicked");
  },
};
