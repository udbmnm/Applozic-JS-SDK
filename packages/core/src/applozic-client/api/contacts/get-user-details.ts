import User from '../../models/User';
import BaseClient, { BaseResponse, METHODS } from '../../base';

const ENDPOINT = '/rest/ws/user/v2/detail';

export interface UserDetailsApi {
  (userIdList: string[]): Promise<User[]>;
}

const userDetailsBuilder = (applozicClient: BaseClient): UserDetailsApi => {
  const userDetailsApi: UserDetailsApi = async userIdList => {
    const response: BaseResponse<User[]> = await applozicClient.makeApiCall(
      METHODS.POST,
      ENDPOINT,
      {
        data: {
          userIdList
        },
        useAuth: true
      }
    );
    return response.response;
  };
  return userDetailsApi;
};

export default userDetailsBuilder;
