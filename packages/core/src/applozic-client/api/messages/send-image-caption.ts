import BaseClient, { METHODS } from '../../base';
import { SendMessageRes, SendMetaDataReq } from '../../models/Message';
import {
  getMetaDataFromRichTextContent,
  ImageWithCaptionRichTextMetaData,
  MessageMetaDataTemplateType
} from '../../models/RichTextContent';

const ENDPOINT = '/rest/ws/message/v2/send';

/**
 * For usage, see {@link MessagesApi.send}
 */
export interface SendImageCaptionApi {
  (
    messageRequest: SendMetaDataReq<ImageWithCaptionRichTextMetaData>
  ): Promise<SendMessageRes>;
}

const sendImageCaptionBuilder = (
  applozicClient: BaseClient
): SendImageCaptionApi => {
  const sendImageCaptionApi: SendImageCaptionApi = async messageRequest => {
    const data = {
      ...messageRequest,
      metadata: getMetaDataFromRichTextContent(
        MessageMetaDataTemplateType.IMAGE_CAPTION,
        messageRequest.metadata
      )
    };
    const result = await applozicClient.makeApiCall(METHODS.POST, ENDPOINT, {
      data,
      useAuth: true
    });
    return result.response;
  };
  return sendImageCaptionApi;
};

export default sendImageCaptionBuilder;
