import { MessageStatus } from "../chat";

interface SidebarMeta {
  imageUrl?: string;
  name: string;
  lastMessageText: string;
  unreadCount?: number;
  isOnline?: boolean;
  lastSeenAt: Date;
  isLastMessageReply: boolean;
  lastMessageStatus?: MessageStatus;
  lastMessageDate?: Date;
}

export default SidebarMeta;
