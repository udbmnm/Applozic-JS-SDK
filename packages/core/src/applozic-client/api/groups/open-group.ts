import BaseClient, { BaseResponse, METHODS } from '../../base';
import Group from '../../models/Group';

const ENDPOINT = '/rest/ws/group/v2/channel';

export interface OpenGroupReq {
  pageSize?: number;
  endTime?: number;
}

export interface OpenGroupRes {
  groupPxys: Group[];
  lastFetchTime: number;
}

export interface OpenGroupApi {
  (data: OpenGroupReq): Promise<OpenGroupRes>;
}

const openGroupBuilder = (applozicClient: BaseClient): OpenGroupApi => {
  const openGroupApi: OpenGroupApi = async data => {
    const response: BaseResponse<OpenGroupRes> = await applozicClient.makeApiCall(
      METHODS.GET,
      ENDPOINT,
      {
        query: { ...data },
        useAuth: true
      }
    );
    return response.response;
  };
  return openGroupApi;
};

export default openGroupBuilder;
