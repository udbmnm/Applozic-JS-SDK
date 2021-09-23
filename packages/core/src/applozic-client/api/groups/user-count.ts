import BaseClient, { BaseResponse, METHODS } from '../../base';
import Group from '../../models/Group';
import getQueryStringFromData from '../../../utils/get-query-string-from-data';

const ENDPOINT = '/rest/ws/group/user/count';

// ?clientGroupIds=6689118&clientGroupIds=6686563
export interface IUserCount {
  clientGroupIds: string[];
}

export interface UserCountApi {
  (data: IUserCount): Promise<BaseResponse<Partial<Group>[]>>;
}

const userCountBuilder = (applozicClient: BaseClient): UserCountApi => {
  const userCountApi: UserCountApi = async data => {
    const response: BaseResponse<
      Partial<Group>[]
    > = await applozicClient.makeApiCall(
      METHODS.GET,
      `${ENDPOINT}${getQueryStringFromData(data)}`,
      {
        useAuth: true
      }
    );
    return response as any;
  };
  return userCountApi;
};

export default userCountBuilder;
