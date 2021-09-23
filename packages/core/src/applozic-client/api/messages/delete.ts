import BaseClient, { METHODS } from '../../base';

const ENDPOINT = '/rest/ws/message/v2/delete';

interface DeleteMessageRes {
  status: string;
  generatedAt: number;
  response: string;
}

export interface DeleteMessageApi {
  (messageKey: string, deleteForAll?: boolean): Promise<DeleteMessageRes>;
}

const deleteMessageBuilder = (applozicClient: BaseClient): DeleteMessageApi => {
  const deleteMessageApi: DeleteMessageApi = async (key, deleteForAll) => {
    const response: DeleteMessageRes = await applozicClient.makeApiCall(
      METHODS.GET,
      ENDPOINT,
      {
        query: { key, deleteForAll: deleteForAll ? 'true' : undefined },
        useAuth: true
      }
    );
    return response;
  };
  return deleteMessageApi;
};

export default deleteMessageBuilder;
