import { FileMeta, MessageContentType } from '@applozic/core-sdk';
import MessageStatus from './MessageStatus';
import Reaction from './Reaction';

interface Message {
  key: string;
  messageText: string;
  isReply: boolean;
  timeStamp: Date;
  fromUserId: string;
  status?: MessageStatus;
  reactions?: Array<Reaction>;
  file?: FileMeta;
  metadata?: { [key: string]: string };
  contentType?: MessageContentType;
}

export default Message;
