import { UpdateUserDetailsApi, UpdateUserPasswordApi } from 'src';
import BaseClient from '../../base';
import blockListSyncBuilder, {
  BaseBlockListItemDetail,
  BlockedByListItemDetail,
  BlockedToListItemDetail,
  BlockListSyncApi,
  BlockListSyncRes
} from './block-list-sync';
import blockUserBuilder, { BlockUserApi } from './block-user';
import getContactListBuilder, {
  ContactListApiReq,
  ContactListApiRes,
  ContactListApi
} from './get-contact-list';
import getUserDetailsBuilder, { UserDetailsApi } from './get-user-details';
import unblockUserBuilder, { UnblockUserApi } from './unblock-user';
import updateUserDetailsBuilder from './update-user-details';
import updateUserPasswordBuilder from './update-user-password';

export interface ContactsApi {
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
  blockListSync: BlockListSyncApi;
  /**
   * Block a particular user
   *
   * https://docs.applozic.com/reference/contacts#users-block-list-sync
   *
   * Sample usage:
   * ```typescript
   * const blockResult = await applozicClient.contacts.blockUser('some-user-id');
   * ```
   */
  blockUser: BlockUserApi;
  /**
   * Get the contact list of the logged in user
   *
   * https://docs.applozic.com/reference/contacts#contact-list
   *
   * Sample usage:
   * ```typescript
   * // Send latest timestamp
   * const page1 = await applozicClient.contacts.getContactList(Date.now());
   *
   * // Send timestamp of last fetch
   * const page2 = await applozicClient.contacts.getContactList(page1.lastFetchTime);
   * ```
   */
  getContactList: ContactListApi;
  /**
   * Get details of a user
   *
   * https://docs.applozic.com/reference/contacts#user-details
   *
   * Sample usage:
   * ```typescript
   * const contact = await applozicClient.contacts.getUserDetails(['some-user-id']);;
   * console.log({ contact });
   * ```
   */
  getUserDetails: UserDetailsApi;
  /**
   * Unblock a user
   *
   * https://docs.applozic.com/reference/contacts#unblock-user
   *
   * Sample usage:
   * ```typescript
   * const unblockUser = await applozicClient.contacts.unblockUser('some-user-id');
   * ```
   */
  unblockUser: UnblockUserApi;
  /**
   * Update details of currently logged in user
   *
   * https://docs.applozic.com/reference/contacts#update-user
   *
   * Sample usage:
   * ```typescript
   * const updatedUser = await applozicClient.contacts.updateUserDetails({
   *   email: 'new@email.com'
   *   displayName: 'New Name'
   *   imageLink: 'https://new.image.com/link.png'
   *   statusMessage: 'New status message'
   * });
   * ```
   */
  updateUserDetails: UpdateUserDetailsApi;
  /**
   * Update details of currently logged in user
   *
   * https://docs.applozic.com/reference/contacts#update-user
   *
   * Sample usage:
   * ```typescript
   * const updatedPasswordResult = await applozicClient.contacts.updateUserDetails(
   *   'oldPassword',
   *   'newPassword'
   * );
   * console.log({ updatedPasswordResult });
   * ```
   */
  updateUserPassword: UpdateUserPasswordApi;
}

const contactsApiBuilder = (client: BaseClient): ContactsApi => ({
  blockListSync: blockListSyncBuilder(client),
  blockUser: blockUserBuilder(client),
  unblockUser: unblockUserBuilder(client),
  updateUserDetails: updateUserDetailsBuilder(client),
  updateUserPassword: updateUserPasswordBuilder(client),
  getContactList: getContactListBuilder(client),
  getUserDetails: getUserDetailsBuilder(client)
});

export default contactsApiBuilder;
