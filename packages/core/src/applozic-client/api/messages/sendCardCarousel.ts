import BaseClient, { METHODS } from '../../base';
import { SendMessageRes, SendMetaDataReq } from '../../models/Message';
import { CardCarouselRichTextMetaData, getMetaDataFromPayload, MessageMetaDataTemplateType } from "../../models/RichTextContent";

const ENDPOINT = '/rest/ws/message/v2/send';

/**
 * For usage, see {@link MessagesApi.send}
 */
export interface SendCardCarouselApi {
  (messageRequest: SendMetaDataReq<CardCarouselRichTextMetaData>): Promise<SendMessageRes>;
}

const sendCardCarouselBuilder = (applozicClient: BaseClient): SendCardCarouselApi => {
  const sendCardCarouselApi: SendCardCarouselApi = async messageRequest => {
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
  return sendCardCarouselApi;
};

export default sendCardCarouselBuilder;
