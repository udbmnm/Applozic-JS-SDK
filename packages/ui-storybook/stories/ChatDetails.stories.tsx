import React from "react";
import { Meta } from "@storybook/react/types-6-0";
import { Story } from "@storybook/react";
import {
  ChatType,
  MessageStatus,
  ChatDetails,
  ChatDetailProps,
  ChatDetailsMeta,
  ChatDetailsMetaProps,
  PictureAndName,
  PictureAndNameProps,
  PrivacyAndSupport,
  PrivacyAndSupportProps,
} from "@applozic/ui-components";
import { UserRoles } from "@applozic/core-sdk";

export default {
  title: "Components/Chat Details",
  component: ChatDetails,
} as Meta;

// Create a master template for mapping args to render the Button component
const Template: Story<ChatDetailProps> = (args) => <ChatDetails {...args} />;

const PictureAndNameTemplate: Story<PictureAndNameProps> = (args) => (
  <PictureAndName {...args} />
);

const ChatDetailsMetaTemplate: Story<ChatDetailsMetaProps> = (args) => (
  <ChatDetailsMeta {...args} />
);

const PrivacyAndSupportTemplate: Story<PrivacyAndSupportProps> = (args) => (
  <PrivacyAndSupport {...args} />
);

// Reuse that template for creating different stories
export const DeafaultPictureAndName = PictureAndNameTemplate.bind({});
export const DeafaultChatDetailsMeta = ChatDetailsMetaTemplate.bind({});
export const DeafaultPrivacyAndSupport = PrivacyAndSupportTemplate.bind({});

DeafaultPictureAndName.args = {
  photoUrl: "sampleContactDp",
  name: "John Doe",
};

