import { MessageHandler, MessageHandlerData } from './base-handler';

const processUserUnblocked: MessageHandler = async (
  data: MessageHandlerData
) => {
  const { events } = data;
  if (events && events.onUserUnblocked) {
    events.onUserUnblocked(data.messageData);
  }
};

export default processUserUnblocked;
