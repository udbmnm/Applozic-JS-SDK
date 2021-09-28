import ApplozicClient from './applozic-client';
import {
  IncomingMessage,
  Message,
  MessageData,
  MessageContentType,
  MessageType,
  BaseSendMessageReq,
  BaseBroadcastMessageReq,
  SendMessageReq,
  SendMessageUserReq,
  SendMessageGroupReq,
  SendMessageUserBroadcastReq,
  SendMessageGroupBroadcastReq,
  SendMessageRes
} from './applozic-client/models/Message';
import FileMeta from './applozic-client/models/FileMeta';
import {
  default as Group,
  GroupTypes,
  UserRoles,
  getNameFromGroup
} from './applozic-client/models/Group';
import {
  default as User,
  getNameFromUser
} from './applozic-client/models/User';
import LoginResult from './applozic-client/models/LoginResult';
import {
  IUpdateGroupDetailsRequest,
  IUpdateGroupUser,
  UpdateGroupDetailsApi
} from './applozic-client/api/groups/update-group-details';
import {
  BaseBlockListItemDetail,
  BlockedByListItemDetail,
  BlockedToListItemDetail,
  BlockListSyncApi,
  BlockListSyncRes
} from './applozic-client/api/contacts/block-list-sync';
import { BlockUserApi } from './applozic-client/api/contacts/block-user';

import {
  ContactListApiReq,
  ContactListApiRes,
  ContactListApi
} from './applozic-client/api/contacts/get-contact-list';

import { UserDetailsApi } from './applozic-client/api/contacts/get-user-details';

import { UnblockUserApi } from './applozic-client/api/contacts/unblock-user';
import {
  UpdateUserDetailsReq,
  UpdateUserDetailsApi
} from './applozic-client/api/contacts/update-user-details';

import { UpdateUserPasswordApi } from './applozic-client/api/contacts/update-user-password';

import { SendMessageApi } from './applozic-client/api/messages/send';

import { UploadApi } from './applozic-client/api/files/upload';

import {
  AddUserToGroupRequest,
  AddUserToGroupApi
} from './applozic-client/api/groups/add-user-to-group';

import { DeleteAllMessagesApi } from './applozic-client/api/messages/delete-all';

import BaseClient, { BaseResponse } from './applozic-client/base';
import BaseClientWithApi from './applozic-client/base-with-api';
import BaseClientWithStore from './applozic-client/base-with-store';

import { ContactsApi } from './applozic-client/api/contacts';
import { FilesApi } from './applozic-client/api/files';
import { MessagesApi } from './applozic-client/api/messages';

import { DeleteMessageApi } from './applozic-client/api/messages/delete';
import {
  DeleteConversationApi,
  DeleteGroupConversation,
  DeleteUserConversation
} from './applozic-client/api/messages/delete-conversation';
import { DeleteMessageOlderThanApi } from './applozic-client/api/messages/delete-older-than';
import {
  MessageListReq,
  MessageListRes,
  MessageListApi
} from './applozic-client/api/messages/list';
import { GroupsApi } from './applozic-client/api/groups';
import { AddUsersToGroupsApi } from './applozic-client/api/groups/add-users-to-groups';
import {
  CreateGroupApi,
  CreateGroupReq
} from './applozic-client/api/groups/create-group';
import {
  CreateOpenFriendListApi,
  CreateOpenFriendListReq
} from './applozic-client/api/groups/create-open-friend-list';
import {
  CreateUserFriendListApi,
  CreateUserFriendListReq
} from './applozic-client/api/groups/create-user-friend-list';
import {
  DeleteFriendListApi,
  DeleteFriendListReq
} from './applozic-client/api/groups/delete-friend-list';
import {
  DeleteGroupApi,
  DeleteGroupReq
} from './applozic-client/api/groups/delete-group';
import {
  DeleteGroupsApi,
  DeleteGroupsReq
} from './applozic-client/api/groups/delete-groups';
import {
  GetFriendListApi,
  GetFriendListReq
} from './applozic-client/api/groups/get-friend-list';
import { GroupInfoApi } from './applozic-client/api/groups/group-info';
import {
  IsUserPresentApi,
  IsUserPresentReq
} from './applozic-client/api/groups/is-user-present';
import {
  LeaveGroupApi,
  LeaveGroupReq
} from './applozic-client/api/groups/leave-group';
import {
  OpenGroupApi,
  OpenGroupReq,
  OpenGroupRes
} from './applozic-client/api/groups/open-group';
import {
  RemoveFromFriendListApi,
  RemoveFromFriendListReq
} from './applozic-client/api/groups/remove-from-friend-list';
import {
  RemoveUserFromAllGroupsApi,
  RemoveUserFromAllGroupsReq
} from './applozic-client/api/groups/remove-user-from-all-groups';
import {
  RemoveUserFromGroupApi,
  RemoveUserFromGroupReq
} from './applozic-client/api/groups/remove-user-from-group';
import {
  RemoveUsersFromGroupsApi,
  RemoveUsersFromGroupsReq
} from './applozic-client/api/groups/remove-users-from-groups';
import {
  UpdateGroupUserDetailsApi,
  UpdateGroupUserDetailsReq
} from './applozic-client/api/groups/update-group-user-details';
import {
  UserCountApi,
  UserCountReq,
  UserCountResItem
} from './applozic-client/api/groups/user-count';
import {
  UserGroupListApi,
  UserGroupListReq
} from './applozic-client/api/groups/user-group-list';
import ApplozicSocket, {
  ApplozicSocketOptions
} from './applozic-client/socket';
import { SocketEventListener } from './applozic-client/socket/socket-events';

