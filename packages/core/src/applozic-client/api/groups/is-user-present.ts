import BaseClient, { BaseResponse, METHODS } from '../../base';

const ENDPOINT = '/rest/ws/group/check/user';

/**
 * For usage, see {@link GroupsApi.isUserPresent}
 */
export interface IsUserPresentReq {
  /** Group to check */
  clientGroupId: string;
  /** User to check */
  userId: string;
}

/**
 * For usage, see {@link GroupsApi.isUserPresent}
 */
export interface IsUserPresentApi {
  (data: IsUserPresentReq): Promise<boolean>;
}

const isUserPresentBuilder = (applozicClient: BaseClient): IsUserPresentApi => {
  const isUserPresentApi: IsUserPresentApi = async data => {
    const response: BaseResponse<boolean> = await applozicClient.makeApiCall(
      METHODS.GET,
      ENDPOINT,
      {
        query: { ...data },
        useAuth: true
      }
    );
    return response.response;
  };
  return isUserPresentApi;
};

export default isUserPresentBuilder;
