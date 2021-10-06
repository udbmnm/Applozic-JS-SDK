import User from "./User";

export enum GroupTypes {
  PRIVATE = 1 as number,
  PUBLIC = 2 as number,
  BROADCAST = 5 as number,
  OPEN = 6 as number,
  ONE_ON_ONE = 7 as number,
  CONTACTS = 9 as number,
  SUPPORT = 10 as number,
}

export enum UserRoles {
  // Full Access to group
  ADMIN = 1,
  // Add/remove users, Group Info update
  MODERATOR = 2,
  // Group Info update
  MEMBER = 3,
}

export default interface Group {
  id: number;
  clientGroupId: string;
  name?: string;
  adminId: string;
  memberUserKeys?: string[];
  membersId: string[];
  removedMembersId: string[];
  users?: Partial<User>[];
  unreadCount: number;
  type: GroupTypes;
  createdAtTime: number;
  groupUsers?: {
    userId: string;
    unreadCount: number;
    role: UserRoles;
  }[];
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
  group.name ?? group.clientGroupId ?? "";
