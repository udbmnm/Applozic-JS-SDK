import { GroupTypes } from '../../models/Group';
import BaseClient, { BaseResponse, METHODS } from '../../base';

const ENDPOINT = (groupName: string) =>
  `/rest/ws/group/${groupName}/add/members`;

export interface ICreateOpenFriendListRequest {
  groupName: string;
  groupMemberList: string[];
}

export interface CreateOpenFriendListApi {
  (data: ICreateOpenFriendListRequest): Promise<BaseResponse<string>>;
}

const createOpenFriendListBuilder = (
  applozicClient: BaseClient
): CreateOpenFriendListApi => {
  const createOpenFriendListApi: CreateOpenFriendListApi = async data => {
    const response: BaseResponse<string> = await applozicClient.makeApiCall(
      METHODS.POST,
      ENDPOINT(data.groupName),
      {
        data: {
          type: GroupTypes.CONTACTS,
          groupMemberList: data.groupMemberList
        },
        useAuth: true
      }
    );
    return response;
  };
  return createOpenFriendListApi;
};

export default createOpenFriendListBuilder;
