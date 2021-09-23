import BaseClient, { BaseResponse, METHODS } from "../../base";

const ENDPOINT = "/rest/ws/group/user/update";

export interface IUpdateGroupUserDetailsRequest {
  clientGroupId: string;
  notificationAfterTime: number;
}

export interface UpdateGroupUserDetailsApi {
  (data: IUpdateGroupUserDetailsRequest): Promise<BaseResponse<string>>;
}

const updateGroupUserDetailsBuilder = (
  applozicClient: BaseClient
): UpdateGroupUserDetailsApi => {
  const userDetailsApi: UpdateGroupUserDetailsApi = async (data) => {
    const response: BaseResponse<string> = await applozicClient.makeApiCall(
      METHODS.POST,
      ENDPOINT,
      {
        data,
        useAuth: true,
      }
    );
    return response;
  };
  return userDetailsApi;
};

export default updateGroupUserDetailsBuilder;
