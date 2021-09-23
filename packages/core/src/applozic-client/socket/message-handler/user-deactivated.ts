import { MessageHandler, MessageHandlerData } from './base-handler';

const processUserDeactivated: MessageHandler = async (
  data: MessageHandlerData
) => {
  const { events } = data;
  if (events && events.onUserDeactivated) {
    events.onUserDeactivated(data.messageData);
  }
};

export default processUserDeactivated;
