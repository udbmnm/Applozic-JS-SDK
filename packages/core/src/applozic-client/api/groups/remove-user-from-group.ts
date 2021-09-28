import BaseClient, { BaseResponse, METHODS } from '../../base';

const ENDPOINT = '/rest/ws/group/remove/member';

/**
 * For usage, see {@link GroupsApi.removeUserFromGroup}
 */
export interface RemoveUserFromGroupReq {
  /** userId of user to be removed from group */
  userId: string;
  /** Group ID */
  clientGroupId: string;
  /** reset unread count of removed member from the group */
  resetCount?: boolean;
}

/**
 * For usage, see {@link GroupsApi.removeUserFromGroup}
 */
export interface RemoveUserFromGroupApi {
  (data: RemoveUserFromGroupReq): Promise<string>;
}

const removeUserFromGroupBuilder = (
  applozicClient: BaseClient
): RemoveUserFromGroupApi => {
  const removeUserFromGroupApi: RemoveUserFromGroupApi = async data => {
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
  return removeUserFromGroupApi;
};

export default removeUserFromGroupBuilder;
