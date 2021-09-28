import BaseClient, { BaseResponse, METHODS } from '../../base';

const ENDPOINT = '/rest/ws/user/remove/group/all';

/**
 * For usage, see {@link GroupsApi.removeUserFromAllGroups}
 */
export interface RemoveUserFromAllGroupsReq {
  userId: string;
}

/**
 * For usage, see {@link GroupsApi.removeUserFromAllGroups}
 */
export interface RemoveUserFromAllGroupsApi {
  (data: RemoveUserFromAllGroupsReq): Promise<string>;
}

const removeUserFromAllGroupsBuilder = (
  applozicClient: BaseClient
): RemoveUserFromAllGroupsApi => {
  const removeUserFromAllGroupsApi: RemoveUserFromAllGroupsApi = async data => {
    const response: BaseResponse<string> = await applozicClient.makeApiCall(
      METHODS.GET,
      ENDPOINT,
      {
        query: { ...data },
        useAuth: true
      }
    );
    return response.response;
  };
  return removeUserFromAllGroupsApi;
};

export default removeUserFromAllGroupsBuilder;
