import BaseClient, { METHODS } from '../../base';
import { SendMessageReq, SendMessageRes } from '../../models/Message';

const ENDPOINT = '/rest/ws/message/v2/send';

/**
 * For usage, see {@link MessagesApi.send}
 */
export interface SendMessageApi {
  (messageRequest: SendMessageReq): Promise<SendMessageRes>;
}

const sendMessageBuilder = (applozicClient: BaseClient): SendMessageApi => {
  const sendMessageApi: SendMessageApi = async messageRequest => {
    const result = await applozicClient.makeApiCall(METHODS.POST, ENDPOINT, {
      data: messageRequest,
      useAuth: true
    });
    return result.response;
  };
  return sendMessageApi;
};

export default sendMessageBuilder;
