import { BaseResponse } from 'src';
import BaseClient, { METHODS } from '../../base';

const ENDPOINT = '/rest/ws/user/update/password';

/**
 * Update details of currently logged in user
 *
 * https://docs.applozic.com/reference/contacts#update-user
 *
 * Sample usage:
 * ```typescript
 * const updatedPasswordResult = await applozicClient.contacts.updateUserDetails(
 *   'oldPassword',
 *   'newPassword'
 * );
 * console.log({ updatedPasswordResult });
 * ```
 */
export interface UpdateUserPasswordApi {
  /**
   * @param oldPassword - Old password of the user
   * @param newPassword - New password of the user
   */
  (oldPassword: string, newPassword: string): Promise<string>;
}

const updateUserPasswordBuilder = (
  applozicClient: BaseClient
): UpdateUserPasswordApi => {
  const updateUserPasswordApi: UpdateUserPasswordApi = async (
    oldPassword,
    newPassword
  ) => {
    const response: BaseResponse<string> = await applozicClient.makeApiCall(
      METHODS.GET,
      ENDPOINT,
      {
        query: {
          oldPassword,
          newPassword
        },
        useAuth: true
      }
    );
    return response.response;
  };
  return updateUserPasswordApi;
};

export default updateUserPasswordBuilder;
