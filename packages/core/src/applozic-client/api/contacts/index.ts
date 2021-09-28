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
import unblockUserBuilder from './unblock-user';
import updateUserDetailsBuilder from './update-user-details';
import updateUserPasswordBuilder from './update-user-password';

const contactsApiBuilder = (client: BaseClient) => ({
  blockListSync: blockListSyncBuilder(client),
  blockUser: blockUserBuilder(client),
  unblockUser: unblockUserBuilder(client),
  updateUserDetails: updateUserDetailsBuilder(client),
  updateUserPassword: updateUserPasswordBuilder(client),
  getContactList: getContactListBuilder(client),
  getUserDetails: getUserDetailsBuilder(client)
});

export default contactsApiBuilder;
