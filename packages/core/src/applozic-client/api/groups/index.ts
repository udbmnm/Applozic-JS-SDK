import BaseClient from '../../base';
import addUserToGroupBuilder, { AddUserToGroupApi } from './add-user-to-group';
import addUsersToGroupsBuilder, {
  AddUsersToGroupsApi
} from './add-users-to-groups';
import createGroupBuilder, { CreateGroupApi } from './create-group';
import createOpenFriendListBuilder, {
  CreateOpenFriendListApi
} from './create-open-friend-list';
import createUserFriendListBuilder, {
  CreateUserFriendListApi
} from './create-user-friend-list';
import deleteFriendListBuilder, {
  DeleteFriendListApi
} from './delete-friend-list';
import deleteGroupBuilder, { DeleteGroupApi } from './delete-group';
import deleteGroupsBuilder, { DeleteGroupsApi } from './delete-groups';
import getFriendListBuilder, { GetFriendListApi } from './get-friend-list';
import groupInfoBuilder, { GroupInfoApi } from './group-info';
import isUserPresentBuilder, { IsUserPresentApi } from './is-user-present';
import leaveGroupBuilder, { LeaveGroupApi } from './leave-group';
import openGroupBuilder, { OpenGroupApi } from './open-group';
import removeFromFriendListBuilder, {
  RemoveFromFriendListApi
} from './remove-from-friend-list';
import removeUserFromAllGroupsBuilder, {
  RemoveUserFromAllGroupsApi
} from './remove-user-from-all-groups';
import removeUserFromGroupBuilder, {
  RemoveUserFromGroupApi
} from './remove-user-from-group';
import removeUsersFromGroupsBuilder, {
  RemoveUsersFromGroupsApi
} from './remove-users-from-groups';
import updateGroupDetailsBuilder, {
  UpdateGroupDetailsApi
} from './update-group-details';
import updateGroupUserDetailsBuilder, {
  UpdateGroupUserDetailsApi
} from './update-group-user-details';
import userCountBuilder, { UserCountApi } from './user-count';
import userGroupListBuilder, { UserGroupListApi } from './user-group-list';

export interface GroupsApi {
  /**
   * Add a user to a group
   *
   * https://docs.applozic.com/reference/groups#add-user-to-group
   *
   * Sample usage:
   * ```typescript
   * import { UserRoles } from '@applozic/core-sdk';
   *
   * const result = await applozicClient.groups.addUserToGroup({
   *    userId: 'some-user-id',
   *    clientGroupId: 'group-id',
   *    role: UserRoles.MEMBER
   * });
   * console.log({ result });
   * ```
   */
  addUserToGroup: AddUserToGroupApi;
  /**
   * Add users To many Groups
   *
   * https://docs.applozic.com/reference/groups#add-users-to-many-groups
   *
   * Sample usage:
   * ```typescript
   * const result = await applozicClient.groups.addUserToGroup({
   *    userIds: ['some-user-id', 'some-other-user-id'],
   *    clientGroupId: ['groupId1','groupId2']
   * });
   * console.log({ result });
   * ```
   */
  addUsersToGroups: AddUsersToGroupsApi;
  /**
   * Create a new group
   *
   * https://docs.applozic.com/reference/groups#create-group
   *
   * Sample usage:
   * ```typescript
   * import { GroupTypes } from '@applozic/core-sdk';
   *
   * const newGroup = await applozicClient.groups.createGroup({
   *    groupName: 'group name',
   *    groupMemberList: ['user1', 'user2'],
   *    imageUrl: 'https://example.com/image.png',
   *    type: GroupTypes.PUBLIC,
   * });
   * console.log({ newGroup });
   * ```
   */
  createGroup: CreateGroupApi;
  /**
   * Create Open Friend/Favourite Contacts List
   *
   * https://docs.applozic.com/reference/groups#create-open-friendfavourite-contacts-list
   *
   * Sample usage:
   * ```typescript
   * const result = await applozicClient.groups.createOpenFriendList({
   *    groupName: 'group name',
   *    groupMemberList: ['user1','user2','user3']
   * });
   * console.log({ result });
   * ```
   */
  createOpenFriendList: CreateOpenFriendListApi;
  /**
   * Create Open Friend/Favourite Contacts List
   *
   * https://docs.applozic.com/reference/groups#create-users-friendfavourite-contacts-list
   *
   * Sample usage:
   * ```typescript
   * const result = await applozicClient.groups.createUserFriendList({
   *    groupName: 'group name',
   *    userList: ['user1','user2','user3']
   * });
   * console.log({ result });
   * ```
   */
  createUserFriendList: CreateUserFriendListApi;
  /**
   * Delete Friend List
   *
   * https://docs.applozic.com/reference/groups#delete-friend-list
   *
   * Sample usage:
   * ```typescript
   * import { GroupTypes } from '@applozic/core-sdk';
   *
   * const result = await applozicClient.groups.deleteFriendList({
   *    clientGroupId: 'group name',
   *    // groupType: GroupTypes.OPEN // optional, required if groupType is OPEN
   * });
   * console.log({ result });
   * ```
   */
  deleteFriendList: DeleteFriendListApi;
  /**
   * Delete Friend List
   *
   * https://docs.applozic.com/reference/groups#group-delete
   *
   * Sample usage:
   * ```typescript
   * const result = await applozicClient.groups.deleteGroup({
   *    clientGroupId: 'group name',
   * });
   * console.log({ result });
   * ```
   */

