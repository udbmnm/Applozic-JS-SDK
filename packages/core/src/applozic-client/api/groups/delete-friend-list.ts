import { GroupTypes } from '../../models/Group';
import BaseClient, { BaseResponse, METHODS } from '../../base';

const ENDPOINT = (groupName: string) => `/rest/ws/group/${groupName}/delete`;

/**
 * For usage, see {@link GroupsApi.deleteFriendList}
 */
export interface DeleteFriendListReq {
  groupName: string;
  groupType?: GroupTypes;
}

/**
 * For usage, see {@link GroupsApi.deleteFriendList}
 */
export interface DeleteFriendListApi {
  (data: DeleteFriendListReq): Promise<string>;
}

const deleteFriendListBuilder = (
  applozicClient: BaseClient
): DeleteFriendListApi => {
  const deleteFriendListApi: DeleteFriendListApi = async data => {
    const response: BaseResponse<string> = await applozicClient.makeApiCall(
      METHODS.GET,
      ENDPOINT(data.groupName),
      {
        query: data.groupType && { groupType: data.groupType },
        useAuth: true
      }
    );
    return response.response;
  };
  return deleteFriendListApi;
};

export default deleteFriendListBuilder;
