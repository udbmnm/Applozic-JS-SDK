import BaseClient, { METHODS } from '../../base';

const ENDPOINT = '/rest/ws/user/unblock';

interface UnblockUserRes {
  status: string;
  generatedAt: number;
  response?: string;
}

export interface UnblockUserApi {
  (userId: string): Promise<UnblockUserRes>;
}

const unblockUserBuilder = (applozicClient: BaseClient): UnblockUserApi => {
  const unblockUserApi: UnblockUserApi = async (userId) => {
    const response: UnblockUserRes = await applozicClient.makeApiCall(
      METHODS.GET,
      ENDPOINT,
      {
        query: { userId },
        useAuth: true
      }
    );
    return response;
  };
  return unblockUserApi;
};

export default unblockUserBuilder;
