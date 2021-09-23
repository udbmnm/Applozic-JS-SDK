import BaseClient, { BaseResponse, METHODS } from "../../base";

const ENDPOINT = "/rest/ws/group/delete";

export interface IDeleteGroup {
  clientGroupId: string;
}

export interface DeleteGroupApi {
  (data: IDeleteGroup): Promise<BaseResponse<string>>;
}

const deleteGroupBuilder = (applozicClient: BaseClient): DeleteGroupApi => {
  const deleteGroupApi: DeleteGroupApi = async (data) => {
    const response: BaseResponse<string> = await applozicClient.makeApiCall(
      METHODS.GET,
      ENDPOINT,
      {
        query: { ...data },
        useAuth: true,
      }
    );
    return response;
  };
  return deleteGroupApi;
};

export default deleteGroupBuilder;
