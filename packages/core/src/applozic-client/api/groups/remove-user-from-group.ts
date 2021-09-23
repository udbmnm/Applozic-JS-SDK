import BaseClient, { BaseResponse, METHODS } from "../../base";

const ENDPOINT = "/rest/ws/group/remove/member";

export interface IRemoveUserFromGroupRequest {
  userId: string;
  clientGroupId: string;
  resetCount?: boolean;
}

export interface RemoveUserFromGroupApi {
  (data: IRemoveUserFromGroupRequest): Promise<BaseResponse<string>>;
}

const removeUserFromGroupBuilder = (
  applozicClient: BaseClient
): RemoveUserFromGroupApi => {
  const userDetailsApi: RemoveUserFromGroupApi = async (data) => {
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

export default removeUserFromGroupBuilder;
