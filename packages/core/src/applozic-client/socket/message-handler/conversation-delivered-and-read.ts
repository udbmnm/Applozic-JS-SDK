import { MessageHandler, MessageHandlerData } from './base-handler';

const processConversationReadFromOtherSource: MessageHandler = async (
  data: MessageHandlerData
) => {
  const { events } = data;
  if (events && events.onConversationDeliveredAndRead) {
    const userId = data.messageData.message as string;
    events.onConversationDeliveredAndRead(userId);
  }
};

export default processConversationReadFromOtherSource;
