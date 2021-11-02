import {
  Center,
  Container,
  useColorModeValue as mode,
  VStack,
  Box,
  Heading,
  Spacer
} from '@chakra-ui/react';
import React from 'react';
import { LoginFormWired } from '../..';
import useGetSelfDetails from '../../hooks/queries/useGetSelfDetails';
import { useApplozicClient } from '../../providers/useApplozicClient';
import Loading from '../LoadingClient';
import { ViewWithLoginProps } from '../ViewProps';
import PluginViewApp from './PluginViewApp';

function PluginViewAppWithLogin({ loginPage }: ViewWithLoginProps) {
  const { isClientLoaded } = useApplozicClient();
  const { data: user, status } = useGetSelfDetails();
  return (
    <Container
      maxW="full"
      h={480}
      overflowX="hidden"
      overflowY="hidden"
      padding={0}
      backgroundColor={mode('background.light', 'background.dark')}
    >
      {!isClientLoaded ? (
        <Loading message="Applozic client" />
      ) : status !== 'loading' ? (
        user ? (
          <PluginViewApp />
        ) : (
          <Center h="full" p={2}>
            <VStack>
              <Heading size="md" as="h1">
                {loginPage.topHeader}
              </Heading>
              <Box mb="8" textAlign={{ base: 'center', md: 'start' }}>
                <Heading size="lg" mb="2" fontWeight="extrabold">
                  {loginPage.topSubHeader}
                </Heading>
              </Box>
              <LoginFormWired />
            </VStack>
          </Center>
        )
      ) : (
        <Loading message="details" />
      )}
    </Container>
  );
}

export default PluginViewAppWithLogin;
