import { Message } from '../models/chat';

export const mergeMessages = (fetchMessages: Message[], cacheMessages: Message[]) => {
  const finalKeysSet = new Set<string>();

  const webUiKeysFromFetchSet = new Set<string>();

  const messageKeysInFetchSet = new Set<string>();
  const messageKeysInCacheSet = new Set<string>();

  const keyToMessageFetchMap = new Map<string, Message>();
  const keyToMessageCacheMap = new Map<string, Message>();

  fetchMessages.forEach(message => {
    finalKeysSet.add(message.key);
    messageKeysInFetchSet.add(message.key);
    keyToMessageFetchMap.set(message.key, message);
    if (message.metadata?.webUiKey) {
      webUiKeysFromFetchSet.add(message.metadata.webUiKey);
    }
  });

  cacheMessages.forEach(message => {
    finalKeysSet.add(message.key);
    messageKeysInCacheSet.add(message.key);
    keyToMessageCacheMap.set(message.key, message);
  });

  const finalKeys = Array.from(finalKeysSet);
  return finalKeys
    .filter(key => !webUiKeysFromFetchSet.has(key)) // Remove messages which server received
    .map(key => {
      const cacheItem = keyToMessageCacheMap.get(key);
      const fetchItem = keyToMessageFetchMap.get(key);

      if (fetchItem && fetchItem.metadata?.webUiKey) {
        // Try to fetch the time stamp from cache if available
        // This is to avoid the message jumping up and down when sending a lot of
        // message one by one. There is the change the message look out of order
        const webUiKey = fetchItem.metadata.webUiKey;
        const cachedPendingMessage = keyToMessageCacheMap.get(webUiKey);
        if (cachedPendingMessage) {
          fetchItem.timeStamp = cachedPendingMessage.timeStamp;
        }
        return fetchItem;
      }
      return (fetchItem as Message) ?? (cacheItem as Message);
    })
    .sort(
      (a, b) => (a.timeStamp.getTime() ?? 0) - (b.timeStamp.getTime() ?? 0)
    );
};
