import User from "../../models/User";
import BaseClient, { METHODS } from "../../base";
import Group from "../../models/Group";

const ENDPOINT = "/rest/ws/user/filter";

interface ContactListRes {
  status: string;
  generatedAt: number;
  response: User[];
}

interface GetContactsRes {
  users: User[];
  groups: Group[];
  devices: [];
  lastFetchTime: number;
  lastFetchIndex: number;
  totalUnreadCount: number;
}

export interface ContactListApi {
  (startTime?: number): Promise<GetContactsRes>;
}

const contactListBuilder = (applozicClient: BaseClient): ContactListApi => {
  const contactListApi: ContactListApi = async (startTime) => {
    const response: GetContactsRes = await applozicClient.makeApiCall(
      METHODS.GET,
      ENDPOINT,
      {
        query: {
          startTime,
        },
        useAuth: true,
      }
    );
    return response;
  };
  return contactListApi;
};

export default contactListBuilder;
