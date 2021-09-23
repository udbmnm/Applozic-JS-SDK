import BaseClient, { BaseResponse, METHODS } from "../../base";

const ENDPOINT = "/rest/ws/group/add/users";

export interface IAddUsersToGroupsRequest {
  userIds: string[];
  clientGroupIds: string[];
  //   role: UserRoles;
}

export interface AddUsersToGroupsApi {
  (data: IAddUsersToGroupsRequest): Promise<BaseResponse<string>>;
}

const addUsersToGroupsBuilder = (
  applozicClient: BaseClient
): AddUsersToGroupsApi => {
  const userDetailsApi: AddUsersToGroupsApi = async (data) => {
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

export default addUsersToGroupsBuilder;
