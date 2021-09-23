import ApplozicClient from "./applozic-client";
import ApplozicApiClient from "./applozic-client/base-with-api";
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
  SendMessageRes,
} from "./applozic-client/models/Message";
import FileMeta from "./applozic-client/models/FileMeta";
import {
  default as Group,
  GroupTypes,
  UserRoles,
  getNameFromGroup,
} from "./applozic-client/models/Group";
import {
  default as User,
  getNameFromUser,
} from "./applozic-client/models/User";
import LoginResult from "./applozic-client/models/LoginResult";
import {
  IUpdateGroupDetailsRequest,
  IUpdateGroupUser,
} from "./applozic-client/api/groups/update-group-details";
import { UpdateUserDetailsReq } from "./applozic-client/api/contacts/update-user-details";

export {
  ApplozicApiClient,
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
  IUpdateGroupDetailsRequest,
  IUpdateGroupUser,
  UpdateUserDetailsReq,
};

export default ApplozicClient;
