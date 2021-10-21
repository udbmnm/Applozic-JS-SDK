import { ChatType } from './ChatType';

interface RecentChat {
  /** The unique identifier for the contact {user.userId} for user chat and {group.clientGroupId} for group chat  */
  contactId: string;
  /** The enum value defining the type of chat */
  chatType: ChatType;
  /** The image URL for the specific chat */
  imageUrl?: string;
  /** The unique identifier for the last message in this chat  */
  lastMessageKey: string;
  /** The numeric timestamp of the last message in this chat  */
  lastMessageTime: number;
}

export default RecentChat;