export {
  BaseBlockListItemDetail,
  BlockedByListItemDetail,
  BlockedToListItemDetail,
  BlockListSyncApi,
  BlockListSyncRes,
  BlockUserApi,
  ContactListApiReq,
  ContactListApiRes,
  ContactListApi,
  UnblockUserApi,
  UserDetailsApi,
  UpdateUserDetailsReq,
  UpdateUserDetailsApi,
  UpdateUserPasswordApi,
  UploadApi,
  AddUserToGroupRequest,
  AddUserToGroupApi,
  AddUsersToGroupsApi,
  CreateGroupReq,
  CreateGroupApi,
  CreateOpenFriendListReq,
  CreateOpenFriendListApi,
  CreateUserFriendListReq,
  CreateUserFriendListApi,
  DeleteFriendListReq,
  DeleteFriendListApi,
  DeleteGroupReq,
  DeleteGroupApi,
  DeleteGroupsReq,
  DeleteGroupsApi,
  GetFriendListReq,
  GetFriendListApi,
  GroupInfoApi,
  IsUserPresentReq,
  IsUserPresentApi,
  LeaveGroupReq,
  LeaveGroupApi,
  OpenGroupReq,
  OpenGroupRes,
  OpenGroupApi,
  RemoveFromFriendListReq,
  RemoveFromFriendListApi,
  RemoveUserFromAllGroupsReq,
  RemoveUserFromAllGroupsApi,
  RemoveUserFromGroupReq,
  RemoveUserFromGroupApi,
  RemoveUsersFromGroupsReq,
  RemoveUsersFromGroupsApi,
  UpdateGroupDetailsApi,
  UpdateGroupUserDetailsReq,
  UpdateGroupUserDetailsApi,
  UserCountReq,
  UserCountResItem,
  UserCountApi,
  UserGroupListReq,
  UserGroupListApi,
  DeleteMessageApi,
  DeleteAllMessagesApi,
  DeleteUserConversation,
  DeleteGroupConversation,
  DeleteConversationApi,
  DeleteMessageOlderThanApi,
  MessageListReq,
  MessageListRes,
  MessageListApi,
  ContactsApi,
  FilesApi,
  MessagesApi,
  GroupsApi,
  SendMessageApi,
  BaseClient,
  BaseResponse,
  BaseClientWithApi,
  BaseClientWithStore,
  IncomingMessage,
  Message,
  MessageData,
  LoginResult,
  MessageContentType,
  MessageType,
  BaseSendMessageReq,
  BaseBroadcastMessageReq,
  SendMessageReq,
  SendMessageUserReq,
  SendMessageGroupReq,
  SendMessageUserBroadcastReq,
  SendMessageGroupBroadcastReq,
  SendMessageRes,
  FileMeta,
  Group,
  GroupTypes,
  getNameFromGroup,
  UserRoles,
  User,
  getNameFromUser,
  IUpdateGroupDetailsRequest, // TODO refactor export name
  IUpdateGroupUser, // TODO refactor export name
  ApplozicSocketOptions,
  ApplozicSocket,
  SocketEventListener,
  ApplozicClient
};

export default ApplozicClient;
