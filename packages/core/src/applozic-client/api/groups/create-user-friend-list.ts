import BaseClient, { BaseResponse, METHODS } from '../../base';

const ENDPOINT = (groupName: string) => `/rest/ws/group/${groupName}/add`;

/**
 * Create user friend list request
 *
 * For usage, see {@link GroupsApi.createUserFriendList}
 */
export interface CreateUserFriendListReq {
  /** Group name */
  groupName: string;
  /** List of userIds */
  userList: string[];
}

/**
 * For usage, see {@link GroupsApi.createUserFriendList}
 */
export interface CreateUserFriendListApi {
  (data: CreateUserFriendListReq): Promise<string>;
}

const createUserFriendListBuilder = (
  applozicClient: BaseClient
): CreateUserFriendListApi => {
  const createUserFriendListApi: CreateUserFriendListApi = async data => {
    const response: BaseResponse<string> = await applozicClient.makeApiCall(
      METHODS.POST,
      ENDPOINT(data.groupName),
      {
        data: data.userList,
        useAuth: true
      }
    );
    return response.response;
  };
  return createUserFriendListApi;
};

export default createUserFriendListBuilder;
