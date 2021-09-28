import BaseClient, { BaseResponse, METHODS } from '../../base';
import { GroupTypes } from '../../models/Group';
import Group from '../../models/Group';

const ENDPOINT = '/rest/ws/group/v2/create';

/**
 * Create group request
 *
 * For usage, see {@link GroupsApi.createGroup}
 */
export interface CreateGroupReq {
  groupName: string;
  groupMemberList: string[];
  metadata?: { [key: string]: string };
  type: GroupTypes;
  admin?: string;
  imageUrl?: string;
  users?: string[];
  clientGroupId?: string;
}

/**
 * For usage, see {@link GroupsApi.createGroup}
 */
export interface CreateGroupApi {
  (data: CreateGroupReq): Promise<Group>;
}

const createGroupBuilder = (applozicClient: BaseClient): CreateGroupApi => {
  const createGroupApi: CreateGroupApi = async data => {
    const response: BaseResponse<Group> = await applozicClient.makeApiCall(
      METHODS.POST,
      ENDPOINT,
      {
        data,
        useAuth: true
      }
    );
    return response.response;
  };
  return createGroupApi;
};

export default createGroupBuilder;
