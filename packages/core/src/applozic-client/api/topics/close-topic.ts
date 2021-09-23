import BaseClient, { BaseResponse, METHODS } from "../../base";

const ENDPOINT = "/rest/ws/conversation/closeall";

interface SendMessageReq {
  // unique topic id of the conversation
  topicId: string;
  // unique user identifier
  withUserId: string;
}

export interface CloseTopicApi {
  (messageRequest: SendMessageReq): Promise<BaseResponse<string>>;
}

const closeTopicBuilder = (
  applozicClient: BaseClient
): CloseTopicApi => {
  const closeTopicApi: CloseTopicApi = async (
    messageRequest
  ) => {
    const response: BaseResponse<string> = await applozicClient.makeApiCall(
      METHODS.GET,
      ENDPOINT,
      {
        query: { ...messageRequest },
        useAuth: true,
      }
    );
    return response;
  };
  return closeTopicApi;
};

export default closeTopicBuilder;
