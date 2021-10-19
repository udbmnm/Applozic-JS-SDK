import ActiveChat from "./ActiveChat";
import { ChatType } from "./ChatType";

interface RecentChat {
  contactId: string;
  chatType: ChatType;
  imageUrl?: string;
  lastMessageKey: string;
  lastMessageTime: number;
}

export default RecentChat;
