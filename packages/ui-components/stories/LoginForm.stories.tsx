import React from "react";
import { Meta } from "@storybook/react/types-6-0";
import { Story } from "@storybook/react";
import { Form, FormProps, LoginFormProps } from "../src";

// export default {
//   title: "Components/Form",
//   component: Form,
// } as Meta;

// Create a master template for mapping args to render the Button component
const Template: Story<FormProps<LoginFormProps>> = (args) => <Form {...args} />;

// Reuse that template for creating different stories
export const Login = Template.bind({});
Login.args = {
  initialValues: { email: "", password: "" },
  onSubmit: (values) => {
    console.log({ values });
  },
  submitText: "Login",
  fields: [
    {
      id: "email",
      label: "Email",
      placeholder: "Enter your email",
      type: "email",
    },
    {
      id: "password",
      label: "Password",
      placeholder: "Enter your password",
      type: "password",
    },
  ],
};

// export const Secondary = Template.bind({});
// Secondary.args = { ...Primary.args, primary: false, label: "Secondary 😇" };
