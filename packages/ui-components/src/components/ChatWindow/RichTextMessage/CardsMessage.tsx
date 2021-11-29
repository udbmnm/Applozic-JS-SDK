import React, { useState } from 'react';
import {
  getRichTextContentFromMetaData,
  RichTextMetaData,
  Card,
  CardSubmitAction,
  CardQuickReplyAction,
  CardLinkAction
} from '@applozic/core-sdk';
import {
  Box,
  Image,
  Heading,
  HStack,
  VStack,
  Text,
  ButtonGroup,
  Button,
  Flex
} from '@chakra-ui/react';
import ChakraCarousel from './Carousel';

function CardMessage({
  metadata,
  sendQuickReply,
  handleFormSubmission
}: {
  metadata: RichTextMetaData;
  sendQuickReply: (text: string) => void;
  handleFormSubmission: (
    formAction: string,
    requestType: string | undefined,
    formData: { [key: string]: string },
    callback: () => void
  ) => Promise<void>;
}) {
  const handleAction = (
    action: CardSubmitAction | CardQuickReplyAction | CardLinkAction
  ) => {
    switch (action.type) {
      case 'link':
        window.open((action as CardLinkAction).payload.url);
        break;
      case 'quickReply':
        sendQuickReply((action as CardQuickReplyAction).payload.message);
        break;
      case 'submit':
        const payload = (action as CardSubmitAction).payload;
        handleFormSubmission(
          payload.formAction,
          payload.requestType,
          payload.formData,
          () => sendQuickReply(payload.text)
        );
        break;
    }
  };
  const [imageLoaded, setimageLoaded] = useState(false);

  const Card = (card: Card) => (
    <Flex
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      flexDirection="column"
      flex={1}
    >
      <Box w="full" position="relative" textAlign="center">
        <Image
          src={card.header.imgSrc}
          width="full"
          onLoad={() => setimageLoaded(true)}
        />
        {card.header.overlayText && (
          <Box
            position={imageLoaded ? 'absolute' : 'relative'}
            backgroundColor="white"
            top="50%"
            padding={2}
            borderTopRightRadius={'sm'}
            borderBottomRightRadius={'sm'}
          >
            <Text>{card.header.overlayText}</Text>
          </Box>
        )}
      </Box>
      <VStack alignItems="flex-start" padding={2} w="full">
        <HStack alignItems="center" w="full">
          {card.title && (
            <Heading as="h3" size="lg" color="text.500">
              {card.title}
            </Heading>
          )}
          {card.titleExt && <Text>{card.titleExt}</Text>}
        </HStack>
        {card.subtitle && (
          <Heading as="h5" size="sm" color="text.500" opacity={0.5} w="full">
            {card.subtitle}
          </Heading>
        )}
      </VStack>
      {card.description && (
        <Text color="text.500" padding={2} width="full">
          {card.description}
        </Text>
      )}
      {card.buttons && (
        <ButtonGroup autoFocus={false} alignItems="center" width="full">
          {card.buttons.map(button => (
            <Button
              autoFocus={false}
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
    </Flex>
  );
  try {
    const { payload } = getRichTextContentFromMetaData<Card[]>(metadata);
    return payload.length > 1 ? (
      <ChakraCarousel gap={2}>
        {payload.map(card => (
          <Card key={card.title} {...card} />
        ))}
      </ChakraCarousel>
    ) : (
      <Card {...payload[0]} />
    );
  } catch (e) {
    return <div />;
  } finally {
  }
}

export default CardMessage;
