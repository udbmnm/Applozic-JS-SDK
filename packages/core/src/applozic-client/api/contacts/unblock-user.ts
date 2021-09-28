import BaseClient, { BaseResponse, METHODS } from '../../base';

const ENDPOINT = '/rest/ws/user/unblock';

/**
 * Unblock a user
 *
 * https://docs.applozic.com/reference/contacts#unblock-user
 *
 * Sample usage:
 * ```typescript
 * const unblockUser = await applozicClient.contacts.unblockUser('some-user-id');
 * ```
 */
export interface UnblockUserApi {
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
