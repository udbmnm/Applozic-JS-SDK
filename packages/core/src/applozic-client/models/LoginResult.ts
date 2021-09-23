export default interface LoginResult {
  authToken: string;
  token: string;
  // Extras
  email: string;
  userId: string;
  clientId: string;
  displayName: string;
  deviceKey: string;
  timeZoneOffset: string;
  websocketUrl: string;
  websocketPort: string;
  fileBaseUrl: string;
  betaPackage: boolean;
  websocketIdleTimeLimit: number;
  deactivated: boolean;
  connectedClientCount: number;
  totalUnreadCount: number;
  userEncryptionKey: string;
  roleType: number;
  notifyState: number;
  metadata: unknown;
  pricingPackage: number;
  notificationAfter: number;
  newUser: string;
}
