import getQueryStringFromData from '../../../utils/get-query-string-from-data';
import BaseClient, { BaseResponse, METHODS } from '../../base';

const ENDPOINT = '/rest/ws/group/multiple/delete';

export interface IDeleteGroups {
  groupIds?: number[];
  clientGroupIds?: string[];
}

export interface DeleteGroupsApi {
  (data: IDeleteGroups): Promise<BaseResponse<string>>;
}

const deleteGroupsBuilder = (applozicClient: BaseClient): DeleteGroupsApi => {
  const deleteGroupsApi: DeleteGroupsApi = async data => {
    const response: BaseResponse<string> = await applozicClient.makeApiCall(
      METHODS.GET,
      `${ENDPOINT}${getQueryStringFromData(data)}`,
      {
        useAuth: true
      }
    );
    return response;
  };
  return deleteGroupsApi;
};

export default deleteGroupsBuilder;
