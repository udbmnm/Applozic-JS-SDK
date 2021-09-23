import BaseClient, { BaseResponse, METHODS } from "../../base";

const ENDPOINT = "/rest/ws/user/remove/group/all";

export interface IRemoveUserFromAllGroups {
  userId: string;
}

export interface RemoveUserFromAllGroupsApi {
  (data: IRemoveUserFromAllGroups): Promise<BaseResponse<string>>;
}

const removeUserFromAllGroupsBuilder = (
  applozicClient: BaseClient
): RemoveUserFromAllGroupsApi => {
  const removeUserFromAllGroupsApi: RemoveUserFromAllGroupsApi = async (
    data
  ) => {
    const response: BaseResponse<string> = await applozicClient.makeApiCall(
      METHODS.GET,
      ENDPOINT,
      {
        query: { ...data },
        useAuth: true,
      }
    );
    return response;
  };
  return removeUserFromAllGroupsApi;
};

export default removeUserFromAllGroupsBuilder;
