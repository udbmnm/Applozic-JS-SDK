import BaseClient, { BaseResponse, METHODS } from '../../base';
import Group from '../../models/Group';

const ENDPOINT = '/rest/ws/group/v2/channel';

export interface IOpenGroupRequest {
  pageSize?: number;
  endTime?: number;
}

export interface IOpenGroupResponse {
  groupPxys: Group[];
  lastFetchTime: number;
}

export interface OpenGroupApi {
  (data: IOpenGroupRequest): Promise<BaseResponse<IOpenGroupResponse>>;
}

const openGroupBuilder = (applozicClient: BaseClient): OpenGroupApi => {
  const openGroupApi: OpenGroupApi = async data => {
    const response: BaseResponse<IOpenGroupResponse> = await applozicClient.makeApiCall(
      METHODS.GET,
      ENDPOINT,
      {
        query: { ...data },
        useAuth: true
      }
    );
    return response;
  };
  return openGroupApi;
};

export default openGroupBuilder;
