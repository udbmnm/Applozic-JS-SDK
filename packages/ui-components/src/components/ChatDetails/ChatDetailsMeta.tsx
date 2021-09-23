import { Box, Text, VStack } from "@chakra-ui/react";
import React from "react";

interface ChatMetaItem {
  header: string;
  text: string;
}

export interface ChatDetailsMetaProps {
  items?: ChatMetaItem[];
}

const ChatDetailsMeta = ({ items }: ChatDetailsMetaProps) => {
  const list = (items || []).map((item) => {
    return (
      <VStack alignItems="self-start" spacing={0}>
        <Text color="textHeader.500" fontSize="14px">
          {item.header}
        </Text>
        <Text color="textMain.500" fontSize="14px">
          {item.text}
        </Text>
      </VStack>
    );
  });
  return (
    <VStack align="stretch" width="100%" minWidth="200px" spacing={5}>
      {list}
    </VStack>
  );
};

export default ChatDetailsMeta;
