import BaseClient, { METHODS } from '../../base';
import { SendMessageRes, SendMetaDataReq } from '../../models/Message';
import {
  ButtonRichTextMetaData,
  getMetaDataFromRichTextContent,
  MessageMetaDataTemplateType
} from '../../models/RichTextContent';

const ENDPOINT = '/rest/ws/message/v2/send';

/**
 * For usage, see {@link MessagesApi.send}
 */
export interface SendButtonApi {
  (
    messageRequest: SendMetaDataReq<ButtonRichTextMetaData>
  ): Promise<SendMessageRes>;
}

const sendButtonBuilder = (applozicClient: BaseClient): SendButtonApi => {
  const sendButtonApi: SendButtonApi = async messageRequest => {
    const data = {
      ...messageRequest,
      metadata: getMetaDataFromRichTextContent(
        MessageMetaDataTemplateType.BUTTON,
        messageRequest.metadata
      )
    };
    const result = await applozicClient.makeApiCall(METHODS.POST, ENDPOINT, {
      data,
      useAuth: true
    });
    return result.response;
  };
  return sendButtonApi;
};

export default sendButtonBuilder;
