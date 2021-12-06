import React, { useCallback } from 'react';
import {
  Box,
  Popover,
  PopoverArrow,
  PopoverContent,
  PopoverTrigger
} from '@chakra-ui/react';
import EmojiPicker from '../EmojiPicker';
import { EmojiData } from '../EmojiPicker/emojis';
import Icon from '../Icon';

export interface EmojiPopupProps {
  giphyApiKey?: string;
  onEmojiSelected?: (emoji: string) => void;
  onGifSelected?: (file: File) => void;
}

const EmojiPopup = ({
  giphyApiKey,
  onEmojiSelected,
  onGifSelected
}: EmojiPopupProps) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const toggle = useCallback(() => {
    setIsOpen(!isOpen);
  }, []);
  const close = useCallback(() => {
    setIsOpen(false);
  }, []);
  const onEmojiClick = (emoji: EmojiData) => {
    if (onEmojiSelected) {
      onEmojiSelected(emoji.emoji);
    }
    close();
  };

  const onGifClick = (file: File) => {
    if (onGifSelected) {
      onGifSelected(file);
    }
    close();
  };

  return (
    <Popover
      placement="top-start"
      isOpen={isOpen}
      onClose={close}
      returnFocusOnClose={true}
      closeOnBlur={false}
    >
      <PopoverTrigger>
        <Box onClick={toggle} cursor="pointer">
          <Icon icon={'emoji'} size={18} color={'textMain.400'} />
        </Box>
      </PopoverTrigger>
      <PopoverContent width="auto">
        <PopoverArrow />
        <EmojiPicker
          giphyApiKey={giphyApiKey}
          onEmojiSelected={onEmojiClick}
          onGifSelected={onGifClick}
        />
      </PopoverContent>
    </Popover>
  );
};

export default EmojiPopup;
