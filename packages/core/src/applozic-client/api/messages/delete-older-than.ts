import BaseClient, { BaseResponse, METHODS } from '../../base';

const ENDPOINT = '/rest/ws/message/delete';

/**
 * For usage, see {@link MessagesApi.deleteOlderThan}
 */
export interface DeleteMessageOlderThanApi {
  /**
   * @param days - Number of days to delete messages older than
   */
  (days: number): Promise<string>;
}

const deleteMessagesOlderThanBuilder = (
  applozicClient: BaseClient
): DeleteMessageOlderThanApi => {
  const deleteMessagesOlderThanApi: DeleteMessageOlderThanApi = async days => {
    const response: BaseResponse<string> = await applozicClient.makeApiCall(
      METHODS.POST,
      ENDPOINT,
      {
        query: { days: `${days}` },
        useAuth: true
      }
    );
    return response.response;
  };
  return deleteMessagesOlderThanApi;
};

export default deleteMessagesOlderThanBuilder;
