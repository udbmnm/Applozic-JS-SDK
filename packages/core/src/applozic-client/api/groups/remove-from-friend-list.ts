import { GroupTypes } from '../../models/Group';
import BaseClient, { BaseResponse, METHODS } from '../../base';

const ENDPOINT = (groupName: string) => `/rest/ws/group/${groupName}/remove`;

/**
 * For usage, see {@link GroupsApi.removeFromFriendList}
 */
export interface RemoveFromFriendListReq {
  groupName: string;
  userId: string;
  /** groupType required only for open list **/
  groupType?: GroupTypes;
}

/**
 * For usage, see {@link GroupsApi.removeFromFriendList}
 */
export interface RemoveFromFriendListApi {
  (data: RemoveFromFriendListReq): Promise<string>;
}

const removeFromFriendListBuilder = (
  applozicClient: BaseClient
): RemoveFromFriendListApi => {
  const removeFromFriendListApi: RemoveFromFriendListApi = async data => {
    const response: BaseResponse<string> = await applozicClient.makeApiCall(
      METHODS.GET,
      ENDPOINT(data.groupName),
      {
        query: { userId: data.userId, groupType: data.groupType },
        useAuth: true
      }
    );
    return response.response;
  };
  return removeFromFriendListApi;
};

export default removeFromFriendListBuilder;
