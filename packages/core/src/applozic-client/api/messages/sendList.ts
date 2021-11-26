import BaseClient, { METHODS } from '../../base';
import { SendMessageRes, SendMetaDataReq } from '../../models/Message';
import { getMetaDataFromRichTextContent, ListRichTextMetaData, MessageMetaDataTemplateType } from "../../models/RichTextContent";

const ENDPOINT = '/rest/ws/message/v2/send';

/**
 * For usage, see {@link MessagesApi.send}
 */
export interface SendListApi {
  (messageRequest: SendMetaDataReq<ListRichTextMetaData>): Promise<SendMessageRes>;
}

const sendListBuilder = (applozicClient: BaseClient): SendListApi => {
  const sendListApi: SendListApi = async messageRequest => {
    const data = {
      ...messageRequest,
      metadata: getMetaDataFromRichTextContent(
        MessageMetaDataTemplateType.LIST,
        messageRequest.metadata
      )
    };
    const result = await applozicClient.makeApiCall(METHODS.POST, ENDPOINT, {
      data,
      useAuth: true
    });
    return result.response;
  };
  return sendListApi;
};

export default sendListBuilder;
