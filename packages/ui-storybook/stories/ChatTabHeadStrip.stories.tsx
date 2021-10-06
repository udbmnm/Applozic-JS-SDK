import React from "react";
import { Story } from "@storybook/react";
import { Meta } from "@storybook/react/types-6-0";
import {
  ChatType,
  ChatTabHeadStrip,
  ChatTabHeadStripProps,
} from "@applozic/ui-components";

export default {
  title: "Components/ChatTabHeadStrip",
  component: ChatTabHeadStrip,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as Meta;

// Create a master template for mapping args to render the Button component
const Template: Story<ChatTabHeadStripProps> = (args) => (
  <div style={{ height: 500 }}>
    <ChatTabHeadStrip {...args} />
  </div>
);

// Reuse that template for creating different stories
export const Primary = Template.bind({});
Primary.args = {
  chats: [
    { contactId: "1", type: ChatType.GROUP },
    { contactId: "2", type: ChatType.USER },
    { contactId: "2", type: ChatType.USER },
  ],
  openIndex: 0,
  onItemClick: (index: number) => console.log({ index }),
  onCloseClick: (index: number) => console.log({ index }),
  onDetailsClick: (index: number) => console.log({ index }),
};
