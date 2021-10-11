import React from "react";
import LoginPage from "../../components/LoginPage";
import useGetSelfDetails from "../../hooks/queries/useGetSelfDetails";
import { ProvideSidebar } from "../../providers/useSidebar";
import { useApplozicClient } from "../../providers/useApplozicClient";
import FullViewApp from "./FullViewApp";

export interface FullViewWithLoginProps {
  applicationId: string;
  /** Login page customization */
  loginPage: {
    /** Top header in login page */
    topHeader: string;
    /** Welcome message in login page */
    topSubHeader: string;
  };
}

function FullViewAppWithLogin({
  applicationId,
  loginPage,
}: FullViewWithLoginProps) {
  const { isClientLoaded } = useApplozicClient();
  const user = useGetSelfDetails();

  if (!isClientLoaded) {
    return <div>Loading...</div>;
  }
  return user ? (
    <ProvideSidebar defaultCollapsed={true}>
      <FullViewApp />
    </ProvideSidebar>
  ) : (
    <LoginPage
      applicationId={applicationId}
      topHeader={loginPage.topHeader}
      topSubHeader={loginPage.topSubHeader}
    />
  );
}

export default FullViewAppWithLogin;
