import React from 'react';
import {
  InputGroup,
  InputLeftElement,
  Input,
  VStack,
  Box,
  Spacer
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import GiphySearchGrid from './GiphySearchGrid';
import EmojiItems from './EmojiItems';
import RecentEmojiList from './RecentEmojiList';
import BottomCategoryTabs from './BottomCategoryTabs';
import { searchEmojis } from './store';
import SmileyCategoryStrip, { EMOJI_CATEGORY } from './SmileyCategoryStrip';
import { emojis, EmojiData } from './emojis';

const EmojiCategoryMap: { [key: string]: EmojiData[] } = {};
emojis.forEach(emoji => {
  if (!EmojiCategoryMap[emoji.category]) {
    EmojiCategoryMap[emoji.category] = [];
  }
  EmojiCategoryMap[emoji.category].push(emoji);
});

export enum BOTTOM_CATEGORIES {
  RECENT = 'recent',
  SMILEYS = 'smileys',
  GIF = 'gif'
}

export interface EmojiPickerProps {
  giphyApiKey?: string;
  defaultSearchText?: string;
  defaultCategory?: EMOJI_CATEGORY;
  defaultBottomCategory?: BOTTOM_CATEGORIES;
  onEmojiSelected?: (emoji: EmojiData) => void;
  onGifSelected?: (gif: File) => void;
}

const EmojiPicker = ({
  giphyApiKey,
  defaultSearchText,
  defaultCategory,
  defaultBottomCategory,
  onEmojiSelected,
  onGifSelected
}: EmojiPickerProps) => {
  const [searchText, setSearchText] = React.useState(defaultSearchText ?? '');
  const [
    activeSmileyCategory,
    setActiveSmileyCategory
  ] = React.useState<EMOJI_CATEGORY>(defaultCategory ?? EMOJI_CATEGORY.SMILEYS);
  const [
    activeBottomCategory,
    setActiveBottomCategory
  ] = React.useState<BOTTOM_CATEGORIES>(
    defaultBottomCategory ?? BOTTOM_CATEGORIES.SMILEYS
  );

  const onEmojiClick = (item: EmojiData) => {
    if (onEmojiSelected) {
      onEmojiSelected(item);
    }
  };

  const onGifClick = (gif: File) => {
    if (onGifSelected) {
      onGifSelected(gif);
    }
  };

  const onBottomCategoryClick = (item: BOTTOM_CATEGORIES) => {
    setActiveBottomCategory(item);
  };

  let smileyData: EmojiData[] = [];
  if (searchText) {
    smileyData = searchEmojis(searchText);
  } else {
    smileyData = EmojiCategoryMap[activeSmileyCategory];
  }

  interface IGiphySearchProps {
    giphyApiKey: string;
  }

  function GiphySearch({ giphyApiKey }: IGiphySearchProps) {
    return (
      <GiphySearchGrid
        giphyApiKey={giphyApiKey}
        searchText={searchText}
        onGifClick={gif => {
          if (onGifSelected) {
            onGifSelected(gif);
          }
        }}
      />
    );
  }

  function GetRecentEmojis() {
    return (
      <RecentEmojiList
        onSelect={onEmojiClick}
        searchText={searchText}
        emptyMessage={
          searchText.length > 0 ? 'No recent emojis found' : 'No recent emojis'
        }
      />
    );
  }

  const bottomCategories = [
    BOTTOM_CATEGORIES.RECENT,
    BOTTOM_CATEGORIES.SMILEYS
  ];
  if (giphyApiKey) {
    bottomCategories.push(BOTTOM_CATEGORIES.GIF);
  }

  return (
    <VStack
      spacing={1}
      align="stretch"
      height="408px"
      width="296px"
      border="1px solid #e0e0e0"
      borderRadius="8px"
      bg="white"
    >
      <Box padding="12px">
        <InputGroup>
          <InputLeftElement
            pointerEvents="none"
            children={<SearchIcon color="gray.300" />}
          />
          <Input
            type="text"
            placeholder="Search"
            value={searchText}
            onChange={e => setSearchText(e.target.value.toString())}
          />
        </InputGroup>
      </Box>

      {activeBottomCategory === BOTTOM_CATEGORIES.RECENT && (
        <Box
          height="302px"
          width="100%"
          style={{ marginLeft: '7px', overflowY: 'auto' }}
          overflowY="auto"
        >
          <GetRecentEmojis />
        </Box>
      )}

      {activeBottomCategory === BOTTOM_CATEGORIES.SMILEYS && (
        <VStack width="100%">
          <SmileyCategoryStrip
            activeCategory={activeSmileyCategory}
            onCategoryChange={category => setActiveSmileyCategory(category)}
          />
          <Box
            height="259px"
            width="100%"
            style={{ marginLeft: '14px', overflowY: 'auto' }}
          >
            <EmojiItems emojiData={smileyData} onSelect={onEmojiClick} />
          </Box>
        </VStack>
      )}

      {activeBottomCategory === BOTTOM_CATEGORIES.GIF && giphyApiKey && (
        <GiphySearch giphyApiKey={giphyApiKey} />
      )}

      <Spacer height="0px" />

      <Box
        width="100%"
        style={{
          borderTop: '1px solid #e0e0e0'
        }}
      >
        <BottomCategoryTabs
          categories={bottomCategories}
          activeCategory={activeBottomCategory}
          onCategoryClick={onBottomCategoryClick}
        />
      </Box>
    </VStack>
  );
};

export default EmojiPicker;
