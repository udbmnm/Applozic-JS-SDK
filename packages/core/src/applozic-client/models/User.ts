export default interface User {
  active: boolean;
  blockedByOther?: boolean;
  blockedByThis?: boolean;
  /** Indicates online status of the user. */
  connected: boolean;
  connectedClientCount: number;
  createdAtTime: number;
  deactivated: boolean;
  email: string;
  lastLoggedInAtTime: number;
  /** User last seen at time. */
  lastSeenAtTime: number;
  /** sent only in message list API {userDetails} */
  lastMessageAtTime?: number;
  metadata: Object;
  roleKey: string;
  roleType: number;
  status: number;
  unreadCount: number;
  userId: string;
  userName?: string;
  displayName?: string;
  phoneNumber?: string;
  connectedLastSeenTime: number;
  imageLink?: string;
}

export const getNameFromUser = (user: User) =>
  user.displayName ?? user.email ?? user.userName ?? user.userId ?? "";
