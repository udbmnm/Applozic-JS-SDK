import BaseClient, { METHODS } from '../../base';

const ENDPOINT = '/rest/ws/user/blocked/sync';

interface BlockListSyncRes {
  status: string;
  generatedAt: number;
  response?: {
    blockedByUserList: string[];
    blockedToUserList: string[];
  };
}

export interface BlockListSyncApi {
  (lastSyncTime: number): Promise<BlockListSyncRes>;
}

const blockListSyncBuilder = (applozicClient: BaseClient): BlockListSyncApi => {
  const blockListSyncApi: BlockListSyncApi = async (lastSyncTime) => {
    const response: BlockListSyncRes = await applozicClient.makeApiCall(
      METHODS.GET,
      ENDPOINT,
      {
        query: { lastSyncTime: `${lastSyncTime}` },
        useAuth: true
      }
    );
    return response;
  };
  return blockListSyncApi;
};

export default blockListSyncBuilder;
