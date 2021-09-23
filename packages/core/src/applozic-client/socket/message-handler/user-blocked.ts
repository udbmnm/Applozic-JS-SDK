import { MessageHandler, MessageHandlerData } from './base-handler';

const processUserBlocked: MessageHandler = async (data: MessageHandlerData) => {
  const { events } = data;
  if (events && events.onUserBlocked) {
    events.onUserBlocked(data.messageData);
  }
};

export default processUserBlocked;
