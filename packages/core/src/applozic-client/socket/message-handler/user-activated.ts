import { MessageHandler, MessageHandlerData } from './base-handler';

const processUserActivated: MessageHandler = async (
  data: MessageHandlerData
) => {
  const { events } = data;
  if (events && events.onUserActivated) {
    events.onUserActivated(data.messageData);
  }
};

export default processUserActivated;
