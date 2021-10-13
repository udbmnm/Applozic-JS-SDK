import React from "react";
import { Meta } from "@storybook/react/types-6-0";
import { Story } from "@storybook/react";
import FullView, { FullViewProps } from "@applozic/ui-components";
import { APPLICATION_ID, GIPHY_APP_ID, GOOGLE_MAPS_API_KEY } from "../config";

export default {
  title: "Views/FullView",
  component: FullView,
} as Meta;

// Create a master template for mapping args to render the Button component
const Template: Story<FullViewProps> = (args) => <FullView {...args} />;

// Reuse that template for creating different stories
export const Default = Template.bind({});
Default.args = {
  applicationId: APPLICATION_ID,
  giphyApiKey: GIPHY_APP_ID,
  gMapsApiKey: GOOGLE_MAPS_API_KEY,
  loginPage: {
    topHeader: "Applozic",
    topSubHeader: "We Are Applozic",
  },
};
