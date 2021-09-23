import { MessageHandler, MessageHandlerData } from './base-handler';

const processMessageDeleted: MessageHandler = async (
  data: MessageHandlerData
) => {
  const { events } = data;
  if (events && events.onMessageDeleted) {
    const [messageKey, userId] = (data.messageData.message as string).split(
      ','
    );
    events.onMessageDeleted(userId, messageKey);
  }
};

export default processMessageDeleted;
