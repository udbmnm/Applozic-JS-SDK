import { MessageHandler, MessageHandlerData } from './base-handler';

const processConversationRead: MessageHandler = async (
  data: MessageHandlerData
) => {
  const { events } = data;
  if (events && events.onConversationRead) {
    const [userId] = (data.messageData.message as string).split(',');
    events.onConversationRead(userId);
  }
};

export default processConversationRead;
