import React from 'react';
import useUserLogin from '../../hooks/mutations/useUserLogin';
import useGetSelfDetails from '../../hooks/queries/useGetSelfDetails';
import LoginForm from './LoginForm';

function LoginFormWired() {
  const { mutate: login } = useUserLogin();
  const { data: self } = useGetSelfDetails();
  return (
    <LoginForm disabled={!!self} onSubmit={values => login && login(values)} />
  );
}

export default LoginFormWired;
