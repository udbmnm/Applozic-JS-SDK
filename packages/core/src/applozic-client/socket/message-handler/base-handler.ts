import { IncomingMessage } from '../../models/Message';
import { SocketEventListener } from '../socket-events';

export interface MessageHandlerData {
  messageData: IncomingMessage;
  events?: SocketEventListener;
}

export interface MessageHandler {
  (handlerData: MessageHandlerData): Promise<void> | void;
}
