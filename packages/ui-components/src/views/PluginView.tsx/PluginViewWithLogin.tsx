import { Center, Container } from '@chakra-ui/react';
import React from 'react';
import { LoginFormWired } from '../..';
import useGetSelfDetails from '../../hooks/queries/useGetSelfDetails';
import { useApplozicClient } from '../../providers/useApplozicClient';
import { ViewWithLoginProps } from '../ViewProps';
import PluginViewApp from './PluginViewApp';

function PluginViewAppWithLogin({ loginPage }: ViewWithLoginProps) {
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
      <PluginViewApp />
    ) : (
      <Container>
        <LoginFormWired />
      </Container>
    );
  } else {
    return (
      <Container>
        <Center>Loading details..</Center>
      </Container>
    );
  }
}

export default PluginViewAppWithLogin;
