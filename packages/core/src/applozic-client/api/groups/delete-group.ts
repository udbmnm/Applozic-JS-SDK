import BaseClient, { BaseResponse, METHODS } from '../../base';

const ENDPOINT = '/rest/ws/group/delete';

/**
 * For usage, see {@link GroupsApi.deleteGroup}
 */
export interface DeleteGroupReq {
  clientGroupId: string;
}

/**
 * For usage, see {@link GroupsApi.deleteGroup}
 */
export interface DeleteGroupApi {
  (data: DeleteGroupReq): Promise<BaseResponse<string>>;
}

const deleteGroupBuilder = (applozicClient: BaseClient): DeleteGroupApi => {
  const deleteGroupApi: DeleteGroupApi = async data => {
    const response: BaseResponse<string> = await applozicClient.makeApiCall(
      METHODS.GET,
      ENDPOINT,
      {
        query: { ...data },
        useAuth: true
      }
    );
    return response;
  };
  return deleteGroupApi;
};

export default deleteGroupBuilder;
