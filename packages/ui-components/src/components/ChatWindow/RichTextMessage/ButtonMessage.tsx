import React from 'react';
import {
  getRichTextContentFromMetaData,
  Button,
  RichTextMetaData,
  SubmitButton,
  LinkButton,
  SuggestedResponseButton
} from '@applozic/core-sdk';

import { Button as ButtonUI, HStack } from '@chakra-ui/react';

const isSubmitButton = (button: any) => button.replyText;

const isLinkButton = (button: any) => button.type === 'link';

const isSuggestedReplyButton = (button: any) => button.title;

function ButtonMessage({ metadata }: { metadata: RichTextMetaData }) {
  try {
    const { payload } = getRichTextContentFromMetaData<Button[]>(metadata);
    return (
      <HStack spacing={1}>
        {payload.map((button: Button) => {
          let key, buttonText;
          if (isSubmitButton(button)) {
            key = (button as SubmitButton).name;
            buttonText = (button as SubmitButton).name;
          } else if (isLinkButton(button)) {
            key = (button as LinkButton).name;
            buttonText = (button as LinkButton).name;
          } else if (isSuggestedReplyButton(button)) {
            key = (button as SuggestedResponseButton).title;
            buttonText = (button as SuggestedResponseButton).title;
          }
          return (
            <ButtonUI
              key={key}
              size="sm"
              backgroundColor={'brand.primary'}
              color={'white'}
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
