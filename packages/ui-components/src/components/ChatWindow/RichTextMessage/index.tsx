import React from 'react';
import {
  MessageMetaDataTemplateType,
  RichTextMetaData
} from '@applozic/core-sdk';
import {
  useColorModeValue as mode,
  useWhyDidYouUpdate
} from '@chakra-ui/react';
import ButtonMessage from './ButtonMessage';
import CardMessage from './CardsMessage';
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
  sendQuickReply: (text: string) => void;
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
  useWhyDidYouUpdate('RichTextMessage', {
    key,
    metadata,
    onFileClick,
    sendQuickReply
  });
  return (
    <MotionListItem
      key={key}
      initial={false}
      backgroundColor={
        metadata.template === MessageMetaDataTemplateType.IMAGE_CAPTION
          ? mode('#F2F0F5', '#2E2D32')
          : 'transparent'
      }
      listStyleType="none"
      borderRadius={'md'}
    >
      {getRichTextContent()}
    </MotionListItem>
  );
}

export default RichTextMessage;
