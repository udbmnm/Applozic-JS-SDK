import React from "react";
import { Story } from "@storybook/react";
import { Meta } from "@storybook/react/types-6-0";
import ChatTabHeadStripComponent, {
  ChatTabHeadStripProps,
} from "./ChatTabHeadStrip";
import { Box } from "@chakra-ui/react";

export default {
  title: "Components/ChatTabHeadStrip",
  component: ChatTabHeadStripComponent,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as Meta;

// Create a master template for mapping args to render the Button component
const Template: Story<ChatTabHeadStripProps> = (args) => (
  <Box height="500px">
    <ChatTabHeadStripComponent {...args} />
  </Box>
);

// Reuse that template for creating different stories
export const Primary = Template.bind({});
Primary.args = {
  // interactions: ContactListPane.args?.contactList,
  openIndex: 0,
};
