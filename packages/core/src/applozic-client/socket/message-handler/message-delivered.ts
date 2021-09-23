import { MessageHandler, MessageHandlerData } from './base-handler';

const processMessageDelivered: MessageHandler = async (
  data: MessageHandlerData
) => {
  const { events } = data;
  if (events && events.onMessageDelivered) {
    events.onMessageDelivered(data.messageData);
  }
};

export default processMessageDelivered;
