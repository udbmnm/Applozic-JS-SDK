import { Center, Container } from '@chakra-ui/layout';
import React from 'react';
import LoginPage from '../../components/LoginPage';
import useGetSelfDetails from '../../hooks/queries/useGetSelfDetails';
import { useApplozicClient } from '../../providers/useApplozicClient';
import { ViewWithLoginProps } from '../ViewProps';
import FullViewApp from './FullViewApp';

function FullViewAppWithLogin({ loginPage }: ViewWithLoginProps) {
  const { isClientLoaded } = useApplozicClient();
  const { data: user, status } = useGetSelfDetails();

  if (!isClientLoaded) {
    return (
      <Container>
        <Center>Loading Applozic Client...</Center>
      </Container>
    );
  }
  if (status !== 'loading') {
    return user ? (
      <FullViewApp />
    ) : (
      <LoginPage
        topHeader={loginPage.topHeader}
        topSubHeader={loginPage.topSubHeader}
      />
    );
  } else {
    return (
      <Container>
        <Center>Loading details..</Center>
      </Container>
    );
  }
}

export default FullViewAppWithLogin;
