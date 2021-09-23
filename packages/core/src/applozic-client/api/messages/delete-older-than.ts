import BaseClient, { METHODS } from '../../base';

const ENDPOINT = '/rest/ws/message/delete';

interface DeleteMessageOlderThanRes {
  status: string;
  generatedAt: number;
  response: string;
}

export interface DeleteMessageOlderThanApi {
  (days: number): Promise<DeleteMessageOlderThanRes>;
}

const deleteMessagesOlderThanBuilder = (
  applozicClient: BaseClient
): DeleteMessageOlderThanApi => {
  const deleteMessagesOlderThanApi: DeleteMessageOlderThanApi = async days => {
    const response: DeleteMessageOlderThanRes = await applozicClient.makeApiCall(
      METHODS.POST,
      ENDPOINT,
      {
        query: { days: `${days}` },
        useAuth: true
      }
    );
    return response;
  };
  return deleteMessagesOlderThanApi;
};

export default deleteMessagesOlderThanBuilder;
