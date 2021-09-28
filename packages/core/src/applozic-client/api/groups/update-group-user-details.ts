import BaseClient, { BaseResponse, METHODS } from '../../base';

const ENDPOINT = '/rest/ws/group/user/update';

/** For usage, see {@link GroupsApi.updateUserDetails} */
export interface UpdateGroupUserDetailsReq {
  clientGroupId: string;
  /**
   * Time Interval in milliseconds upto which notification has to be disabled.
   * Example : Suppose you want to disable it for 10 minutes then: You need to
   * pass time exact value in milliSeconds not the difference value. Like UTC
   * time Value: Mon Dec 30 2019 11:05:58 (1577703958271)
   */
  notificationAfterTime: number;
}

/** For usage, see {@link GroupsApi.updateUserDetails} */
export interface UpdateGroupUserDetailsApi {
  (data: UpdateGroupUserDetailsReq): Promise<string>;
}

const updateGroupUserDetailsBuilder = (
  applozicClient: BaseClient
): UpdateGroupUserDetailsApi => {
  const updateUserDetailsApi: UpdateGroupUserDetailsApi = async data => {
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
  return updateUserDetailsApi;
};

export default updateGroupUserDetailsBuilder;
