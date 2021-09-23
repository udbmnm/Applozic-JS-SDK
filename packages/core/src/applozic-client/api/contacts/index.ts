import BaseClient from '../../base';
import blockListSyncBuilder from './block-list-sync';
import blockUserBuilder from './block-user';
import getContactListBuilder from './get-contact-list';
import getUserDetailsBuilder from './get-user-details';
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
