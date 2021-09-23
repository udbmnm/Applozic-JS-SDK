import { MessageHandler, MessageHandlerData } from './base-handler';

const processMessageRead: MessageHandler = async (data: MessageHandlerData) => {
  const { events } = data;
  if (events && events.onMessageRead) {
    const [messageKey, userId] = (data.messageData.message as string).split(
      ','
    );
    events.onMessageRead(userId, messageKey);
  }
};

export default processMessageRead;
