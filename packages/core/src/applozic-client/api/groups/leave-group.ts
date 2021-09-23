import BaseClient, { BaseResponse, METHODS } from "../../base";

const ENDPOINT = "/rest/ws/group/left";

export interface ILeaveGroupRequest {
  clientGroupId: string;
  resetCount: boolean;
}

export interface LeaveGroupApi {
  (data: ILeaveGroupRequest): Promise<BaseResponse<string>>;
}

const leaveGroupBuilder = (
  applozicClient: BaseClient
): LeaveGroupApi => {
  const userDetailsApi: LeaveGroupApi = async (data) => {
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

export default leaveGroupBuilder;
