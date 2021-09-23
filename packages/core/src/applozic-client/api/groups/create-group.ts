import BaseClient, { BaseResponse, METHODS } from '../../base';
import { GroupTypes } from '../../models/Group';
import Group from '../../models/Group';

const ENDPOINT = '/rest/ws/group/v2/create';

export interface ICreateGroupRequest {
  groupName: string;
  groupMemberList: string[];
  metadata?: { [key: string]: string };
  type: GroupTypes;
  admin?: string;
  imageUrl?: string;
  users?: string[];
  clientGroupId?: string;
}

export interface CreateGroupApi {
  (data: ICreateGroupRequest): Promise<BaseResponse<Group>>;
}

const createGroupBuilder = (applozicClient: BaseClient): CreateGroupApi => {
  const userDetailsApi: CreateGroupApi = async data => {
    const response: BaseResponse<Group> = await applozicClient.makeApiCall(
      METHODS.POST,
      ENDPOINT,
      {
        data,
        useAuth: true
      }
    );
    return response;
  };
  return userDetailsApi;
};

export default createGroupBuilder;
