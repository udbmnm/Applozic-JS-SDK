import React from 'react';
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
  Button
} from '@chakra-ui/react';
import ChakraCarousel from './Carousel';

function CardMessage({
  metadata,
  sendQuickReply,
  handleFormSubmission
}: {
  metadata: RichTextMetaData;
  sendQuickReply: (text: string) => Promise<void>;
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

  const Card = (card: Card) => (
    <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden">
      {card.header.imgSrc && (
        <Box width="full" position="relative" textAlign="center">
          <Image src={card.header.imgSrc} width="full" />
          {card.header.overlayText && (
            <Box
              position="absolute"
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
      )}
      <VStack alignItems="flex-start" padding={2}>
        <HStack alignItems="center">
          {card.title && (
            <Heading as="h3" size="lg" color="text.500">
              {card.title}
            </Heading>
          )}
          {card.titleExt && <Text>{card.titleExt}</Text>}
        </HStack>
        {card.subtitle && (
          <Heading as="h5" size="sm" color="text.500" opacity={0.5}>
            {card.subtitle}
          </Heading>
        )}
      </VStack>
      {card.description && <Text color="text.500">{card.description}</Text>}
      {card.buttons && (
        <ButtonGroup alignItems="center" width="full">
          {card.buttons.map(button => (
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
  try {
    const { payload } = getRichTextContentFromMetaData<Card[]>(metadata);
    return payload.length > 1 ? (
      <ChakraCarousel gap={10}>
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
