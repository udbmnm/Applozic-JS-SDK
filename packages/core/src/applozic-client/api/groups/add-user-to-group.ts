import BaseClient, { BaseResponse, METHODS } from "../../base";
import { UserRoles } from "../../models/Group";

const ENDPOINT = "/rest/ws/group/add/member";

export interface IAddUserToGroupRequest {
  userId: string;
  clientGroupId: string;
  role: UserRoles;
}

export interface AddUserToGroupApi {
  (data: IAddUserToGroupRequest): Promise<BaseResponse<string>>;
}

const addUserToGroupBuilder = (
  applozicClient: BaseClient
): AddUserToGroupApi => {
  const userDetailsApi: AddUserToGroupApi = async (data) => {
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

export default addUserToGroupBuilder;
