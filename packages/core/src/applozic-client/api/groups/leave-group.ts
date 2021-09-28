import BaseClient, { BaseResponse, METHODS } from '../../base';

const ENDPOINT = '/rest/ws/group/left';

/**
 * For usage, see {@link GroupsApi.leaveGroup}
 */
export interface LeaveGroupReq {
  /** Group to leave */
  clientGroupId: string;
  /** reset unread count of the logged in user */
  resetCount?: boolean;
}

/**
 * For usage, see {@link GroupsApi.leaveGroup}
 */
export interface LeaveGroupApi {
  (data: LeaveGroupReq): Promise<string>;
}

const leaveGroupBuilder = (applozicClient: BaseClient): LeaveGroupApi => {
  const leaveGroupApi: LeaveGroupApi = async data => {
    const response: BaseResponse<string> = await applozicClient.makeApiCall(
      METHODS.POST,
      ENDPOINT,
      {
        data,
        useAuth: true
      }
    );
    return response.response;
  };
  return leaveGroupApi;
};

export default leaveGroupBuilder;