DeafaultChatDetailsMeta.args = {
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

export const User = Template.bind({});

User.args = {
  title: "Siddharth.V",
  imageUrl: "sampleContactDp",
  metaProps: DeafaultChatDetailsMeta.args,
  type: ChatType.USER,
  messages: [
    {
      key: "4-null-1629930405232",
      messageText: "cool",
      fromUserId: "some-email-4@applozic.com",
      timeStamp: new Date("2021-08-25T22:26:45.252Z"),
      status: MessageStatus.RECEIVED,
      metadata: {
        webUiKey: "14e96af2-9307-47a2-9b1a-55ac30d8c731",
      },
      isReply: false,
      contentType: 0,
    },
    {
      key: "4-null-1629930753616",
      messageText: "123",
      fromUserId: "some-email-4@applozic.com",
      timeStamp: new Date("2021-08-25T22:32:33.632Z"),
      status: MessageStatus.RECEIVED,
      isReply: false,
      metadata: {
        webUiKey: "14e96af2-9307-47a2-9b1a-55ac30d8c731",
      },
      contentType: 0,
    },
    {
      key: "4-null-1630322290066",
      messageText: "123",
      fromUserId: "some-email-4@applozic.com",
      timeStamp: new Date("2021-08-25T22:32:33.632Z"),
      status: MessageStatus.RECEIVED,
      file: {
        blobKey:
          "AMIfv94V8jvdx-CFony9W3X2r6kbXyAlQLB-JnMXl1uANexDcyZP_JVr-k9V5-DOQeZiG6wINGicZEwOe1mN_Nf-BU4VlFCQaSwQ6LMn1ySwu1BI0tE7vBNhdVdHBX2CXVHe_1ETKpmk0IXeRw5l6X1kQ6zgJo8jgjKzlhxUlUTpE55A48TBQxlPV7x6KIlo5W0-iHnBLWH_vwKvY-cv87zWmIjd5fEURb9QbXpk3_5wcadbYZf3Nv1qV0osvdZBdogGqTBHex3p",
        name: "000_96P7A8-1.webp",
        size: 126366,
        contentType: "image/webp",
        thumbnailUrl:
          "https://lh3.googleusercontent.com/WYUU5uYbv9hVsPaKi8dhTjyVHaukdDawMgM70GDhy5DBfcmYcWxkHsGeTiremxNFSqLLj9cnWS94o_6ACCym2LT104FpD97m=s120",
      },
      isReply: false,
      metadata: {
        webUiKey: "14e96af2-9307-47a2-9b1a-55ac30d8c731",
      },
      contentType: 0,
    },
    {
      key: "4-null-1630322290066",
      messageText: "123",
      fromUserId: "some-email-4@applozic.com",
      timeStamp: new Date("2021-08-25T22:32:33.632Z"),
      status: MessageStatus.RECEIVED,
      file: {
        blobKey:
          "AMIfv94V8jvdx-CFony9W3X2r6kbXyAlQLB-JnMXl1uANexDcyZP_JVr-k9V5-DOQeZiG6wINGicZEwOe1mN_Nf-BU4VlFCQaSwQ6LMn1ySwu1BI0tE7vBNhdVdHBX2CXVHe_1ETKpmk0IXeRw5l6X1kQ6zgJo8jgjKzlhxUlUTpE55A48TBQxlPV7x6KIlo5W0-iHnBLWH_vwKvY-cv87zWmIjd5fEURb9QbXpk3_5wcadbYZf3Nv1qV0osvdZBdogGqTBHex3p",
        name: "000_96P7A8-1.webp",
        size: 126366,
        contentType: "image/webp",
        thumbnailUrl:
          "https://lh3.googleusercontent.com/WYUU5uYbv9hVsPaKi8dhTjyVHaukdDawMgM70GDhy5DBfcmYcWxkHsGeTiremxNFSqLLj9cnWS94o_6ACCym2LT104FpD97m=s120",
      },
      isReply: false,
      metadata: {
        webUiKey: "14e96af2-9307-47a2-9b1a-55ac30d8c731",
      },
      contentType: 0,
    },
    {
      key: "4-null-1630322290066",
      messageText: "123",
      fromUserId: "some-email-4@applozic.com",
      timeStamp: new Date("2021-08-25T22:32:33.632Z"),
      status: MessageStatus.RECEIVED,
      file: {
        blobKey:
          "AMIfv95mWr7J9rbTKg4BAzz6Ip4o6CQ3fhHJRF5U8J2AZnK6ePWRew3eVFtVYNOxTSR0b2ititPCRqjN6oQkKQJgqapdGSbwzuwUWbRGEXUizXLukY4F0yfopMjloephpp9qYo6ODFlGS_VWbIWIwOJeB7uUoBgoppSrcwvoAwnzKfQ2a0ccn6SgNmjmmphNXO9CPkqjsJiohilx8sAWrz9oATHwVNWZ44PoSvfGFGuavSpv1AetYZY0IZdVrBmkVo2qSfnCE9qR",
        contentType: "application/pdf",
        // key: "0f27dd2f-d72a-4681-b4de-7a8d4e0f637e",
        name:
          "Annex 2-Disposal Instruction for Handling Foreign Inward Remittances (1).docx.pdf",
        size: 68417,
      },
      isReply: false,
      metadata: {
        webUiKey: "14e96af2-9307-47a2-9b1a-55ac30d8c731",
      },
      contentType: 0,
    },
  ],
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

export const Group = Template.bind({});
Group.args = {
  title: "wow group",
  imageUrl: "sampleContactDp",
  type: ChatType.GROUP,
  metaProps: DeafaultChatDetailsMeta.args,
  groupMembers: [
    {
      userId: "some-email-2@applozic.com",
      connected: true,
      status: 1,
      lastSeenAtTime: 1633512805256,
      createdAtTime: 1627922753366,
      unreadCount: 0,
      email: "some-email-2@applozic.com",
      deactivated: false,
      connectedClientCount: 0,
      active: true,
      lastLoggedInAtTime: 1633512511476,
      lastMessageAtTime: 1628250789391,
      roleKey: "09a9238c-1fe9-40d9-b90c-4efd090ba4a3",
      metadata: {},
      roleType: UserRoles.ADMIN,
      connectedLastSeenTime: 1.1633512805256,
    },
  ],
  group: {
    id: 59428598,
    clientGroupId: "59428598",
    name: "wow group",
    adminId: "some-email-2@applozic.com",
    membersId: ["some-email-2@applozic.com"],
    removedMembersId: ["some-email-3@applozic.com"],
    unreadCount: 0,
    type: 2,
    createdAtTime: 1627928318097,
    userCount: 1,
    groupUsers: [
      { userId: "some-email-2@applozic.com", unreadCount: 0, role: 1 },
    ],
    childKeys: [],
    childClientGroupIds: [],
    metadata: {
      HIDE: "",
      GROUP_LEFT_MESSAGE: ":userName left",
      GROUP_USER_ROLE_UPDATED_MESSAGE: ":userName is :role now",
      GROUP_ICON_CHANGE_MESSAGE: "Group icon changed",
      DELETED_GROUP_MESSAGE: ":adminName deleted group",
      CREATE_GROUP_MESSAGE: ":adminName created group :groupName",
      GROUP_NAME_CHANGE_MESSAGE: "Group name changed to :groupName",
      REMOVE_MEMBER_MESSAGE: ":adminName removed :userName",
      ALERT: "",
      JOIN_MEMBER_MESSAGE: ":userName joined",
      ADD_MEMBER_MESSAGE: ":adminName added :userName",
      GROUP_META_DATA_UPDATED_MESSAGE: "",
    },
  },
  messages: [
    {
      key: "4-null-1629930405232",
      messageText: "cool",
      fromUserId: "some-email-4@applozic.com",
      timeStamp: new Date("2021-08-25T22:26:45.252Z"),
      status: MessageStatus.RECEIVED,
      metadata: {
        webUiKey: "14e96af2-9307-47a2-9b1a-55ac30d8c731",
      },
      isReply: false,
      contentType: 0,
    },
    {
      key: "4-null-1629930753616",
      messageText: "123",
      fromUserId: "some-email-4@applozic.com",
      timeStamp: new Date("2021-08-25T22:32:33.632Z"),
      status: MessageStatus.RECEIVED,
      isReply: false,
      metadata: {
        webUiKey: "14e96af2-9307-47a2-9b1a-55ac30d8c731",
      },
      contentType: 0,
    },
    {
      key: "4-null-1630322290066",
      messageText: "123",
      fromUserId: "some-email-4@applozic.com",
      timeStamp: new Date("2021-08-25T22:32:33.632Z"),
      status: MessageStatus.RECEIVED,
      file: {
        blobKey:
          "AMIfv94V8jvdx-CFony9W3X2r6kbXyAlQLB-JnMXl1uANexDcyZP_JVr-k9V5-DOQeZiG6wINGicZEwOe1mN_Nf-BU4VlFCQaSwQ6LMn1ySwu1BI0tE7vBNhdVdHBX2CXVHe_1ETKpmk0IXeRw5l6X1kQ6zgJo8jgjKzlhxUlUTpE55A48TBQxlPV7x6KIlo5W0-iHnBLWH_vwKvY-cv87zWmIjd5fEURb9QbXpk3_5wcadbYZf3Nv1qV0osvdZBdogGqTBHex3p",
        name: "000_96P7A8-1.webp",
        size: 126366,
        contentType: "image/webp",
        thumbnailUrl:
          "https://lh3.googleusercontent.com/WYUU5uYbv9hVsPaKi8dhTjyVHaukdDawMgM70GDhy5DBfcmYcWxkHsGeTiremxNFSqLLj9cnWS94o_6ACCym2LT104FpD97m=s120",
      },
      isReply: false,
      metadata: {
        webUiKey: "14e96af2-9307-47a2-9b1a-55ac30d8c731",
      },
      contentType: 0,
    },
    {
      key: "4-null-1630322290066",
      messageText: "123",
      fromUserId: "some-email-4@applozic.com",
      timeStamp: new Date("2021-08-25T22:32:33.632Z"),
      status: MessageStatus.RECEIVED,
      file: {
        blobKey:
          "AMIfv94V8jvdx-CFony9W3X2r6kbXyAlQLB-JnMXl1uANexDcyZP_JVr-k9V5-DOQeZiG6wINGicZEwOe1mN_Nf-BU4VlFCQaSwQ6LMn1ySwu1BI0tE7vBNhdVdHBX2CXVHe_1ETKpmk0IXeRw5l6X1kQ6zgJo8jgjKzlhxUlUTpE55A48TBQxlPV7x6KIlo5W0-iHnBLWH_vwKvY-cv87zWmIjd5fEURb9QbXpk3_5wcadbYZf3Nv1qV0osvdZBdogGqTBHex3p",
        name: "000_96P7A8-1.webp",
        size: 126366,
        contentType: "image/webp",
        thumbnailUrl:
          "https://lh3.googleusercontent.com/WYUU5uYbv9hVsPaKi8dhTjyVHaukdDawMgM70GDhy5DBfcmYcWxkHsGeTiremxNFSqLLj9cnWS94o_6ACCym2LT104FpD97m=s120",
      },
      isReply: false,
      metadata: {
        webUiKey: "14e96af2-9307-47a2-9b1a-55ac30d8c731",
      },
      contentType: 0,
    },
    {
      key: "4-null-1630322290066",
      messageText: "123",
      fromUserId: "some-email-4@applozic.com",
      timeStamp: new Date("2021-08-25T22:32:33.632Z"),
      status: MessageStatus.RECEIVED,
      file: {
        blobKey:
          "AMIfv95mWr7J9rbTKg4BAzz6Ip4o6CQ3fhHJRF5U8J2AZnK6ePWRew3eVFtVYNOxTSR0b2ititPCRqjN6oQkKQJgqapdGSbwzuwUWbRGEXUizXLukY4F0yfopMjloephpp9qYo6ODFlGS_VWbIWIwOJeB7uUoBgoppSrcwvoAwnzKfQ2a0ccn6SgNmjmmphNXO9CPkqjsJiohilx8sAWrz9oATHwVNWZ44PoSvfGFGuavSpv1AetYZY0IZdVrBmkVo2qSfnCE9qR",
        contentType: "application/pdf",
        // key: "0f27dd2f-d72a-4681-b4de-7a8d4e0f637e",
        name:
          "Annex 2-Disposal Instruction for Handling Foreign Inward Remittances (1).docx.pdf",
        size: 68417,
      },
      isReply: false,
      metadata: {
        webUiKey: "14e96af2-9307-47a2-9b1a-55ac30d8c731",
      },
      contentType: 0,
    },
  ],
  userContacts: [
    {
      userId: "some-email-2@applozic.com",
      connected: true,
      status: 1,
      lastSeenAtTime: 1633512805256,
      createdAtTime: 1627922753366,
      unreadCount: 0,
      email: "some-email-2@applozic.com",
      deactivated: false,
      connectedClientCount: 0,
      active: true,
      lastLoggedInAtTime: 1633512511476,
      lastMessageAtTime: 1628250789391,
      roleKey: "09a9238c-1fe9-40d9-b90c-4efd090ba4a3",
      metadata: {},
      roleType: 3,
      connectedLastSeenTime: 1.1633512805256,
    },
    {
      userId: "some-email-3@applozic.com",
      connected: false,
      status: 0,
      lastSeenAtTime: 1628694493770,
      createdAtTime: 1627926617732,
      unreadCount: 0,
      imageLink: "https://blah.com",
      email: "some-email-3@applozic.com",
      deactivated: false,
      connectedClientCount: 0,
      active: false,
      lastLoggedInAtTime: 1628692100884,
      lastMessageAtTime: 1629936922673,
      roleKey: "09a9238c-1fe9-40d9-b90c-4efd090ba4a3",
      metadata: {},
      roleType: 3,
      connectedLastSeenTime: 1.162869449377,
    },
  ],
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
