import BaseClient, { BaseResponse, METHODS } from '../../base';

const ENDPOINT = '/rest/ws/user/update';

export interface UpdateUserDetailsReq {
  email?: string;
  displayName?: string;
  imageLink?: string;
  statusMessage?: string;
}

export interface UserDetailsApi {
  (data: UpdateUserDetailsReq): Promise<BaseResponse<string>>;
}

const updateUserDetailsBuilder = (
  applozicClient: BaseClient
): UserDetailsApi => {
  const updateUserDetailsApi: UserDetailsApi = async data => {
    const response: BaseResponse<string> = await applozicClient.makeApiCall(
      METHODS.POST,
      ENDPOINT,
      {
        data,
        useAuth: true
      }
    );
    return response;
  };
  return updateUserDetailsApi;
};

export default updateUserDetailsBuilder;
