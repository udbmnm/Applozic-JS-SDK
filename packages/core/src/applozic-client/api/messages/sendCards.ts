import BaseClient, { METHODS } from '../../base';
import { SendMessageRes, SendMetaDataReq } from '../../models/Message';
import { CardsRichTextMetaData, getMetaDataFromRichTextContent, MessageMetaDataTemplateType } from "../../models/RichTextContent";

const ENDPOINT = '/rest/ws/message/v2/send';

/**
 * For usage, see {@link MessagesApi.send}
 */
export interface SendCardsApi {
  (messageRequest: SendMetaDataReq<CardsRichTextMetaData>): Promise<SendMessageRes>;
}

const sendCardsBuilder = (applozicClient: BaseClient): SendCardsApi => {
  const sendCardsApi: SendCardsApi = async messageRequest => {
    const data = {
      ...messageRequest,
      metadata: getMetaDataFromRichTextContent(
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
  return sendCardsApi;
};

export default sendCardsBuilder;
