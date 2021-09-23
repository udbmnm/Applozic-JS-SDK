import React, { useEffect, useState } from 'react';
import type { EmojiData } from './emojis';
import EmojiItems from './EmojiItems';
import { getRecentEmojis, searchEmojis } from './store';
import { Box } from '@chakra-ui/react';

interface RecentEmojiProps {
  searchText?: string;
  emptyMessage?: string;
  onSelect?: (emoji: EmojiData) => void | Promise<void>;
}

const RecentEmojis = ({
  searchText,
  emptyMessage,
  onSelect
}: RecentEmojiProps) => {
  const [recentEmojis, setRecentEmojis] = useState<EmojiData[]>([]);
  useEffect(() => {
    const fetchRecentEmojis = async () => {
      setRecentEmojis(await getRecentEmojis());
    };
    fetchRecentEmojis();
  }, []);
  let emojiResult = recentEmojis;
  if (searchText) {
    emojiResult = searchEmojis(searchText, recentEmojis);
  }
  return (
    <Box height="100%">
      <EmojiItems
        emojiData={emojiResult}
        onSelect={onSelect}
        emptyMessage={emptyMessage}
      />
    </Box>
  );
};

export default RecentEmojis;
