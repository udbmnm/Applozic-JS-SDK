import {
  getNameFromGroup,
  getNameFromUser,
  Group,
  User,
} from "@applozic/core-sdk";
import { ChatType } from ".";

interface ActiveChat {
  user?: User;
  group?: Group;
}

export const isSameActiveChat = (a: ActiveChat, b: ActiveChat) =>
  (a.group && b.group && a.group.clientGroupId === b.group.clientGroupId) ||
  (a.user && b.user && a.user.userId === b.user.userId);

export const getIdFromActiveChat = (a: ActiveChat) =>
  a.group ? a.group.clientGroupId : a.user ? a.user.userId : undefined;

export const getChatTypeFromActiveChat = (a: ActiveChat) =>
  a.group ? ChatType.GROUP : ChatType.USER;

export const getContactNameAndImageFromActiveChat = (a: ActiveChat) => {
  const contactName = a.user
    ? getNameFromUser(a.user)
    : a.group
    ? getNameFromGroup(a.group)
    : "";

  const contactImageUrl = a.user?.imageLink || a.group?.imageUrl;
  return {
    contactName,
    contactImageUrl,
  };
};

export default ActiveChat;
