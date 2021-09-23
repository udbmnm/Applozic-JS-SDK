import { GroupTypes } from '../../models/Group';
import BaseClient, { BaseResponse, METHODS } from '../../base';

const ENDPOINT = (groupName: string) => `/rest/ws/group/${groupName}/delete`;

export interface IDeleteFriendList {
  groupName: string;
  groupType?: GroupTypes;
}

export interface DeleteFriendListApi {
  (data: IDeleteFriendList): Promise<BaseResponse<string>>;
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
    return response;
  };
  return deleteFriendListApi;
};

export default deleteFriendListBuilder;
