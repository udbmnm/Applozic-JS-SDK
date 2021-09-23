import { GroupTypes } from '../../models/Group';
import BaseClient, { BaseResponse, METHODS } from '../../base';

const ENDPOINT = (groupName: string) => `/rest/ws/group/${groupName}/remove`;

export interface IRemoveFromFriendList {
  groupName: string;
  userId: string;
  /** groupType required only for open list **/
  groupType?: GroupTypes;
}

export interface RemoveFromFriendListApi {
  (data: IRemoveFromFriendList): Promise<BaseResponse<any>>;
}

const removeFromFriendListBuilder = (
  applozicClient: BaseClient
): RemoveFromFriendListApi => {
  const removeFromFriendListApi: RemoveFromFriendListApi = async data => {
    const response: BaseResponse<any> = await applozicClient.makeApiCall(
      METHODS.GET,
      ENDPOINT(data.groupName),
      {
        query: { userId: data.userId, groupType: data.groupType },
        useAuth: true
      }
    );
    return response;
  };
  return removeFromFriendListApi;
};

export default removeFromFriendListBuilder;
