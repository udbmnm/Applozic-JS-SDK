import {
  Box,
  Flex,
  Heading,
  SimpleGrid,
  Text,
  useColorModeValue as mode
} from '@chakra-ui/react';
import * as React from 'react';
import LoginFormWired from '../LoginForm/LoginFormWired';
import * as Logos from './Brands';
import { DividerWithText } from './DividerWithText';
import { Testimonial } from './Testimonial';

interface ILoginPage {
  applicationId?: string;
  topHeader: string;
  topSubHeader: string;
}

const LoginPage: React.FC<ILoginPage> = ({
  applicationId,
  topHeader,
  topSubHeader
}) => {
  return (
    <Box minH="100vh" bg={{ md: mode('gray.100', 'inherit') }}>
      <Box
        maxW="6xl"
        mx="auto"
        py={{ base: '10', md: '20' }}
        px={{ base: '4', md: '10' }}
      >
        <SimpleGrid columns={{ base: 1, lg: 2 }} spacing="14">
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
                {/* <Text
                  fontSize="lg"
                  color={mode("gray.600", "gray.400")}
                  fontWeight="medium"
                >
                  Welcome please login to your account
                </Text> */}
              </Box>
              {/* <DividerWithText>or</DividerWithText> */}
              <LoginFormWired disabled={applicationId?.length === 0} />
            </Box>
            {/* <Text mt="8" align="center" fontWeight="medium">
              Already have an account?
              <Box
                as="a"
                href="#"
                color={mode("blue.600", "blue.200")}
                display={{ base: "block", md: "inline-block" }}
              >
                Log in to Applozic
              </Box>
            </Text> */}
          </Box>

          {/* <Flex
            direction="column"
            py="24"
            display={{ base: "none", lg: "flex" }}
          >
            <Testimonial />
            <SimpleGrid
              columns={3}
              spacing="10"
              paddingStart="12"
              alignItems="center"
              color="gray.400"
            >
              <Logos.Wakanda />
              <Logos.ChatMonkey />
              <Logos.Lighthouse />
            </SimpleGrid>
          </Flex> */}
        </SimpleGrid>
      </Box>
    </Box>
  );
};
export default LoginPage;