  deleteGroup: DeleteGroupApi;
  /**
   * Delete Friend List
   *
   * https://docs.applozic.com/reference/groups#delete-multiple-groups
   *
   * Sample usage:
   * ```typescript
   * const result = await applozicClient.groups.deleteGroups({
   *    clientGroupIds: ['group1', 'group2']
   * });
   * console.log({ result });
   * ```
   */
  deleteGroups: DeleteGroupsApi;
  /**
   * Get Friend List
   *
   * https://docs.applozic.com/reference/groups#get-friendfavourite-list
   *
   * Sample usage:
   * ```typescript
   * import { GroupTypes } from '@applozic/core-sdk';
   *
   * const result = await applozicClient.groups.getFriendList({
   *    groupName: 'group name'
   *    // groupType: GroupTypes.OPEN // optional, required if groupType is OPEN
   * });
   * console.log({ result });
   * ```
   */
  getFriendList: GetFriendListApi;
  /**
   * Get Group Info
   *
   * https://docs.applozic.com/reference/groups#group-info
   *
   * Sample usage:
   * ```typescript
   * const result = await applozicClient.groups.groupInfo('group-id');
   * console.log({ result });
   * ```
   */
  groupInfo: GroupInfoApi;
  /**
   * Check if a user is present in a group
   *
   * https://docs.applozic.com/reference/groups#group-is-user-present
   *
   * Sample usage:
   * ```typescript
   * const result = await applozicClient.groups.isUserPresent({
   *   userId: 'some-user-id',
   *   clientGroupId: 'group-id'
   * });
   * console.log({ result });
   * ```
   */
  isUserPresent: IsUserPresentApi;
  /**
   * Leave a group
   *
   * https://docs.applozic.com/reference/groups#leave-group
   *
   * Sample usage:
   * ```typescript
   * const result = await applozicClient.groups.leaveGroup({
   *   clientGroupId: 'group-id',
   *   resetCount: true
   * });
   * console.log({ result });
   * ```
   */
  leaveGroup: LeaveGroupApi;
  /**
   * Get the list of open groups
   *
   * https://docs.applozic.com/reference/groups#leave-group
   *
   * Sample usage:
   * ```typescript
   * const page1 = await applozicClient.groups.openGroup({
   *   endTime: Date.now()
   * });
   *
   * const page2 = await applozicClient.groups.openGroup({
   *   endTime: page1.lastFetchTime
   * });
   * console.log({ page1, page2 });
   * ```
   */
  openGroup: OpenGroupApi;
  /**
   * Get the list of open groups
   *
   * https://docs.applozic.com/reference/groups#remove-user-from-friend-list
   *
   * Sample usage:
   * ```typescript
   * import { GroupTypes } from '@applozic/core-sdk';
   *
   * const result = await applozicClient.groups.removeFromFriendList({
   *   groupName: 'group-name',
   *   userId: 'user-id'
   *   // groupType: GroupTypes.OPEN // optional, required if groupType is OPEN
   * });
   * console.log({ result });
   * ```
   */
  removeFromFriendList: RemoveFromFriendListApi;
  /**
   * Remove user from all groups
   *
   * # ⚠️ Warning ⚠️
   * ### API will remove User from all Private, Public and Open Groups.
   *
   * https://docs.applozic.com/reference/groups#remove-user-from-all-groups
   *
   * Sample usage:
   * ```typescript
   * const result = await applozicClient.groups.removeUserFromAllGroups({
   *   userId: 'user-id'
   * });
   * console.log({ result });
   * ```
   */
  removeUserFromAllGroups: RemoveUserFromAllGroupsApi;
  /**
   * Remove a user from a group
   *
   * https://docs.applozic.com/reference/groups#remove-user-from-group
   *
   * Sample usage:
   * ```typescript
   * const result = await applozicClient.groups.removeUserFromGroup({
   *   userId: 'user-id',
   *   clientGroupId: 'group-id'
   * });
   * console.log({ result });
   * ```
   */
  removeUserFromGroup: RemoveUserFromGroupApi;
  /**
   * Remove multiple users from multiple groups
   *
   * https://docs.applozic.com/reference/groups#remove-users-from-many-groups
   *
   * Sample usage:
   * ```typescript
   * const result = await applozicClient.groups.removeUserFromGroup({
   *   userIds: ['userId1', 'userId2', 'userId3'],
   *   clientGroupIds: ['groupId1', 'groupId2']
   * });
   * console.log({ result });
   * ```
   */
  removeUsersFromGroups: RemoveUsersFromGroupsApi;
  /**
   * Update group details
   *
   * https://docs.applozic.com/reference/groups#update-group-details
   *
   * Sample usage:
   * ```typescript
   * const result = await applozicClient.groups.updateGroupInfo({
   *    clientGroupId:'group-id',
   *    newName:'The Starks',
   *    imageUrl:'https://www.applozic.com/resources/images/applozic_logo.gif',
   *    metadata:{
   *      key1 : 'value1',
   *      key2 : 'value2'
   *    }
   * });
   * console.log({ result });
   * ```
   */
  updateGroupInfo: UpdateGroupDetailsApi;
  /**
   * Use this API to mute the group notifications
   *
   * https://docs.applozic.com/reference/groups#update-group-user-properties
   *
   * Sample usage:
   * ```typescript
   * const result = await applozicClient.groups.updateUserDetails({
   *    clientGroupId: 'group-id',
   *    notificationAfterTime: 1000
   * });
   * console.log({ result });
   * ```
   */
  updateUserDetails: UpdateGroupUserDetailsApi;
  /**
   * Get total user count in multiple groups
   *
   * https://docs.applozic.com/reference/groups#group-users-count
   *
   * Sample usage:
   * ```typescript
   * const result = await applozicClient.groups.userCount({
   *    clientGroupIds: ['group-id', 'group-id-2']
   * });
   * console.log({ result });
   * ```
   */
  userCount: UserCountApi;
  /**
   * Get total user count in multiple groups
   *
   * https://docs.applozic.com/reference/groups#users-group-list
   *
   * Sample usage:
   * ```typescript
   * const result = await applozicClient.groups.userGroupList();
   * console.log({ result });
   * ```
   */
  userGroupList: UserGroupListApi;
}

