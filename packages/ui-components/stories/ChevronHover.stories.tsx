import React from "react";
import { Meta } from "@storybook/react/types-6-0";
import { Story } from "@storybook/react";
import { ChevronHover, ChevronHoverProps } from "../src";
import { Box } from "@chakra-ui/react";

export default {
  title: 'Core/ChevronHover',
  component: ChevronHover,
  argTypes: {
    backgroundColor: { control: 'color' }
  }
} as Meta;

// Create a master template for mapping args to render the Button component
const Template: Story<ChevronHoverProps> = (args) => (
  <Box border="1px solid red" width="20px">
    <ChevronHover {...args} />
  </Box>
);

// Reuse that template for creating different stories
export const Primary = Template.bind({});
Primary.args = {
  items: [
    {
      label: "Alert!",
      onClick: () => alert("Alert!"),
    },
    {
      label: "Log to console",
      onClick: () => console.log("Called from chevron"),
      textColor: "accent.500",
    },
    {
      label: "Log error console",
      onClick: () => console.error(new Error("Called from chevron")),
      textColor: "red",
    },
  ],
};
