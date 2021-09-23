import { MessageHandler, MessageHandlerData } from './base-handler';

const processUserDisconnect: MessageHandler = async (
  data: MessageHandlerData
) => {
  const { events } = data;
  if (events && events.onUserDisconnect) {
    events.onUserDisconnect(data.messageData);
  }
};

export default processUserDisconnect;
