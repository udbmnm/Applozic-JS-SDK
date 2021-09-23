import React from "react";
import { Meta } from "@storybook/react/types-6-0";
import { Story } from "@storybook/react";
import Form, { FormProps } from "../Form/Form";
import { ILoginForm } from "./LoginForm";
import LoginFormWired from "./LoginFormWired";

export default {
  title: "Login",
  component: LoginFormWired,
} as Meta;

// Create a master template for mapping args to render the Button component
const Template: Story< Omit<ILoginForm, "onSubmit">> = (args) => (
  <LoginFormWired {...args} />
);

// Reuse that template for creating different stories
export const Login = Template.bind({});
Login.args = {};

// export const Secondary = Template.bind({});
// Secondary.args = { ...Primary.args, primary: false, label: "Secondary 😇" };
