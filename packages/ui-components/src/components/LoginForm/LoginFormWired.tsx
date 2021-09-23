import React from "react";
import useUserLogin from "../../hooks/mutations/useUserLogin";
import LoginForm, { ILoginForm } from "./LoginForm";

function LoginFormWired({
  initialValues,
  disabled,
}: Omit<ILoginForm, "onSubmit">) {
  const { mutate: login } = useUserLogin();
  return (
    <LoginForm
      disabled={disabled}
      initialValues={initialValues}
      onSubmit={(values) => login && login(values)}
    />
  );
}

export default LoginFormWired;
