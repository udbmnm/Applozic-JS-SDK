import { MessageHandler, MessageHandlerData } from './base-handler';

const processMessageDelivered: MessageHandler = async (
  data: MessageHandlerData
) => {
  const { events } = data;
  if (events && events.onMessageDelivered) {
    const [messageKey, userId] = (data.messageData.message as string).split(
      ','
    );
    events.onMessageDelivered(messageKey, userId);
  }
};

export default processMessageDelivered;
