import { Center, Container, HStack } from '@chakra-ui/layout';
import { useColorModeValue as mode, Spinner, Text } from '@chakra-ui/react';
import React from 'react';
import LoginPage from '../../components/LoginPage';
import useGetSelfDetails from '../../hooks/queries/useGetSelfDetails';
import { useApplozicClient } from '../../providers/useApplozicClient';
import Loading from '../LoadingClient';
import LoadingClient from '../LoadingClient';
import { ViewWithLoginProps } from '../ViewProps';
import FullViewApp from './FullViewApp';

function FullViewAppWithLogin({ loginPage }: ViewWithLoginProps) {
  const { isClientLoaded } = useApplozicClient();
  const { data: user, status } = useGetSelfDetails();

  return (
    <Container
      maxW="100vw"
      h="100vh"
      overflowX="hidden"
      overflowY="hidden"
      padding={2}
      backgroundColor={mode('background.light', 'background.dark')}
    >
      {!isClientLoaded ? (
        <Loading message="Applozic client" />
      ) : status !== 'loading' ? (
        user ? (
          <FullViewApp />
        ) : (
          <LoginPage
            topHeader={loginPage.topHeader}
            topSubHeader={loginPage.topSubHeader}
          />
        )
      ) : (
        <Loading message="details" />
      )}
    </Container>
  );
}

export default FullViewAppWithLogin;
