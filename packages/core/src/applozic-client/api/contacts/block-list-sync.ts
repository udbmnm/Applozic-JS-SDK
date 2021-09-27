import BaseClient, { BaseResponse, METHODS } from '../../base';

const ENDPOINT = '/rest/ws/user/blocked/sync';

/**
 * Base class for blocked list item details.
 * See {@link BlockListSyncRes}
 */
export interface BaseBlockListItemDetail {
  applicationKey: string;
  createdAtTime: number;
  updatedAtTime: number;
  userBlocked: boolean;
}

/**
 * Detail item for {@link BlockListSyncRes.blockedByUserList}
 */
export interface BlockedByListItemDetail extends BaseBlockListItemDetail {
  /** userId of the user who has blocked currently logged in user */
  blockedBy: string;
}

/**
 * Detail item for {@link BlockListSyncRes.blockedToUserList}
 */
export interface BlockedToListItemDetail extends BaseBlockListItemDetail {
  /** userId of the user blocked by currently logged in user */
  blockedTo: string;
}

/**
 * Response format for {@link BlockListSyncApi}
 */
export interface BlockListSyncRes {
  /** Other users who have blocked the currently logged in user */
  blockedByUserList: BlockedByListItemDetail[];
  /** Users blocked by currently logged in user */
  blockedToUserList: BlockedToListItemDetail[];
}

/**
 * Get the latest block list for the logged in user.
 *
 * https://docs.applozic.com/reference/contacts#users-block-list-sync
 *
 * Sample usage:
 * ```typescript
 * const blockList = await applozicClient.contacts.blockListSync();
 * ```
 */
export interface BlockListSyncApi {
  /**
   * @param lastSyncTime Last sync time in miliseconds
   */
  (lastSyncTime?: number): Promise<BlockListSyncRes>;
}

const blockListSyncBuilder = (applozicClient: BaseClient): BlockListSyncApi => {
  const blockListSyncApi: BlockListSyncApi = async lastSyncTime => {
    const response: string = await applozicClient.makeApiCall(
      METHODS.GET,
      ENDPOINT,
      {
        query: { lastSyncTime: lastSyncTime ?? 0 },
        useAuth: true,
        json: false
      }
    );
    console.log(response);
    try {
      const result = JSON.parse(response) as BaseResponse<BlockListSyncRes>;
      return result.response;
    } catch (e) {
      console.warn('Unable to fetch block list', e);
    }
  };
  return blockListSyncApi;
};

export default blockListSyncBuilder;
