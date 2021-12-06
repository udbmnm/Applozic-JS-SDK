import React, { useCallback } from 'react';
import {
  getRichTextContentFromMetaData,
  Button,
  RichTextMetaData,
  SubmitButton,
  LinkButton,
  SuggestedResponseButton
} from '@applozic/core-sdk';

import {
  Button as ButtonUI,
  HStack,
  useWhyDidYouUpdate
} from '@chakra-ui/react';

const isSubmitButton = (button: any) => button.replyText;

const isLinkButton = (button: any) => button.type === 'link';

const isSuggestedReplyButton = (button: any) => button.title;

const getButtonInfo = (
  button: any,
  sendQuickReply: (text: string) => void,
  formAction: string | undefined,
  formData: { [key: string]: string } | undefined,
  requestType: 'json' | undefined,
  handleFormSubmission: (
    formAction: string,
    requestType: string | undefined,
    formData: {
      [key: string]: string;
    },
    callback: () => void
  ) => Promise<void>
) => {
  let key, buttonText, action;
  if (isSubmitButton(button)) {
    key = (button as SubmitButton).name;
    buttonText = (button as SubmitButton).name;
    const replyText = (button as SubmitButton).replyText;
    action = useCallback(() => {
      if (formAction && formData) {
        action = handleFormSubmission(formAction, requestType, formData, () =>
          sendQuickReply(replyText)
        );
      }
    }, [formAction, formData, requestType, replyText]);
  } else if (isLinkButton(button)) {
    key = (button as LinkButton).name;
    buttonText = (button as LinkButton).name;
    const url = (button as LinkButton).url;
    action = useCallback(() => {
      window.open((button as LinkButton).url);
    }, [url]);
  } else if (isSuggestedReplyButton(button)) {
    key = (button as SuggestedResponseButton).title;
    buttonText = (button as SuggestedResponseButton).title;
    const message = (button as SuggestedResponseButton).message;
    action = useCallback(() => {
      sendQuickReply(message);
    }, [message]);
  }
  return { key, buttonText, action };
};

interface ButtonMessageProps {
  metadata: RichTextMetaData;
  sendQuickReply: (text: string) => void;
  handleFormSubmission: (
    formAction: string,
    requestType: string | undefined,
    formData: {
      [key: string]: string;
    },
    callback: () => void
  ) => Promise<void>;
}

function ButtonMessage({
  metadata,
  sendQuickReply,
  handleFormSubmission
}: ButtonMessageProps) {
  useWhyDidYouUpdate('ButtonMessage', { metadata });
  try {
    const { payload, formAction, formData, requestType } =
      getRichTextContentFromMetaData<Button[]>(metadata);
    return (
      <HStack spacing={1}>
        {payload.map((button: Button) => {
          const { key, buttonText, action } = getButtonInfo(
            button,
            sendQuickReply,
            formAction,
            formData,
            requestType,
            handleFormSubmission
          );

          return (
            <ButtonUI
              autoFocus={false}
              key={key}
              size="sm"
              backgroundColor={'brand.primary'}
              color={'white'}
              onClick={action}
            >
              {buttonText}
            </ButtonUI>
          );
        })}
      </HStack>
    );
  } catch (e) {
    return <div />;
  }
}

export default ButtonMessage;
