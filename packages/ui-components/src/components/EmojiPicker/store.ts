import ApplozicStore, { CHAT_META } from '@applozic/local-store';
import { emojis, EmojiData } from './emojis';
const store = new ApplozicStore(CHAT_META.name);

export const getRecentEmojis = async (): Promise<EmojiData[]> => {
  const recentEmojis = await store.getItem<string[]>(
    CHAT_META.keys.RECENT_EMOJIS
  );
  if (recentEmojis) {
    const recentSet = new Set(recentEmojis);
    const filteredRecentEmojis = emojis.filter(item =>
      recentSet.has(item.emoji)
    );
    return filteredRecentEmojis
      .sort(
        (a, b) => recentEmojis.indexOf(a.emoji) - recentEmojis.indexOf(b.emoji)
      )
      .slice(0, 112);
  }
  return [];
};

export const udpateRecentEmojis = async (emoji: EmojiData): Promise<void> => {
  let recentEmojis = await store.getItem<string[]>(
    CHAT_META.keys.RECENT_EMOJIS
  );
  let finalRecentEmojis: string[] = [];
  if (recentEmojis) {
    recentEmojis = recentEmojis.filter(item => item !== emoji.emoji);
    finalRecentEmojis = [emoji.emoji, ...recentEmojis];
    finalRecentEmojis = finalRecentEmojis.slice(0, 112);
  } else {
    finalRecentEmojis.push(emoji.emoji);
  }
  await store.setItem(CHAT_META.keys.RECENT_EMOJIS, finalRecentEmojis);
};

export const searchEmojis = (
  searchText: string,
  emojiList = emojis
): EmojiData[] => {
  let emojiData: EmojiData[] = [];
  emojiData = emojiList.filter(emoji => {
    const stringToSearch = `${emoji.description} ${
      emoji.category
    } ${emoji.aliases.join(' ')} ${emoji.tags.join(' ')}`.toLocaleLowerCase();
    return stringToSearch.includes(searchText.toLocaleLowerCase());
  });
  return emojiData.sort((a, b) => {
    const aTokens = [
      ...a.description.split(' '),
      ...a.category.split(' & '),
      ...a.aliases,
      ...a.tags
    ].map(item => item.toLocaleLowerCase());
    if (new Set(aTokens).has(searchText.toLocaleLowerCase())) {
      return -1;
    }

    const bTokens = [...b.description.split(' '), ...b.aliases, ...b.tags].map(
      item => item.toLocaleLowerCase()
    );
    if (new Set(bTokens).has(searchText.toLocaleLowerCase())) {
      return 1;
    }

    return 0;
  });
};
