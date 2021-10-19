import React from "react";
import { Meta } from "@storybook/react/types-6-0";
import { Story } from "@storybook/react";
import { Icon, IconProps } from "../src";
export default {
  title: "Core/Icon",
  component: Icon,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as Meta;

// Create a master template for mapping args to render the Button component
const Template: Story<IconProps> = (args) => <Icon {...args} />;

// Reuse that template for creating different stories
export const Cancel = Template.bind({});
Cancel.args = {
  icon: "cancel",
  size: 16,
  style: { opacity: 0.6 },
  color: "#09021A",
};
