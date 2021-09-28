import Group from '../../models/Group';
import BaseClient, { BaseResponse, METHODS } from '../../base';

const ENDPOINT = '/rest/ws/group/v2/list';

/** For usage, see {@link GroupsApi.userGroupList} */
export interface UserGroupListReq {
  updatedAt?: number;
}

/** For usage, see {@link GroupsApi.userGroupList} */
export interface UserGroupListApi {
  (data: UserGroupListReq): Promise<Group[]>;
}

const userGroupListBuilder = (applozicClient: BaseClient): UserGroupListApi => {
  const userGroupListApi: UserGroupListApi = async data => {
    const response: BaseResponse<Group[]> = await applozicClient.makeApiCall(
      METHODS.GET,
      ENDPOINT,
      {
        query: { ...data },
        useAuth: true
      }
    );
    return response.response;
  };
  return userGroupListApi;
};

export default userGroupListBuilder;
