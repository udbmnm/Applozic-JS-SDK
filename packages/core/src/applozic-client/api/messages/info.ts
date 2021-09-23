import BaseClient, { METHODS } from '../../base';

const ENDPOINT = '/rest/ws/message/info';

interface MessageInfoItem {
  userId: string;
  deliveredAtTime: number;
  status: number;
}

interface MessageInfoRes {
  status: string;
  generatedAt: number;
  response: MessageInfoItem[];
}

export interface MessageInfoApi {
  (messageKey: string): Promise<MessageInfoRes>;
}

const messageInfoBuilder = (applozicClient: BaseClient): MessageInfoApi => {
  const messageInfoApi: MessageInfoApi = async key => {
    const response: MessageInfoRes = await applozicClient.makeApiCall(
      METHODS.GET,
      ENDPOINT,
      {
        query: { key },
        useAuth: true
      }
    );
    return response;
  };
  return messageInfoApi;
};

export default messageInfoBuilder;
