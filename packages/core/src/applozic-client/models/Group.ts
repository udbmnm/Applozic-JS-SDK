import User from './User';

export enum GroupTypes {
  PRIVATE = 1,
  PUBLIC = 2,
  BROADCAST = 5,
  OPEN = 6,
  ONE_ON_ONE = 7,
  CONTACTS = 9,
  SUPPORT = 10
}

export enum UserRoles {
  // Full Access to group
  ADMIN = 1,
  // Add/remove users, Group Info update
  MODERATOR = 2,
  // Group Info update
  MEMBER = 3
}

export default interface Group {
  id: number;
  clientGroupId: string;
  name?: string;
  adminId: string;
  memberUserKeys: string[];
  membersId: string[];
  removedMembersId: number[];
  users: Partial<User>[];
  unreadCount: number;
  type: GroupTypes;
  createdAtTime: number;
  groupUsers: Partial<User>[];
  childKeys: string[];
  childClientGroupIds: number[];
  metadata: { [key: string]: string };
  imageUrl?: string;
  adminName?: string;
  membersName?: string[];
  userCount?: number;
  updatedAtTime?: number;
}

export const getNameFromGroup = (group: Group) =>
  group.name ?? group.clientGroupId ?? '';
