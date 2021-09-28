import getQueryStringFromData from '../../../utils/get-query-string-from-data';
import BaseClient, { BaseResponse, METHODS } from '../../base';

const ENDPOINT = '/rest/ws/group/multiple/delete';

/**
 * For usage, see {@link GroupsApi.deleteGroups}
 */
export interface DeleteGroupsReq {
  groupIds?: number[];
  clientGroupIds?: string[];
}

/**
 * For usage, see {@link GroupsApi.deleteGroups}
 */
export interface DeleteGroupsApi {
  (data: DeleteGroupsReq): Promise<string>;
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
    return response.response;
  };
  return deleteGroupsApi;
};

export default deleteGroupsBuilder;
