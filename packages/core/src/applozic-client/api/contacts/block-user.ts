import BaseClient, { METHODS } from '../../base';

const ENDPOINT = '/rest/ws/user/block';

interface BlockUserRes {
  status: string;
  generatedAt: number;
  response?: string;
}

export interface BlockUserApi {
  (userId: string): Promise<BlockUserRes>;
}

const blockUserBuilder = (applozicClient: BaseClient): BlockUserApi => {
  const blockUserApi: BlockUserApi = async (userId) => {
    const response: BlockUserRes = await applozicClient.makeApiCall(
      METHODS.GET,
      ENDPOINT,
      {
        query: { userId },
        useAuth: true
      }
    );
    return response;
  };
  return blockUserApi;
};

export default blockUserBuilder;
