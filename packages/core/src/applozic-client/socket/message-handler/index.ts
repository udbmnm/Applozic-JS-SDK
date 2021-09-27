import { MESSAGE_TYPE_CODES } from '../../models/Message';
import { MessageHandler, MessageHandlerData } from './base-handler';

import conversationDeleted from './conversation-deleted';
import conversationRead from './conversation-read';
import messageDeleted from './message-deleted';
import messageDelivered from './message-delivered';
import messageRead from './message-read';
import messageReceived from './message-received';
import messageSentUpdate from './message-sent-update';
import messageSent from './message-sent';
import userActivated from './user-activated';
import userBlocked from './user-blocked';
import userConnect from './user-connect';
import userDeactivated from './user-deactivated';
import userDisconnect from './user-disconnect';
import userOnlineStatus from './user-online-status';
import userUnblocked from './user-unblocked';

interface MessageHandlerMap {
  [key: string]: MessageHandler;
}

const handlers: MessageHandlerMap = {
  [MESSAGE_TYPE_CODES.CONVERSATION_DELETED]: conversationDeleted,

  [MESSAGE_TYPE_CODES.CONVERSATION_READ]: conversationRead,

  [MESSAGE_TYPE_CODES.MESSAGE_DELETED]: messageDeleted,

  [MESSAGE_TYPE_CODES.MESSAGE_DELIVERED_1]: messageDelivered,
  [MESSAGE_TYPE_CODES.MESSAGE_DELIVERED_1]: messageDelivered,

  [MESSAGE_TYPE_CODES.MT_MESSAGE_DELIVERED_READ_1]: messageRead,
  [MESSAGE_TYPE_CODES.MT_MESSAGE_DELIVERED_READ_2]: messageRead,

  [MESSAGE_TYPE_CODES.MESSAGE_RECEIVED_1]: messageReceived,
  [MESSAGE_TYPE_CODES.MESSAGE_RECEIVED_2]: messageReceived,

  [MESSAGE_TYPE_CODES.MESSAGE_SENT_UPDATE]: messageSentUpdate,

  [MESSAGE_TYPE_CODES.MESSAGE_SENT]: messageSent,

  [MESSAGE_TYPE_CODES.USER_ACTIVATED]: userActivated,

  [MESSAGE_TYPE_CODES.USER_BLOCKED]: userBlocked,

  [MESSAGE_TYPE_CODES.USER_CONNECT]: userConnect,
  [MESSAGE_TYPE_CODES.USER_ONLINE_STATUS]: userOnlineStatus,

  [MESSAGE_TYPE_CODES.USER_DEACTIVATED]: userDeactivated,

  [MESSAGE_TYPE_CODES.USER_DISCONNECT]: userDisconnect,

  [MESSAGE_TYPE_CODES.USER_UNBLOCKED]: userUnblocked
};

export const processMessage: MessageHandler = (data: MessageHandlerData) => {
  if (handlers[data.messageData.type]) {
    return handlers[data.messageData.type](data);
  }
  // console.warn(`Could not process message with type ${data.messageData.type}`);
};
