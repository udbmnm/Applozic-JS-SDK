import { Group, User } from "@applozic/core-sdk";

interface ActiveChat {
  user?: User;
  group?: Group;
}

export const isSameActiveChat = (a: ActiveChat, b: ActiveChat) =>
  (a.group && b.group && a.group.clientGroupId === b.group.clientGroupId) ||
  (a.user && b.user && a.user.userId === b.user.userId);

export const getIdFromActiveChat = (a: ActiveChat) =>
  a.group ? a.group.clientGroupId : a.user ? a.user.userId : undefined;

export default ActiveChat;
