import BaseClient, { BaseResponse, METHODS } from '../../base';

const ENDPOINT = '/rest/ws/group/remove/users';

/**
 * For usage, see {@link GroupsApi.removeUsersFromGroups}
 */
export interface RemoveUsersFromGroupsReq {
  userIds: string[];
  clientGroupIds: string[];
}

/**
 * For usage, see {@link GroupsApi.removeUsersFromGroups}
 */
export interface RemoveUsersFromGroupsApi {
  (data: RemoveUsersFromGroupsReq): Promise<string>;
}

const removeUsersFromGroupsBuilder = (
  applozicClient: BaseClient
): RemoveUsersFromGroupsApi => {
  const removeUserFromGroups: RemoveUsersFromGroupsApi = async data => {
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
  return removeUserFromGroups;
};

export default removeUsersFromGroupsBuilder;
