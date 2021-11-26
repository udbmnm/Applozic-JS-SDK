import React from 'react';
import {
  MessageMetaDataTemplateType,
  RichTextMetaData
} from '@applozic/core-sdk';
import { useColorModeValue as mode } from '@chakra-ui/react';
import ButtonMessage from './ButtonMessage';
import CardCarouselMessage from './CardCarouselMessage';
import CardMessage from './CardMessage';
import ImageCaptionMessage from './ImageCaptionMessage';
import ListMessage from './ListMessage';
import MotionListItem from '../../MotionListItem';
import superagent from 'superagent';

function RichTextMessage({
  key,
  metadata,
  onFileClick,
  sendQuickReply
}: {
  key: string;
  metadata: RichTextMetaData;
  onFileClick: () => boolean | void;
  sendQuickReply: (text: string) => Promise<void>;
}) {
  const handleFormSubmission = async (
    formAction: string,
    requestType: string | undefined,
    formData: { [key: string]: string },
    callback: () => void
  ) => {
    if (requestType === 'json') {
      await superagent.post(formAction).send(formData).end();
      callback();
    }
  };
  const getRichTextContent = () => {
    switch (metadata.template) {
      case MessageMetaDataTemplateType.BUTTON:
        return <ButtonMessage metadata={metadata} />;
      case MessageMetaDataTemplateType.IMAGE_CAPTION:
        return (
          <ImageCaptionMessage metadata={metadata} onFileClick={onFileClick} />
        );
      case MessageMetaDataTemplateType.LIST:
        return (
          <ListMessage metadata={metadata} sendQuickReply={sendQuickReply} />
        );
      case MessageMetaDataTemplateType.CARD:
        return (
          <CardMessage
            metadata={metadata}
            sendQuickReply={sendQuickReply}
            handleFormSubmission={handleFormSubmission}
          />
        );
      default:
        return <div />;
    }
  };
  console.log({ metadata, template: metadata.template });

  return (
    <MotionListItem
      key={key}
      initial={false}
      layout
      backgroundColor={
        metadata.template === MessageMetaDataTemplateType.IMAGE_CAPTION
          ? mode('#F2F0F5', '#2E2D32')
          : 'transparent'
      }
      listStyleType="none"
      userSelect="none"
      borderRadius={'md'}
    >
      {getRichTextContent()}
    </MotionListItem>
  );
}

export default RichTextMessage;
