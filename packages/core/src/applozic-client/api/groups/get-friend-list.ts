import Group from '../../models/Group';
import BaseClient, { BaseResponse, METHODS } from '../../base';

const ENDPOINT = (groupName: string) => `/rest/ws/group/${groupName}/get`;

/**
 * For usage, see {@link GroupsApi.getFriendList}
 */
export interface GetFriendListReq {
  groupName: string;
}

/**
 * For usage, see {@link GroupsApi.getFriendList}
 */
export interface GetFriendListApi {
  (data: GetFriendListReq): Promise<BaseResponse<Group>>;
}

const getFriendListBuilder = (applozicClient: BaseClient): GetFriendListApi => {
  const getFriendListApi: GetFriendListApi = async data => {
    const response: BaseResponse<Group> = await applozicClient.makeApiCall(
      METHODS.GET,
      ENDPOINT(data.groupName),
      {
        useAuth: true
      }
    );
    return response;
  };
  return getFriendListApi;
};

export default getFriendListBuilder;
