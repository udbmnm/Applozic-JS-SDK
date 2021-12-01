import BaseClient, { METHODS, BaseResponse } from '../../base';
// import { SendMessageReq, SendMessageRes } from '../../models/Message';

const ENDPOINT = '/rest/ws/message/delivered';

export interface MarkMessageDeliveredApi {
  (messageKey: string): Promise<BaseResponse<string>>;
}

const markMessageDeliveredBuilder = (
  applozicClient: BaseClient
): MarkMessageDeliveredApi => {
  const markMessageDeliveredApi: MarkMessageDeliveredApi = async messageKey => {
    const result = await applozicClient.makeApiCall(METHODS.GET, ENDPOINT, {
      query: {
        key: messageKey
      },
      useAuth: true,
      json: false
    });
    return result.response;
  };
  return markMessageDeliveredApi;
};

export default markMessageDeliveredBuilder;
