import BaseClient, { BaseResponse, METHODS } from '../../base';

const ENDPOINT = '/rest/ws/user/unblock';

/**
 * For usage, see {@link ContactsApi.unblockUser}
 */
export interface UnblockUserApi {
  /**
   * @param userId The user id to unblock
   */
  (userId: string): Promise<string>;
}

const unblockUserBuilder = (applozicClient: BaseClient): UnblockUserApi => {
  const unblockUserApi: UnblockUserApi = async userId => {
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
  return unblockUserApi;
};

export default unblockUserBuilder;
