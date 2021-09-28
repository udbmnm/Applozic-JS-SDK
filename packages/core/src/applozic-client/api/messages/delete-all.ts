import { BaseResponse } from 'src';
import BaseClient, { METHODS } from '../../base';

const ENDPOINT = '/rest/ws/message/delete/all';

/**
 * For usage, see {@link MessagesApi.deleteAll}
 */
export interface DeleteAllMessagesApi {
  (): Promise<string>;
}

const deleteAllMessagesBuilder = (
  applozicClient: BaseClient
): DeleteAllMessagesApi => {
  const deleteAllMessagesApi: DeleteAllMessagesApi = async () => {
    const response: BaseResponse<string> = await applozicClient.makeApiCall(
      METHODS.GET,
      ENDPOINT,
      {
        useAuth: true
      }
    );
    return response.response;
  };
  return deleteAllMessagesApi;
};

export default deleteAllMessagesBuilder;
