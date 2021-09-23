import BaseClient, { METHODS } from '../../base';

const ENDPOINT = '/rest/ws/message/delete/conversation';

interface DeleteConversationRes {
  status: string;
  generatedAt: number;
  response: string;
}

interface DeleteUserConversation {
  userId: string;
}

interface DeleteGroupConversation {
  groupId: string;
}

export interface DeleteConversationApi {
  (
    options: DeleteUserConversation | DeleteGroupConversation
  ): Promise<DeleteConversationRes>;
}

const deleteConversationBuilder = (
  applozicClient: BaseClient
): DeleteConversationApi => {
  const deleteConversationApi: DeleteConversationApi = async options => {
    const response: DeleteConversationRes = await applozicClient.makeApiCall(
      METHODS.GET,
      ENDPOINT,
      {
        query: {...options},
        useAuth: true,
        json: false
      }
    );
    return response;
  };
  return deleteConversationApi;
};

export default deleteConversationBuilder;