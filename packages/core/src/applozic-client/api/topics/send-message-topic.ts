import BaseClient, { METHODS } from "../../base";

const ENDPOINT = "/rest/ws/message/send";

interface SendMessageToTopicRes {
  messageKey: string;
  conversationId: number;
  createdAt: number;
}

interface SendMessageReq {
  // unique id of the receiver user
  to?: string;
  // unique group identifier
  groupId?: number;
  // Message text
  message: string;
  // Receive in Retreive Conversation Id API
  conversationId: number;
}

export interface SendMessageToTopicApi {
  (messageRequest: SendMessageReq): Promise<SendMessageToTopicRes>;
}

const sendMessageToTopicBuilder = (
  applozicClient: BaseClient
): SendMessageToTopicApi => {
  const sendMessageToTopicApi: SendMessageToTopicApi = async (
    messageRequest
  ) => {
    const response: SendMessageToTopicRes = await applozicClient.makeApiCall(
      METHODS.POST,
      ENDPOINT,
      {
        data: messageRequest,
        useAuth: true,
      }
    );
    return response;
  };
  return sendMessageToTopicApi;
};

export default sendMessageToTopicBuilder;
