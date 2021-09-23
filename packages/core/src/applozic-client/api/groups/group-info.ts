import BaseClient, { BaseResponse, METHODS } from '../../base';
import Group from '../../models/Group';

const ENDPOINT = '/rest/ws/group/v2/info';

export interface GroupInfoApi {
  (clientGroupId: string): Promise<Group>;
}

const groupInfoBuilder = (applozicClient: BaseClient): GroupInfoApi => {
  const groupInfoApi: GroupInfoApi = async clientGroupId => {
    const response: BaseResponse<Group> = await applozicClient.makeApiCall(
      METHODS.GET,
      ENDPOINT,
      {
        query: {
          groupId: clientGroupId
        },
        useAuth: true
      }
    );
    return response.response;
  };
  return groupInfoApi;
};

export default groupInfoBuilder;
