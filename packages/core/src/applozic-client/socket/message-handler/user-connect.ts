import { MessageHandler, MessageHandlerData } from './base-handler';

const processUserConnect: MessageHandler = async (data: MessageHandlerData) => {
  const { events } = data;
  if (events && events.onUserConnect) {
    events.onUserConnect(data.messageData);
  }
};

export default processUserConnect;
