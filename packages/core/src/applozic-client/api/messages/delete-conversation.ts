import BaseClient, { BaseResponse, METHODS } from '../../base';

const ENDPOINT = '/rest/ws/message/delete/conversation';

/**
 * For usage, see {@link MessagesApi.deleteConversation}
 */
export interface DeleteUserConversation {
  /** User ID to of the conversation to be deleted */
  userId: string;
}

/**
 * For usage, see {@link MessagesApi.deleteConversation}
 */
export interface DeleteGroupConversation {
  groupId: string;
}

/**
 * For usage, see {@link MessagesApi.deleteConversation}
 */
export interface DeleteConversationApi {
  (options: DeleteUserConversation | DeleteGroupConversation): Promise<string>;
}

const deleteConversationBuilder = (
  applozicClient: BaseClient
): DeleteConversationApi => {
  const deleteConversationApi: DeleteConversationApi = async options => {
    const response: BaseResponse<string> = await applozicClient.makeApiCall(
      METHODS.GET,
      ENDPOINT,
      {
        query: { ...options },
        useAuth: true,
        json: false
      }
    );
    return response.response;
  };
  return deleteConversationApi;
};

export default deleteConversationBuilder;
