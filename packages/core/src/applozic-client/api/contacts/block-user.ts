import BaseClient, { BaseResponse, METHODS } from '../../base';

const ENDPOINT = '/rest/ws/user/block';

/**
 * Block a particular user
 * 
 * https://docs.applozic.com/reference/contacts#users-block-list-sync
 * 
 * Sample usage:
 * ```typescript
 * const blockResult = await applozicClient.contacts.blockUser('some-user-id');
 * ```
 */
export interface BlockUserApi {
  /**
   * @param userId User ID to block
   */
  (userId: string): Promise<string>;
}

const blockUserBuilder = (applozicClient: BaseClient): BlockUserApi => {
  const blockUserApi: BlockUserApi = async (userId) => {
    const response: BaseResponse<string> = await applozicClient.makeApiCall(
      METHODS.GET,
      ENDPOINT,
      {
        query: { userId },
        useAuth: true
      }
    );
    return response.response;
  };
  return blockUserApi;
};

export default blockUserBuilder;
