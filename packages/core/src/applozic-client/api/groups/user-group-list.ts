import Group from '../../models/Group';
import BaseClient, { BaseResponse, METHODS } from '../../base';

const ENDPOINT = '/rest/ws/group/v2/list';

export interface IUserGroupList {
  updatedAt?: number;
}

export interface UserGroupListApi {
  (data: IUserGroupList): Promise<BaseResponse<Group[]>>;
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
    return response;
  };
  return userGroupListApi;
};

export default userGroupListBuilder;
