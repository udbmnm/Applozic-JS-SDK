import BaseClient from '../../base';
import deleteAllMessagesBuilder, { DeleteAllMessagesApi } from './delete-all';
import deleteConversationBuilder, {
  DeleteConversationApi
} from './delete-conversation';
import deleteMessagesOlderThanBuilder, {
  DeleteMessageOlderThanApi
} from './delete-older-than';
import deleteMessageBuilder, { DeleteMessageApi } from './delete';
import messageInfoBuilder, { MessageInfoApi } from './info';
import messageListBuilder, { MessageListApi } from './list';
import sendMessageBuilder, { SendMessageApi } from './send';
import sendButtonBuilder, { SendButtonApi } from './send-button';
import sendImageCaptionBuilder, {
  SendImageCaptionApi
} from './send-image-caption';
import sendCardsBuilder, { SendCardsApi } from './send-cards';
import sendListBuilder, { SendListApi } from './send-list';

export interface MessagesApi {
  /**
   * Delete all chats
   *
   * https://docs.applozic.com/reference/messages#delete-all-chats
   *
   * Sample usage:
   * ```typescript
   * const result = await applozicClient.messages.deleteAll();
   * console.log({ result });
   */
  deleteAll: DeleteAllMessagesApi;
  /**
   * Delete a conversation
   *
   * https://docs.applozic.com/reference/messages#delete-conversation-1
   *
   * Sample usage:
   *
   * #### Delete conversation with a user
   * ```typescript
   * const result = await applozicClient.messages.delete('message-key');
   * ```
   *
   * #### Delete group conversation
   * ```typescript
   * const result = await applozicClient.messages.delete('message-key', true);
   * ```
   */
  deleteConversation: DeleteConversationApi;
  /**
   * Delete messages older than a given timestamp
   *
   * https://docs.applozic.com/reference/messages#delete-user-messages-older-than-x-days
   *
   * Sample usage:
   *
   * ```typescript
   * // Delete messages older than 30 days
   * const result = await applozicClient.messages.deleteOlderThan(30);
   * ```
   */
  deleteOlderThan: DeleteMessageOlderThanApi;
  /**
   * Delete a messsage
   *
   * https://docs.applozic.com/reference/messages#delete-user-messages-older-than-x-days
   *
   * Sample usage:
   *
   * #### Delete only for logged in user
   * ```typescript
   * const result = await applozicClient.messages.delete('message-key');
   * ```
   *
   * #### Delete message for all
   * ```typescript
   * const result = await applozicClient.messages.delete('message-key', true);
   * ```
   */
  delete: DeleteMessageApi;
  /**
   * Get message details from message key
   *
   * https://docs.applozic.com/reference/messages#message-info
   *
   *
   * Sample usage:
   *
   * ```typescript
   * const result = await applozicClient.messages.info('message-key');
   * ```
   */
  // info: MessageInfoApi;
  /**
   * Wrapper to list messages for
   * 1. Recent 1-1 chat previews
   * 2. Group chat previews
   * 3. User chat
   *
   * https://docs.applozic.com/reference/messages#message-info
   *
   *
   * Sample usage:
   *
   * #### Get last message from recent conversations
   *
   * ```typescript
   * const page1 = await applozicClient.messages.list({
   *  endTime: Date.now(),
   *  mainPageSize: 50, // Number of recent chats to load
   * });
   *
   * const page2 = await applozicClient.messages.list({
   *  endTime: page1.message[0].createdAtTime,
   *  mainPageSize: 50, // Number of recent chats to load
   * });
   * ```
   *
   *
   * #### Get conversation with a user
   *
   * ```typescript
   * const page1 = await applozicClient.messages.list({
   *  userId: 'contact-user-id',
   *  endTime: Date.now(),
   *  pageSize: 50
   * });
   *
   * const page2 = await applozicClient.messages.list({
   *  userId: 'contact-user-id',
   *  endTime: page1.message[0].createdAtTime,
   *  pageSize: 50
   * });
   * ```
   *
   *
   * #### Get conversation with a group
   *
   * ```typescript
   * const page1 = await applozicClient.messages.list({
   *  groupId: 'group-id',
   *  endTime: Date.now(),
   *  pageSize: 50
   * });
   *
   * const page2 = await applozicClient.messages.list({
   *  groupId: 'group-id',
   *  endTime: page1.message[0].createdAtTime,
   *  pageSize: 50
   * });
   * ```
   *
   */
  list: MessageListApi;
  /**
   * This a single wrapper over the send message API.
   *
   * ### Send message to a user
   *
   * https://docs.applozic.com/reference/messages#send-message-to-user
   *
   * Sample usage:
   * ```typescript
   * const messageResult = await applozicClient.messages.send({
   *   to: 'userId',
   *   message: 'Hello world',
   * });
   * console.log({ messageResult });
   * ```
   *
   * ### Send message to a group
   *
   * https://docs.applozic.com/reference/messages#send-message-to-group
   *
   * Sample usage:
   * ```typescript
   * const messageResult = await applozicClient.messages.send({
   *   clientGroupId: 'client-group-id',
   *   message: 'Hello world',
   * });
   * console.log({ messageResult });
   * ```
   * ### Send message with attachment
   *
   * https://docs.applozic.com/reference/messages#send-message-with-attachment
   *
   * Get file meta from after uploading the file to Applozic server.
   * Use this file meta when sending the message.
   *
   * To upload a file, see {@link FilesApi.upload}
   *
   * Sample usage:
   * ```typescript
   * const fileMeta = await applozicClient.files.upload(file);
   * const messageResult = await applozicClient.messages.send({
   *   clientGroupId: 'client-group-id',
   *   message: 'Hello world',
   *   fileMeta: fileMeta,
   *   type: 5
   * });
   * console.log({ messageResult });
   * ```
   *
   * ### Send message with metadata
   *
   * https://docs.applozic.com/reference/messages#send-message-with-metadata
   *
   * Sample usage:
   * ```typescript
   * const messageResult = await applozicClient.messages.send({
   *   to: 'userId',
   *   message: 'Hello world',
   *   metadata: {
   *     "key1" : "value1",
   *     "key2" : "value2"
   *   }
   * });
   * console.log({ messageResult });
   */
  send: SendMessageApi;

  sendButtons: SendButtonApi;
  sendImageWithCaption: SendImageCaptionApi;
  sendList: SendListApi;
  sendCards: SendCardsApi;
}

const messagesApiBuilder = (client: BaseClient): MessagesApi => ({
  deleteAll: deleteAllMessagesBuilder(client),
  deleteConversation: deleteConversationBuilder(client),
  deleteOlderThan: deleteMessagesOlderThanBuilder(client),
  delete: deleteMessageBuilder(client),
  // TODO uncomment after testing message info endpoint
  // info: messageInfoBuilder(client),
  list: messageListBuilder(client),
  send: sendMessageBuilder(client),
  sendButtons: sendButtonBuilder(client),
  sendImageWithCaption: sendImageCaptionBuilder(client),
  sendList: sendListBuilder(client),
  sendCards: sendCardsBuilder(client)
});

export default messagesApiBuilder;
