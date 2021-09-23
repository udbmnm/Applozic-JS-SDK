import { MessageHandler, MessageHandlerData } from './base-handler';

const processConversationDeleted: MessageHandler = async (
  data: MessageHandlerData
) => {
  const { events } = data;
  if (events && events.onConversationDeleted) {
    const [userId] = (data.messageData.message as string).split(',');
    events.onConversationDeleted(userId);
  }
};

export default processConversationDeleted;
