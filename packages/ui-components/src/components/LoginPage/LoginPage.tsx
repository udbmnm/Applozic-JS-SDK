import {
  Box,
  Heading,
  SimpleGrid,
  useColorModeValue as mode
} from '@chakra-ui/react';
import * as React from 'react';
import LoginFormWired from '../LoginForm/LoginFormWired';

export interface LoginPageProps {
  topHeader: string;
  topSubHeader: string;
}

const LoginPage: React.FC<LoginPageProps> = ({ topHeader, topSubHeader }) => {
  return (
    <Box
      minH="full"
      bg={{ md: mode('gray.100', 'inherit') }}
      maxW="6xl"
      mx="auto"
      py={{ base: '10', md: '20' }}
      px={{ base: '4', md: '10' }}
    >
      {/* <SimpleGrid columns={{ base: 1, lg: 2 }} spacing="14"> */}
      <Box w="full" maxW="xl" mx="auto">
        <Box
          bg={{ md: mode('white', 'gray.700') }}
          rounded={{ md: '2xl' }}
          p={{ base: '4', md: '12' }}
          borderWidth={{ md: '1px' }}
          borderColor={mode('gray.200', 'transparent')}
          shadow={{ md: 'lg' }}
        >
          <Heading size="md" as="h1">
            {topHeader}
          </Heading>
          <Box mb="8" textAlign={{ base: 'center', md: 'start' }}>
            <Heading size="lg" mb="2" fontWeight="extrabold">
              {topSubHeader}
            </Heading>
          </Box>
          <LoginFormWired />
        </Box>
      </Box>
      {/* </SimpleGrid> */}
    </Box>
  );
};
export default LoginPage;
