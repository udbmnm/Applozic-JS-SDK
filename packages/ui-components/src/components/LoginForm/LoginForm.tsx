import { FormikHelpers } from "formik";
import React from "react";
import Form from "../Form";

export interface ILoginFormData {
  email: string;
  password: string;
}

export interface LoginFormProps {
  initialValues?: ILoginFormData;
  disabled?: boolean;
  onSubmit: ((
    values: ILoginFormData,
    formikHelpers: FormikHelpers<ILoginFormData>
  ) => void | Promise<any>) &
    ((values: ILoginFormData, actions: FormikHelpers<ILoginFormData>) => void);
}

function LoginForm({ disabled, initialValues, onSubmit }: LoginFormProps) {
  return (
    <Form
      initialValues={
        !initialValues ? { email: "", password: "" } : { ...initialValues }
      }
      onSubmit={onSubmit}
      submitText="Login"
      fields={[
        {
          id: "email",
          label: "Email / User ID",
          placeholder: "Enter your email or user ID",
          type: "email",
          disabled,
        },
        {
          id: "password",
          label: "Password",
          placeholder: "Enter your password",
          type: "password",
          disabled,
        },
      ]}
    />
  );
}

export default LoginForm;
