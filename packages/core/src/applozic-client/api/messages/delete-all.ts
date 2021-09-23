import BaseClient, { METHODS } from '../../base';

const ENDPOINT = '/rest/ws/message/delete/all';

interface DeleteAllMessagesRes {
  status: string;
  generatedAt: number;
  response: string;
}

export interface DeleteAllMessagesApi {
  (): Promise<DeleteAllMessagesRes>;
}

const deleteAllMessagesBuilder = (
  applozicClient: BaseClient
): DeleteAllMessagesApi => {
  const deleteAllMessagesApi: DeleteAllMessagesApi = async () => {
    const response: DeleteAllMessagesRes = await applozicClient.makeApiCall(
      METHODS.GET,
      ENDPOINT,
      {
        useAuth: true
      }
    );
    return response;
  };
  return deleteAllMessagesApi;
};

export default deleteAllMessagesBuilder;
