import { MessageHandler, MessageHandlerData } from './base-handler';

const processUserOnlineStatus: MessageHandler = async (
  data: MessageHandlerData
) => {
  const { events, messageData } = data;
  if (events && events.onUserOnlineStatus) {
    const [userId, status, timestampString] = (
      messageData.message as string
    ).split(',');

    const isOnline = status === '1';
    const timestamp = parseInt(timestampString);
    events.onUserOnlineStatus(userId, isOnline, timestamp);
  }
};

export default processUserOnlineStatus;
