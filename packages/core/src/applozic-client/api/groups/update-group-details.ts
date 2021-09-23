import BaseClient, { BaseResponse, METHODS } from '../../base';
import { UserRoles } from '../../models/Group';
import Group from '../../models/Group';

const ENDPOINT = '/rest/ws/group/update';

export interface IUpdateGroupUser {
  userId: string;
  role: UserRoles;
}

export interface IUpdateGroupDetailsRequest {
  groupId?: string;
  clientGroupId?: string;
  newName?: string;
  imageUrl?: string;
  metadata?: { [key: string]: string };
  users?: IUpdateGroupUser[];
}

export interface UpdateGroupDetailsApi {
  (data: IUpdateGroupDetailsRequest): Promise<BaseResponse<Group>>;
}

const updateGroupDetailsBuilder = (
  applozicClient: BaseClient
): UpdateGroupDetailsApi => {
  const userDetailsApi: UpdateGroupDetailsApi = async data => {
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

export default updateGroupDetailsBuilder;
