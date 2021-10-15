import React from "react";
import { Meta } from "@storybook/react/types-6-0";
import { Story } from "@storybook/react";
import {
  Sidebar,
  SidebarProps,
  FeatureTab,
  ChatType,
} from "@applozic/ui-components";

export default {
  title: "Components/Sidebar",
  component: Sidebar,
} as Meta;

// Create a master template for mapping args to render the Button component
const Template: Story<SidebarProps> = (args) => <Sidebar {...args} />;

// Reuse that template for creating different stories
export const Default = Template.bind({});
Default.args = {
  selfDetails: {
    name: "T`Challa",
    imageUrl: "https://joeschmoe.io/api/v1/random/jess",
    onCloseClicked: () => console.log("onCloseClicked"),
    onLogOutClicked: () => console.log("onLogOutClicked"),
    onUpdateValue: (key, value) => console.log("onUpdateValue", key, value),
  },
  selectedFeatureTab: FeatureTab.RECENT_CHATS,
  recentChats: [
    {
      contactId: "test1",
      chatType: ChatType.USER,
      imageUrl: "https://joeschmoe.io/api/v1/random/jess",
      lastMessageKey: "testasd1213",
      lastMessageTime: new Date().getTime(),
    },
  ],
};