const groupsApiBuilder = (client: BaseClient): GroupsApi => ({
  createGroup: createGroupBuilder(client),
  groupInfo: groupInfoBuilder(client),
  addUserToGroup: addUserToGroupBuilder(client),
  updateGroupInfo: updateGroupDetailsBuilder(client),
  addUsersToGroups: addUsersToGroupsBuilder(client),
  deleteGroup: deleteGroupBuilder(client),
  deleteGroups: deleteGroupsBuilder(client),
  isUserPresent: isUserPresentBuilder(client),
  leaveGroup: leaveGroupBuilder(client),
  openGroup: openGroupBuilder(client),
  removeUserFromGroup: removeUserFromGroupBuilder(client),
  removeUserFromAllGroups: removeUserFromAllGroupsBuilder(client),
  updateUserDetails: updateGroupUserDetailsBuilder(client),
  userCount: userCountBuilder(client),
  userGroupList: userGroupListBuilder(client),
  createOpenFriendList: createOpenFriendListBuilder(client),
  createUserFriendList: createUserFriendListBuilder(client),
  getFriendList: getFriendListBuilder(client),
  removeFromFriendList: removeFromFriendListBuilder(client),
  deleteFriendList: deleteFriendListBuilder(client),
  removeUsersFromGroups: removeUsersFromGroupsBuilder(client)
});

export default groupsApiBuilder;
