import { RecentChat } from '../models/chat';

export const mergeRecentChats = (
  a: RecentChat[],
  b: RecentChat[]
): RecentChat[] => {
  const finalContactIds = new Set<string>();

  const aMap = new Map<string, RecentChat>();
  const bMap = new Map<string, RecentChat>();

  a.forEach(a => {
    aMap.set(a.contactId, a);
    finalContactIds.add(a.contactId);
  });
  b.forEach(b => {
    bMap.set(b.contactId, b);
    finalContactIds.add(b.contactId);
  });

  const finalChats = Array.from(finalContactIds).map(contactId => {
    const aChat = aMap.get(contactId);
    const bChat = bMap.get(contactId);

    if (aChat && bChat) {
      if (aChat.lastMessageTime > bChat.lastMessageTime) {
        return aChat;
      }
      return bChat;
    } else if (aChat) {
      return aChat;
    }

    return bChat as RecentChat; // guaranteed to be defined
  });

  return finalChats.sort((a, b) => b.lastMessageTime - a.lastMessageTime);
};
