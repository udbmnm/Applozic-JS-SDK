import React from 'react';
import {
  getRichTextContentFromMetaData,
  RichTextMetaData,
  List,
  ListLinkAction,
  ListQuickReplyAction
} from '@applozic/core-sdk';
import {
  Box,
  Image,
  Avatar,
  Heading,
  List as ListUI,
  ListItem,
  HStack,
  VStack,
  Text,
  ButtonGroup,
  Button
} from '@chakra-ui/react';

function ListMessage({
  metadata,
  sendQuickReply
}: {
  metadata: RichTextMetaData;
  sendQuickReply: (text: string) => Promise<void>;
}) {
  const handleAction = (action: ListLinkAction | ListQuickReplyAction) => {
    switch (action.type) {
      case 'link':
        window.open((action as ListLinkAction).url);
        break;
      case 'quick_reply':
        sendQuickReply((action as ListQuickReplyAction).text);
        break;
    }
  };
  try {
    const { payload } = getRichTextContentFromMetaData<List>(metadata);
    return (
      <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden">
        {payload.headerImgSrc && (
          <Image src={payload.headerImgSrc} width="full" />
        )}
        {payload.headerText && (
          <Heading as="h3" size="lg" padding={2}>
            {payload.headerText}
          </Heading>
        )}
        <ListUI as="ol" padding={2}>
          {payload.elements.map((element, index) => (
            <ListItem key={index} onClick={() => handleAction(element.action)}>
              <HStack spacing={2}>
                {element.imgSrc && (
                  <Avatar src={element.imgSrc} size="md" borderRadius={0} />
                )}
                <VStack alignItems="flex-start">
                  {element.title && (
                    <Heading as="h4" size="md">
                      {element.title}
                    </Heading>
                  )}
                  {element.description && <Text>{element.description}</Text>}
                </VStack>
              </HStack>
            </ListItem>
          ))}
        </ListUI>
        {payload.buttons && (
          <ButtonGroup alignItems="center" width="full">
            {payload.buttons.map(button => (
              <Button
                width="full"
                borderTopRadius="0"
                key={button.name}
                backgroundColor="brand.primary"
                color="white"
                onClick={() => handleAction(button.action)}
              >
                {button.name}
              </Button>
            ))}
          </ButtonGroup>
        )}
      </Box>
    );
  } catch (e) {
    console.log(e);
    return <div />;
  }
}

export default ListMessage;
