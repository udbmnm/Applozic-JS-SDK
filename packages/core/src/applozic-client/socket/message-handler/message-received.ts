import { MessageHandler, MessageHandlerData } from './base-handler';

const processMessageReceived: MessageHandler = async (
  data: MessageHandlerData
) => {
  const { events } = data;
  if (events && events.onMessageReceived) {
    events.onMessageReceived(data.messageData);
  }
};

export default processMessageReceived;
