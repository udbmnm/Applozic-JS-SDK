import React from "react";
import { Meta } from "@storybook/react/types-6-0";
import { Story } from "@storybook/react";
import {
  LoginPage,
  LoginPageProps,
  ProvideApplozicClient,
} from "@applozic/ui-components";
import { APPLICATION_ID, GOOGLE_MAPS_API_KEY, GIPHY_API_KEY } from "../config";

export default {
  title: "WiredComponents/LoginPage",
  component: LoginPage,
} as Meta;

// Create a master template for mapping args to render the Button component
const Template: Story<LoginPageProps> = (args) => (
  <ProvideApplozicClient
    applicationId={APPLICATION_ID}
    gMapsApiKey={GOOGLE_MAPS_API_KEY}
    giphyApiKey={GIPHY_API_KEY}
  >
    <LoginPage {...args} />
  </ProvideApplozicClient>
);

// Reuse that template for creating different stories
export const Default = Template.bind({});
Default.args = {
  topHeader: "Applozic",
  topSubHeader: "We are Applozic",
};
