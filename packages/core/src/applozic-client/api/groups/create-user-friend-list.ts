import BaseClient, { BaseResponse, METHODS } from "../../base";

const ENDPOINT = (groupName: string) => `/rest/ws/group/${groupName}/add`;

export interface ICreateUserFriendListRequest {
  groupName: string;
  userList: string[];
}

export interface CreateUserFriendListApi {
  (data: ICreateUserFriendListRequest): Promise<BaseResponse<string>>;
}

const createUserFriendListBuilder = (
  applozicClient: BaseClient
): CreateUserFriendListApi => {
  const createUserFriendListApi: CreateUserFriendListApi = async (data) => {
    const response: BaseResponse<string> = await applozicClient.makeApiCall(
      METHODS.POST,
      ENDPOINT(data.groupName),
      {
        data: data.userList,
        useAuth: true,
      }
    );
    return response;
  };
  return createUserFriendListApi;
};

export default createUserFriendListBuilder;
