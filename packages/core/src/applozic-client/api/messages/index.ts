import BaseClient from '../../base';
import deleteAllMessagesBuilder from './delete-all';
import deleteConversationBuilder from './delete-conversation';
import deleteMessagesOlderThanBuilder from './delete-older-than';
import deleteMessageBuilder from './delete';
import messageInfoBuilder from './info';
import messageListBuilder from './list';
import sendMessageBuilder from './send';

const messagesApiBuilder = (client: BaseClient) => ({
  deleteAll: deleteAllMessagesBuilder(client),
  deleteConversation: deleteConversationBuilder(client),
  deleteOlderThan: deleteMessagesOlderThanBuilder(client),
  delete: deleteMessageBuilder(client),
  info: messageInfoBuilder(client),
  list: messageListBuilder(client),
  send: sendMessageBuilder(client)
});

export default messagesApiBuilder;
