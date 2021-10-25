import React from 'react';
import LoginPage from '../../components/LoginPage';
import useGetSelfDetails from '../../hooks/queries/useGetSelfDetails';
import { useApplozicClient } from '../../providers/useApplozicClient';
import { ViewWithLoginProps } from '../ViewProps';
import PluginViewApp from './PluginViewApp';

function PluginViewAppWithLogin({ loginPage }: ViewWithLoginProps) {
  const { isClientLoaded } = useApplozicClient();
  const { data: user } = useGetSelfDetails();

  if (!isClientLoaded) {
    return <div>Loading Applozic Client...</div>;
  }
  return user ? (
    <PluginViewApp />
  ) : (
    <LoginPage
      topHeader={loginPage.topHeader}
      topSubHeader={loginPage.topSubHeader}
    />
  );
}

export default PluginViewAppWithLogin;
