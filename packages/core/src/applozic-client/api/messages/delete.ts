import { BaseResponse } from 'src';
import BaseClient, { METHODS } from '../../base';

const ENDPOINT = '/rest/ws/message/v2/delete';

/**
 * For usage, see {@link MessagesApi.delete}
 */
export interface DeleteMessageApi {
  /**
   * @param messageKey - Message key to delete
   * @param deleteForAll - If true, delete for all users. Default is `false`.
   */
  (messageKey: string, deleteForAll?: boolean): Promise<string>;
}

const deleteMessageBuilder = (applozicClient: BaseClient): DeleteMessageApi => {
  const deleteMessageApi: DeleteMessageApi = async (key, deleteForAll) => {
    const response: BaseResponse<string> = await applozicClient.makeApiCall(
      METHODS.GET,
      ENDPOINT,
      {
        query: { key, deleteForAll: deleteForAll ? 'true' : undefined },
        useAuth: true
      }
    );
    return response.response;
  };
  return deleteMessageApi;
};

export default deleteMessageBuilder;
