import BaseClient, { BaseResponse, METHODS } from '../../base';

const ENDPOINT = '/rest/ws/group/add/users';

/**
 * Add multiple users to multiple groups request
 *
 * For usage, see {@link GroupsApi.addUsersToGroups}
 */
export interface IAddUsersToGroupsRequest {
  /** List of user ids */
  userIds: string[];
  /** List of group ids */
  clientGroupIds: string[];
}

/**
 * For usage, see {@link GroupsApi.addUsersToGroups}
 */
export interface AddUsersToGroupsApi {
  (data: IAddUsersToGroupsRequest): Promise<BaseResponse<string>>;
}

const addUsersToGroupsBuilder = (
  applozicClient: BaseClient
): AddUsersToGroupsApi => {
  const addUsersToGroupsApi: AddUsersToGroupsApi = async data => {
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
  return addUsersToGroupsApi;
};

export default addUsersToGroupsBuilder;
