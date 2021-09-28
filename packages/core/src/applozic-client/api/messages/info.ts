import { BaseResponse } from 'src';
import BaseClient, { METHODS } from '../../base';

const ENDPOINT = '/rest/ws/message/info';

interface MessageInfoItem {
  userId: string;
  deliveredAtTime: number;
  status: number;
}

/**
 * For usage, see {@link MessagesApi.info}
 */
export interface MessageInfoApi {
  (messageKey: string): Promise<MessageInfoItem[]>;
}

const messageInfoBuilder = (applozicClient: BaseClient): MessageInfoApi => {
  const messageInfoApi: MessageInfoApi = async key => {
    const response: BaseResponse<
      MessageInfoItem[]
    > = await applozicClient.makeApiCall(METHODS.GET, ENDPOINT, {
      query: { key },
      useAuth: true
    });
    return response.response;
  };
  return messageInfoApi;
};

export default messageInfoBuilder;
