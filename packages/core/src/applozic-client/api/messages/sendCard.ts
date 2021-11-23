import BaseClient, { METHODS } from '../../base';
import { SendMessageRes, SendMetaDataReq } from '../../models/Message';
import { CardRichTextMetaData, getMetaDataFromPayload, MessageMetaDataTemplateType } from "../../models/RichTextContent";

const ENDPOINT = '/rest/ws/message/v2/send';

/**
 * For usage, see {@link MessagesApi.send}
 */
export interface SendCardApi {
  (messageRequest: SendMetaDataReq<CardRichTextMetaData>): Promise<SendMessageRes>;
}

const sendCardBuilder = (applozicClient: BaseClient): SendCardApi => {
  const sendCardApi: SendCardApi = async messageRequest => {
    const data = {
      ...messageRequest,
      metadata: getMetaDataFromPayload(
        MessageMetaDataTemplateType.CARD,
        messageRequest.metadata
      )
    };
    const result = await applozicClient.makeApiCall(METHODS.POST, ENDPOINT, {
      data,
      useAuth: true
    });
    return result.response;
  };
  return sendCardApi;
};

export default sendCardBuilder;
