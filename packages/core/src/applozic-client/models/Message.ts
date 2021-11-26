import FileMeta from './FileMeta';

export enum MESSAGE_CATEGORY {
  HIDDEN = 'HIDDEN',
  PUSHNOTIFICATION = 'PUSHNOTIFICATION',
  ARCHIVE = 'ARCHIVE'
}

export enum MessageContentType {
  TEXT = 0,
  FILE = 1,
  LOCATION = 2
}

export enum MessageType {
  OTHERS = 4,
  MINE = 5
}

export interface Message {
  /** if present, this is a group message */
  clientGroupId?: string;
  /** if message is in a group, it specifies from which user **/
  contactIds: string;
  contentType: MessageContentType;
  createdAtTime: number;
  delivered: boolean;
  groupId?: number;
  key: string;
  message: string;
  metadata?: {
    [key: string]: string | number | boolean; // TODO validate type of values in metadata
    category?: MESSAGE_CATEGORY;
  };
  pairedMessageKey?: string;
  read: boolean;
  sent: boolean;
  source: number;
  status: number;
  to: string;
  type: MessageType | number;
  userKey: string;
  fileMeta?: FileMeta;
}
export interface IncomingMessage {
  id: string;
  message: MessageData | string;
  messageMetaData: MessageMetaData;
  notifyUser: boolean;
  sendAlert: boolean;
  totalUnreadCount: number;
  type: MESSAGE_TYPE_CODES;
}

export interface MessageData extends Message {
  alert: boolean;
  applicationKey: string;
  createdAt: string;
  deliveredValue: number;
  sendToDevice: boolean;
  senderName: string;
  shared: boolean;
  skipUpdationForAdmin: boolean;
  unicodePresent: boolean;
}

interface MessageMetaData {
  notifyUser: boolean;
  sendAlert: boolean;
  totalUnreadCount: number;
  type: string;
}

export enum MESSAGE_TYPE_CODES {
  MESSAGE_DELIVERED_1 = 'APPLOZIC_04',
  MESSAGE_DELIVERED_2 = 'MESSAGE_DELIVERED',
  MT_MESSAGE_DELIVERED_READ_1 = 'APPLOZIC_08',
  MT_MESSAGE_DELIVERED_READ_2 = 'MT_MESSAGE_DELIVERED_READ',
  MESSAGE_DELETED = 'APPLOZIC_05',
  CONVERSATION_DELETED = 'APPLOZIC_27',
  USER_CONNECT = 'APPLOZIC_11',
  USER_ONLINE_STATUS = 'APPLOZIC_25',
  USER_DISCONNECT = 'APPLOZIC_12',
  CONVERSATION_DELIVERED_AND_READ = 'APPLOZIC_10',
  CONVERSATION_READ = 'APPLOZIC_28',
  USER_BLOCKED = 'APPLOZIC_16',
  USER_UNBLOCKED = 'APPLOZIC_17',
  USER_ACTIVATED = 'APPLOZIC_18',
  USER_DEACTIVATED = 'APPLOZIC_19',
  // Deprecated
  MESSAGE_RECEIVED_1 = 'APPLOZIC_01',
  MESSAGE_RECEIVED_2 = 'MESSAGE_RECEIVED',
  MESSAGE_SENT = 'APPLOZIC_02',
  // Deprecated
  MESSAGE_SENT_UPDATE = 'APPLOZIC_03'
}

export interface SendMessageRes {
  messageKey: string;
  createdAt: number;
}

export interface BaseSendMessageReq {
  message: string;
  metadata?: { [key: string]: string };
  contentType?: MessageContentType;
  fileMeta?: FileMeta;
  type?: MessageType;
}

export interface BaseBroadcastMessageReq {
  messageObject: {
    message: string;
  };
}

export interface SendMessageUserReq extends BaseSendMessageReq {
  /** userId of receiver */
  to: string;
}

export interface SendMetaDataUserReq<T> {
  /** userId of receiver */
  to: string;
  metadata: T;
}

export interface SendMessageGroupReq extends BaseSendMessageReq {
  /** Id of group to send message to */
  clientGroupId: string;
}

export interface SendMetaDataGroupReq<T> {
  /** Id of group to send metadata to */
  clientGroupId: string;
  metadata: T;
}

export interface SendMessageUserBroadcastReq extends BaseBroadcastMessageReq {
  /** Id of group to send message to */
  userNames: string[];
}

export interface SendMessageGroupBroadcastReq extends BaseBroadcastMessageReq {
  /** Id of group to send message to */
  clientGroupIds: string[];
}

export type SendMetaDataReq<T> =
  | SendMetaDataUserReq<T>
  | SendMetaDataGroupReq<T>;

export type SendMessageReq =
  | SendMessageUserReq
  | SendMessageGroupReq
  | SendMessageUserBroadcastReq
  | SendMessageGroupBroadcastReq;
