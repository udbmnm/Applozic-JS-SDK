import { Center, VStack, Heading, Text, Image } from '@chakra-ui/react';
import React from 'react';
// import no_selected_chats from "../../assets/images/no_selected_chats.png";
// TODO upload to S3 and CF

function NoChatSelected() {
  return (
    <Center height="full" flex="1" overflowY="auto">
      <VStack width="50%" spacing={2}>
        {/* TODO  add image here after uploading to S3 */}
        {/* <Image src={no_selected_chats} height={"180px"} /> */}
        <Heading as={'h4'} size="md" textAlign="center">
          Select a chat to start messaging
        </Heading>
        {/* <Text textAlign="center">
          Lorem ipsum dolor sit amet, consectetur amet amet, adipiscing elit.
          Aliquet suscipit nibh aliquet.
        </Text> */}
      </VStack>
    </Center>
  );
}

export default NoChatSelected;
