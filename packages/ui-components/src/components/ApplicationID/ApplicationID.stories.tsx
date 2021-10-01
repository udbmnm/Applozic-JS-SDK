import React from "react";
import { Meta } from "@storybook/react/types-6-0";
import { Story } from "@storybook/react";
import ApplicationIDWired, { IApplicationIDWired } from "./ApplicationIDWired";
import { APPLICATION_ID } from "../../config";

// export default {
//   title: "AppID",
//   component: ApplicationIDWired,
// } as Meta;

// Create a master template for mapping args to render the Button component
const Template: Story<IApplicationIDWired> = (args) => (
  <ApplicationIDWired {...args} />
);

// Reuse that template for creating different stories
export const AppID = Template.bind({});
AppID.args = { applicationId: APPLICATION_ID };
