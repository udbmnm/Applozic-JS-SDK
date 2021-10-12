import React from "react";
import useUserLogin from "../../hooks/mutations/useUserLogin";
import LoginForm from "./LoginForm";

function LoginFormWired() {
  const { mutate: login } = useUserLogin();
  return <LoginForm onSubmit={(values) => login && login(values)} />;
}

export default LoginFormWired;
