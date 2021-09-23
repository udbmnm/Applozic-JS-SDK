import BaseClient, { BaseResponse, METHODS } from "../../base";

const ENDPOINT = "/rest/ws/group/add/users";

export interface IRemoveUsersFromGroupsRequest {
  userIds: string[];
  clientGroupIds: string[];
}

export interface RemoveUsersFromGroupsApi {
  (data: IRemoveUsersFromGroupsRequest): Promise<BaseResponse<string>>;
}

const removeUsersFromGroupsBuilder = (
  applozicClient: BaseClient
): RemoveUsersFromGroupsApi => {
  const userDetailsApi: RemoveUsersFromGroupsApi = async (data) => {
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

export default removeUsersFromGroupsBuilder;
