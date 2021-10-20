import { IncomingMessage } from '../models/Message';

interface SocketMessageEvent {
  (message: IncomingMessage): void | Promise<void>;
}

interface MessageUpdateEvent {
  (contactId: string, messageKey: string): void | Promise<void>;
}

interface TypingStatusMessage {
  (userId: string, status: number): void | Promise<void>;
}

interface UserOnlineMessage {
  (userId: string, isOnline: boolean, timestamp: number): void | Promise<void>;
}

interface ConversationUpdateEvent {
  (userId: string): void | Promise<void>;
}

/**
 * Define callbacks for realtime events.
 *
 * For usage, see {@link ApplozicClient}
 */
export interface SocketEventListener {
  onConnect?: () => void | Promise<void>;
  onConversationDeleted?: ConversationUpdateEvent;
  onConversationDeliveredAndRead?: ConversationUpdateEvent;
  onConversationReadFromOtherSource?: SocketMessageEvent;
  onConversationRead?: ConversationUpdateEvent;
  onMessageDeleted?: MessageUpdateEvent;
  onMessageDelivered?: SocketMessageEvent;
  onMessageRead?: MessageUpdateEvent;
  onMessageReceived?: SocketMessageEvent;
  onMessageSentUpdate?: SocketMessageEvent;
  onMessageSent?: SocketMessageEvent;
  onTypingStatus?: TypingStatusMessage;
  onUserActivated?: SocketMessageEvent;
  onUserBlocked?: SocketMessageEvent;
  onUserConnect?: SocketMessageEvent;
  onUserDeactivated?: SocketMessageEvent;
  onUserDisconnect?: SocketMessageEvent;
  onUserOnlineStatus?: UserOnlineMessage;
  onUserUnblocked?: SocketMessageEvent;
}
