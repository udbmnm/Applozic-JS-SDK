import React from "react";
import { Meta } from "@storybook/react/types-6-0";
import { Story } from "@storybook/react";
import FeatureSidebar, { FeatureSidebarProps } from "./FeatureTabs";

export default {
  title: "Components/FeatureSidebar",
  component: FeatureSidebar,
} as Meta;

// Create a master template for mapping args to render the Button component
const Template: Story<FeatureSidebarProps> = (args) => (
  <FeatureSidebar {...args} />
);

// Reuse that template for creating different stories
export const Default = Template.bind({});
Default.args = {};
