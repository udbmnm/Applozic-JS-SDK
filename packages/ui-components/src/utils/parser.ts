import {
  Group,
  GroupTypes,
  Message,
  MessageContentType,
  MessageType,
  User,
  FileMeta
} from '@applozic/core-sdk';
import {
  MessageStatus,
  Message as UIMessage,
  RecentChat
} from '../models/chat';
import { SidebarMeta } from '../models/sidebar';
import { ChatType } from '../models/chat';

export interface INewMessage {
  metadata: { [key: string]: string };
  to?: string;
  clientGroupId?: string;
  message: string;
  fileMeta?: FileMeta;
  contentType?: MessageContentType;
}

export interface INewGroup {
  groupName: string;
  imageUrl?: string;
  type: GroupTypes;
  memberIds?: string[];
  // metadata: { [key: string]: string };
}

// Reference
// https://github.com/AppLozic/Applozic-Web-Plugin/blob/ac1360c6f6c6002d8008ba1ef287aed87b08de5d/public/plugin/js/app/modules/message/applozic.message.js#L66
export const getMessageStatusFromMessage = (message: Message) => {
  const { type, status, source } = message;
  if (type === 7 || type === 6 || type === MessageType.OTHERS || type === 0) {
    return MessageStatus.RECEIVED;
  }

  if (status === 5) {
    return MessageStatus.READ;
  }

  if (status === 4) {
    return MessageStatus.DELIVERED;
  }

  if (
    type === 3 ||
    type === MessageType.MINE ||
    (type === 1 && (source === 0 || source === 1))
  ) {
    return MessageStatus.SENT;
  }

  return MessageStatus.UNKONWN;
};

export const getUIMessageFromClientMessage = (message: Message) => {
  return {
    key: message.key,
    messageText: message.message,
    fromUserId: message.contactIds,
    timeStamp: message?.createdAtTime
      ? new Date(message.createdAtTime as number)
      : new Date(),
    status: getMessageStatusFromMessage(message),
    isReply: message.type === MessageType.MINE,
    file: message.fileMeta,
    metadata: message.metadata,
    contentType: message.contentType
  } as UIMessage;
};

export const getUIMessageFromNewMessage = (
  { to, clientGroupId, message, fileMeta, metadata, contentType }: INewMessage,
  key: string
): UIMessage => {
  return {
    key: key,
    messageText: message,
    fromUserId: to ?? clientGroupId ?? '',
    timeStamp: new Date(),
    isReply: true,
    file: fileMeta,
    status: MessageStatus.PENDING,
    metadata,
    contentType
  };
};
export const getRecentChatFromGroup = (group: Group): RecentChat => {
  return {
    /** Name to display in contact list pance. Either user or group name */
    contactId: group.clientGroupId,
    lastMessageKey: 'Start a conversation',
    imageUrl: group.imageUrl,
    lastMessageTime: Date.now(),
    chatType: ChatType.GROUP
  };
};

export const getRecentChatFromNewContact = (
  contactName: string
): RecentChat => {
  return {
    /** Name to display in contact list pance. Either user or group name */
    contactId: contactName,
    lastMessageKey: 'Start a conversation',
    lastMessageTime: Date.now(),
    chatType: ChatType.USER
  };
};

interface InteractionInfo {
  imageUrl?: string;
  name: string;
  unreadCount?: number;
  isOnline?: boolean;
  lastSeenAt: Date;
}

export const getSidebarMeta = (
  message: Message | undefined,
  contact?: User,
  group?: Group
): SidebarMeta => {
  let interactionInfo = {};
  if (contact) {
    interactionInfo = {
      imageUrl: contact.imageLink,
      name: contact.displayName ?? contact.email ?? (contact.userId as string),
      isOnline: contact.connected,
      lastSeenAt: new Date(contact.lastSeenAtTime),
      unreadCount: contact.unreadCount
    };
  }
  if (group) {
    interactionInfo = {
      imageUrl: group.imageUrl,
      name: group.name ?? (group.clientGroupId as string),
      lastSeenAt: new Date(group.updatedAtTime as number),
      unreadCount: group.unreadCount
    };
  }
  return {
    ...(interactionInfo as InteractionInfo),
    lastMessageText: message?.message ?? message?.fileMeta?.name ?? '',
    isLastMessageReply: message?.type === MessageType.MINE,
    lastMessageStatus: message
      ? getMessageStatusFromMessage(message)
      : MessageStatus.UNKONWN,
    lastMessageDate: message?.createdAtTime
      ? new Date(message.createdAtTime)
      : new Date()
  };
};
