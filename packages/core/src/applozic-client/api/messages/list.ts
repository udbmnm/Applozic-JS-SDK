import BaseClient, { BaseResponse, METHODS } from '../../base';
import Group from '../../models/Group';
import { Message } from '../../models/Message';
import User from '../../models/User';

const ENDPOINT = '/rest/ws/message/v2/list';

export interface MessageListRes {
  message: Message[];
  userDetails: User[];
  groupFeeds: Group[];
}

export interface MessageListReq {
  /** userId of chat to check for */
  userId?: string;
  /** groupId of chat to check for */
  groupId?: string;
  /** Starting index for messages to be returned */
  startIndex?: number;
  /** Number of threads to load when initializing the chat */
  mainPageSize?: number;
  /** number of messages per chat thread */
  pageSize?: number;
  /** Messages older than this will be returned */
  endTime?: number;
}

/**
 * For usage, see {@link MessagesApi.list}
 */
export interface MessageListApi {
  (messageListRequest: MessageListReq): Promise<MessageListRes>;
}

const sendMessageToUserBuilder = (
  applozicClient: BaseClient
): MessageListApi => {
  const sendMessageToUserApi: MessageListApi = async messageListRequest => {
    const response: BaseResponse<MessageListRes> =
      await applozicClient.makeApiCall(METHODS.GET, ENDPOINT, {
        query: {
          ...messageListRequest,
          // Have to deal with numerical values separately
          startIndex:
            messageListRequest.startIndex === 0
              ? 0
              : messageListRequest.startIndex
              ? `${messageListRequest.startIndex}`
              : undefined,
          mainPageSize: messageListRequest.mainPageSize
            ? `${messageListRequest.mainPageSize}`
            : 50,
          pageSize: messageListRequest.pageSize
            ? `${messageListRequest.pageSize}`
            : 50,
          endTime: messageListRequest.endTime
            ? `${messageListRequest.endTime}`
            : undefined
        },
        useAuth: true
      });
    return response.response;
  };
  return sendMessageToUserApi;
};

export default sendMessageToUserBuilder;
