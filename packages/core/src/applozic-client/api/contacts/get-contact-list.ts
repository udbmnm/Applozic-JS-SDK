import User from '../../models/User';
import BaseClient, { METHODS } from '../../base';
import Group from '../../models/Group';

const ENDPOINT = '/rest/ws/user/filter';

/**
 * Request format for {@link ContactListApi}
 */
export interface ContactListApiReq {
  /** Pass this to load more contacts */
  startTime?: number;
  /** Number of contacts to load */
  pageSize?: number;
  /** userId of user for which information has to be retrieved */
  userId?: string;
  /** Role of user for which information has to be retrieved */
  role?: 'BOT' | 'USER';
}

/**
 * Response format for {@link ContactListApi}
 */
export interface ContactListApiRes {
  /** List of users */
  users: User[];
  /** List of groups */
  groups: Group[];
  devices: [];
  /** Use this to get the next page of users */
  lastFetchTime: number;
  lastFetchIndex: number;
  totalUnreadCount: number;
}

/**
 * For usage, see {@link ContactsApi.getContactList}
 */
export interface ContactListApi {
  /**
   * @param options Contact list fetch options
   */
  (options?: ContactListApiReq): Promise<ContactListApiRes>;
}

const contactListBuilder = (applozicClient: BaseClient): ContactListApi => {
  const contactListApi: ContactListApi = async options => {
    const response: ContactListApiRes = await applozicClient.makeApiCall(
      METHODS.GET,
      ENDPOINT,
      {
        query: {
          ...options
        },
        useAuth: true
      }
    );
    return response;
  };
  return contactListApi;
};

export default contactListBuilder;
