import React from 'react';
import { EmojiData } from './emojis';
import { udpateRecentEmojis } from './store';
import { Box, Center, Grid, Text } from '@chakra-ui/react';

interface EmojiItemsOptions {
  emojiData: EmojiData[];
  emptyMessage?: string;
  onSelect?: (emoji: EmojiData) => void | Promise<void>;
}
const EmojiItems = ({
  emojiData,
  emptyMessage,
  onSelect
}: EmojiItemsOptions) => {
  emptyMessage = emptyMessage ?? 'No results';
  const onEmojiSelected = (emoji: EmojiData) => {
    if (onSelect) {
      onSelect(emoji);
    }
    udpateRecentEmojis(emoji);
  };
  const items = emojiData.map((emoji, key) => (
    <Box
      width="100%"
      key={key}
      onClick={() => onEmojiSelected(emoji)}
      cursor="pointer"
      style={{
        height: '24px'
      }}
    >
      <Text>{emoji.emoji}</Text>
    </Box>
  ));
  const NoItemsFound = () => (
    <Box width="100%" height="100%">
      <Center width="100%" height="100%">
        <Text fontSize="13px" color="textHeader.500">
          {emptyMessage}
        </Text>
      </Center>
    </Box>
  );
  return (
    <>
      {items.length === 0 && <NoItemsFound />}
      {items.length > 0 && (
        <Grid width="100%" templateColumns="repeat(8, 1fr)">
          {items}
        </Grid>
      )}
    </>
  );
};

export default EmojiItems;
