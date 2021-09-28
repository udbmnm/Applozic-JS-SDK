import BaseClient, { BaseResponse, METHODS } from '../../base';

const ENDPOINT = '/rest/ws/user/update';

/**
 * Update user details request
 */
export interface UpdateUserDetailsReq {
  /** New email for currently logged in user */
  email?: string;
  /** New display name for currently logged in user */
  displayName?: string;
  /** New image link for currently logged in user */
  imageLink?: string;
  /** New status message for currently logged in user */
  statusMessage?: string;
}

/**
 * For usage, see {@link ContactsApi.updateUserDetails}
 */
export interface UpdateUserDetailsApi {
  /**
   * @param data - Update user details request
   */
  (data: UpdateUserDetailsReq): Promise<string>;
}

const updateUserDetailsBuilder = (
  applozicClient: BaseClient
): UpdateUserDetailsApi => {
  const updateUserDetailsApi: UpdateUserDetailsApi = async data => {
    const response: BaseResponse<string> = await applozicClient.makeApiCall(
      METHODS.POST,
      ENDPOINT,
      {
        data,
        useAuth: true
      }
    );
    return response.response;
  };
  return updateUserDetailsApi;
};

export default updateUserDetailsBuilder;
