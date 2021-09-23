import BaseClient, { BaseResponse, METHODS } from "../../base";

const ENDPOINT = "/rest/ws/group/check/user";

export interface IIsUserPresent {
  clientGroupId: string;
  userId: string;
}

export interface IsUserPresentApi {
  (data: IIsUserPresent): Promise<BaseResponse<boolean>>;
}

const isUserPresentBuilder = (applozicClient: BaseClient): IsUserPresentApi => {
  const isUserPresentApi: IsUserPresentApi = async (data) => {
    const response: BaseResponse<boolean> = await applozicClient.makeApiCall(
      METHODS.GET,
      ENDPOINT,
      {
        query: {...data},
        useAuth: true,
      }
    );
    return response;
  };
  return isUserPresentApi;
};

export default isUserPresentBuilder;
