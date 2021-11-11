import { Center, HStack, Spinner, Text } from '@chakra-ui/react';
import React from 'react';

function Loading({ message }: { message: string }) {
  return (
    <Center h="full">
      <HStack>
        <Spinner color="brand.primary" />
        <Text>{`Loading ${message}...`}</Text>
      </HStack>
    </Center>
  );
}

export default Loading;
