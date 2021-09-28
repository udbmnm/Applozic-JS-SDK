import BaseClient, { BaseResponse, METHODS } from '../../base';
import { UserRoles } from '../../models/Group';

const ENDPOINT = '/rest/ws/group/add/member';

/**
 * For usage, see {@link GroupsApi.addUserToGroup}
 */
export interface AddUserToGroupRequest {
  /** ID of user to add to the group */
  userId: string;
  /** Group to add the user to */
  clientGroupId: string;
  /** Role of the user in the group */
  role: UserRoles;
}

/**
 * Add user to group
 *
 * For usage, see {@link GroupsApi.addUserToGroup}
 */
export interface AddUserToGroupApi {
  (data: AddUserToGroupRequest): Promise<string>;
}

const addUserToGroupBuilder = (
  applozicClient: BaseClient
): AddUserToGroupApi => {
  const addUserToGroupApi: AddUserToGroupApi = async data => {
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
  return addUserToGroupApi;
};

export default addUserToGroupBuilder;
