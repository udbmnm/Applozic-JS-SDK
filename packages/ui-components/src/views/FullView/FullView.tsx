import { Container, HStack, useColorModeValue as mode } from "@chakra-ui/react";
import React, { memo, useEffect } from "react";
import ChatWindowWired from "../../components/ChatWindow/ChatWindowWired";
import FeatureSidebar from "../../components/FeatureSidebar";
import LoginPage from "../../components/LoginPage";
import SidebarWired from "../../components/Sidebar/SidebarWired";
import useGetSelfDetails from "../../hooks/queries/useGetSelfDetails";
import Feature from "../../models/Feature";
import { ProvideActiveChats } from "../../providers/useActiveChats";
import { ProvideSidebar, useSidebar } from "../../providers/useSidebar";
import { useQueryClient } from "react-query";
import {
  ProvideApplozicClient,
  useApplozicClient,
} from "../../providers/useApplozicClient";
import useGetApplicationId from "../../hooks/queries/useGetApplicationId";
import { LoginResult, User } from "@applozic/core-sdk";
import FeatureSidebarWired from "../../components/FeatureSidebar/FeatureSidebarWired";

export const ActiveFeatures = [
  Feature.RECENT_CHATS,
  Feature.CONTACTS,
  Feature.GROUPS,
];

export interface IFullViewAppProps {
  /** GIPHY API Key */
  giphyApiKey?: string;
  /** Google Maps API Key */
  gMapsApiKey?: string;
}

const FullViewApp = ({ giphyApiKey, gMapsApiKey }: IFullViewAppProps) => {
  return (
    <Container
      maxWidth="100vw"
      height="100vh"
      overflowX="hidden"
      overflowY="hidden"
      padding={2}
      backgroundColor={mode("background.light", "background.dark")}
    >
      <HStack maxWidth="full" height="full" alignItems="flex-start">
        <FeatureSidebarWired />
        <SidebarWired />
        <ChatWindowWired giphyApiKey={giphyApiKey} gMapsApiKey={gMapsApiKey} />
      </HStack>
    </Container>
  );
};

export interface IFullViewAppWithLogin extends IFullViewAppProps {
  user?: User | null | undefined;
  /** Login page customization */
  loginPage: {
    /** Top header in login page */
    topHeader: string;
    /** Welcome message in login page */
    topSubHeader: string;
  }
}

function FullViewAppWithLogin({
  giphyApiKey,
  gMapsApiKey,
  loginPage,
  user,
}: IFullViewAppWithLogin) {
  const applicationId = useGetApplicationId();
  const { isClientLoaded } = useApplozicClient();
  if (!isClientLoaded) {
    return <div>Loading...</div>;
  }
  return applicationId && user ? (
    <ProvideActiveChats>
      <ProvideSidebar defaultCollapsed={true}>
        <FullViewApp giphyApiKey={giphyApiKey} gMapsApiKey={gMapsApiKey} />
      </ProvideSidebar>
    </ProvideActiveChats>
  ) : (
    <LoginPage applicationId={applicationId} topHeader={loginPage.topHeader} topSubHeader={loginPage.topSubHeader} />
  );
}
const MemoizedFullViewAppWithLogin = memo(FullViewAppWithLogin);

export interface IFullViewBare extends Omit<IFullViewAppWithLogin, 'user'> {
  /** Applozic Application ID */
  applicationId?: string;
}

const FullViewBare = ({
  applicationId: initialApplicationId,
  giphyApiKey,
  gMapsApiKey,
  loginPage
}: IFullViewBare) => {
  const queryClient = useQueryClient();
  const user = useGetSelfDetails();
  const applicationId = useGetApplicationId(initialApplicationId);
  useEffect(() => {
    if (initialApplicationId) {
      queryClient.setQueryData(["application_id"], initialApplicationId);
    }
  }, [initialApplicationId]);
  return (
    <ProvideApplozicClient applicationId={applicationId}>
      <MemoizedFullViewAppWithLogin
        giphyApiKey={giphyApiKey}
        gMapsApiKey={gMapsApiKey}
        user={user}
        loginPage={loginPage}
      />
    </ProvideApplozicClient>
  );
};

export default FullViewBare;
