import React from "react";
import LoginPage from "../../components/LoginPage";
import useGetSelfDetails from "../../hooks/queries/useGetSelfDetails";
import { ProvideActiveChats } from "../../providers/useActiveChats";
import { ProvideSidebar } from "../../providers/useSidebar";
import { useApplozicClient } from "../../providers/useApplozicClient";
import FullViewApp, { FullViewAppProps } from "./FullViewApp";

export interface FullViewWithLoginProps extends FullViewAppProps {
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
  giphyApiKey,
  gMapsApiKey,
  loginPage,
}: FullViewWithLoginProps) {
  const { isClientLoaded } = useApplozicClient();
  const user = useGetSelfDetails();

  if (!isClientLoaded) {
    return <div>Loading...</div>;
  }
  return user ? (
    <ProvideActiveChats>
      <ProvideSidebar defaultCollapsed={true}>
        <FullViewApp giphyApiKey={giphyApiKey} gMapsApiKey={gMapsApiKey} />
      </ProvideSidebar>
    </ProvideActiveChats>
  ) : (
    <LoginPage
      applicationId={applicationId}
      topHeader={loginPage.topHeader}
      topSubHeader={loginPage.topSubHeader}
    />
  );
}

export default FullViewAppWithLogin;
