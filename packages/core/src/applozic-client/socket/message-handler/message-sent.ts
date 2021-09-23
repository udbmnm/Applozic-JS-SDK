import { MessageHandler, MessageHandlerData } from './base-handler';

const processMessageSent: MessageHandler = async (data: MessageHandlerData) => {
  const { events } = data;
  if (events && events.onMessageSent) {
    events.onMessageSent(data.messageData);
  }
};

export default processMessageSent;
