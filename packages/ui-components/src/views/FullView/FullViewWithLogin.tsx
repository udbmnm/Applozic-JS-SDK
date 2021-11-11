import { Container } from '@chakra-ui/layout';
import { useColorModeValue as mode } from '@chakra-ui/react';
import React from 'react';
import LoginPage from '../../components/LoginPage';
import useGetSelfDetails from '../../hooks/queries/useGetSelfDetails';
import { useApplozicClient } from '../../providers/useApplozicClient';
import Loading from '../Loading';
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
      backgroundColor={mode('container.light', 'container.dark')}
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
