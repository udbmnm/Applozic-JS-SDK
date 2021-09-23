import BaseClient from "../../base";
import addUserToGroupBuilder from "./add-user-to-group";
import addUsersToGroupsBuilder from "./add-users-to-groups";
import createGroupBuilder from "./create-group";
import createOpenFriendListBuilder from "./create-open-friend-list";
import createUserFriendListBuilder from "./create-user-friend-list";
import deleteFriendListBuilder from "./delete-friend-list";
import deleteGroupBuilder from "./delete-group";
import deleteGroupsBuilder from "./delete-groups";
import getFriendListBuilder from "./get-friend-list";
import groupInfoBuilder from "./group-info";
import isUserPresentBuilder from "./is-user-present";
import leaveGroupBuilder from "./leave-group";
import openGroupBuilder from "./open-group";
import removeFromFriendListBuilder from "./remove-from-friend-list";
import removeUserFromAllGroupsBuilder from "./remove-user-from-all-groups";
import removeUserFromGroupBuilder from "./remove-user-from-group";
import updateGroupDetailsBuilder from "./update-group-details";
import updateGroupUserDetailsBuilder from "./update-group-user-details";
import userCountBuilder from "./user-count";
import userGroupListBuilder from "./user-group-list";

const groupsApiBuilder = (client: BaseClient) => ({
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
});

export default groupsApiBuilder;
