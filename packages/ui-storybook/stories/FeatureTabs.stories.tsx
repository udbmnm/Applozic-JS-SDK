import React from "react";
import { Meta } from "@storybook/react/types-6-0";
import { Story } from "@storybook/react";
import {
  FeatureTab,
  FeatureTabs,
  FeatureTabsProps,
} from "@applozic/ui-components";

export default {
  title: "Components/FeatureTabs",
  component: FeatureTabs,
} as Meta;

// Create a master template for mapping args to render the Button component
const Template: Story<FeatureTabsProps> = (args) => <FeatureTabs {...args} />;

const featureTabs = [
  FeatureTab.USER,
  FeatureTab.RECENT_CHATS,
  FeatureTab.CONTACTS,
  FeatureTab.GROUPS,
];

// Reuse that template for creating different stories
export const Default = Template.bind({});
Default.args = {
  featureTabs,
  onChange: (index) =>
    console.log({ title: "Clicked Tab", description: featureTabs[index] }),
  userName: "T`Challa",
  userImageUrl: "https://joeschmoe.io/api/v1/random",
};
