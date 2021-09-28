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
 * Update details of currently logged in user
 *
 * https://docs.applozic.com/reference/contacts#update-user
 *
 * Sample usage:
 * ```typescript
 * const updatedUser = await applozicClient.contacts.updateUserDetails({
 *  email: 'new@email.com'
 *  displayName: 'New Name'
 *  imageLink: 'https://new.image.com/link.png'
 *  statusMessage: 'New status message'
 * });
 * ```
 */
export interface UserDetailsApi {
  /**
   * @param data - Update user details request
   */
  (data: UpdateUserDetailsReq): Promise<BaseResponse<string>>;
}

const updateUserDetailsBuilder = (
  applozicClient: BaseClient
): UserDetailsApi => {
  const updateUserDetailsApi: UserDetailsApi = async data => {
    const response: BaseResponse<string> = await applozicClient.makeApiCall(
      METHODS.POST,
      ENDPOINT,
      {
        data,
        useAuth: true
      }
    );
    return response;
  };
  return updateUserDetailsApi;
};

export default updateUserDetailsBuilder;
