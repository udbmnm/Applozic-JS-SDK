import React from "react";
import { Meta } from "@storybook/react/types-6-0";
import { Story } from "@storybook/react";
import FullView, { FullViewProps } from ".";

const GOOGLE_MAPS_API_KEY = "AIzaSyBXW2LRG4ysc1Tt7i_Agj4RRCn2jScxox0";
const APPLICATION_ID = "applozic-sample-app";
const GIPHY_APP_ID = "CBATnkyl4HPNGTSyBTN6PcFQTVozxLpM";

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
