import BaseClient, { BaseResponse, METHODS } from '../../base';
import Group from '../../models/Group';
import getQueryStringFromData from '../../../utils/get-query-string-from-data';

const ENDPOINT = '/rest/ws/group/user/count';

/** For usage, see {@link GroupsApi.userCount} */
export interface UserCountReq {
  clientGroupIds: string[];
}

/** For usage, see {@link GroupsApi.userCount} */
export interface UserCountResItem {
  id: number;
  clientGroupId: string;
  userCount: number;
}

/** For usage, see {@link GroupsApi.userCount} */
export interface UserCountApi {
  (data: UserCountReq): Promise<UserCountResItem[]>;
}

const userCountBuilder = (applozicClient: BaseClient): UserCountApi => {
  const userCountApi: UserCountApi = async data => {
    const response: BaseResponse<
      UserCountResItem[]
    > = await applozicClient.makeApiCall(
      METHODS.GET,
      `${ENDPOINT}${getQueryStringFromData(data)}`,
      {
        useAuth: true
      }
    );
    return response.response;
  };
  return userCountApi;
};

export default userCountBuilder;
