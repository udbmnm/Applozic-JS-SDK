import React from 'react';
import LoginPage from '../../components/LoginPage';
import useGetSelfDetails from '../../hooks/queries/useGetSelfDetails';
import { useApplozicClient } from '../../providers/useApplozicClient';
import FullViewApp from './FullViewApp';

export interface FullViewWithLoginProps {
  /** Login page customization */
  loginPage: {
    /** Top header in login page */
    topHeader: string;
    /** Welcome message in login page */
    topSubHeader: string;
  };
}

function FullViewAppWithLogin({ loginPage }: FullViewWithLoginProps) {
  const { isClientLoaded } = useApplozicClient();
  const user = useGetSelfDetails();

  if (!isClientLoaded) {
    return <div>Loading Applozic Client...</div>;
  }
  return user ? (
    <FullViewApp />
  ) : (
    <LoginPage
      topHeader={loginPage.topHeader}
      topSubHeader={loginPage.topSubHeader}
    />
  );
}

export default FullViewAppWithLogin;
