import { GroupTypes } from '../../models/Group';
import BaseClient, { BaseResponse, METHODS } from '../../base';

const ENDPOINT = (groupName: string) =>
  `/rest/ws/group/${groupName}/add/members`;

/**
 * For usage, see {@link GroupsApi.createOpenFriendList}
 */
export interface CreateOpenFriendListReq {
  groupName: string;
  groupMemberList: string[];
}

/**
 * For usage, see {@link GroupsApi.createOpenFriendList}
 */
export interface CreateOpenFriendListApi {
  (data: CreateOpenFriendListReq): Promise<string>;
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
    return response.response;
  };
  return createOpenFriendListApi;
};

export default createOpenFriendListBuilder;
