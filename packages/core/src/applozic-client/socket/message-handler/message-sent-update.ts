import { MessageHandler, MessageHandlerData } from './base-handler';

const processMessageSentUpdate: MessageHandler = async (
  data: MessageHandlerData
) => {
  const { events } = data;
  if (events && events.onMessageSentUpdate) {
    events.onMessageSentUpdate(data.messageData);
  }
};

export default processMessageSentUpdate;
