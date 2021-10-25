import { LoginResult, User } from '@applozic/core-sdk';
import { useQuery } from 'react-query';
import { useApplozicClient } from '../../providers/useApplozicClient';

const getUserFromLoginResult = (
  loginResult: LoginResult | null | undefined
) => {
  return {
    active: !loginResult?.deactivated,
    /** Indicates online status of the user. */
    connected: true,
    connectedClientCount: loginResult?.connectedClientCount,
    createdAtTime: new Date().getTime(),
    deactivated: loginResult?.deactivated,
    email: loginResult?.email,
    lastLoggedInAtTime: new Date().getTime(),
    lastSeenAtTime: new Date().getTime(),
    metadata: {},
    roleKey: '1',
    roleType: loginResult?.roleType,
    status: 1,
    unreadCount: loginResult?.totalUnreadCount,
    userId: loginResult?.userId,
    userName: loginResult?.displayName,
    displayName: loginResult?.displayName,
    connectedLastSeenTime: new Date().getTime()
  } as User;
};

function useGetSelfDetails() {
  const { client, loginResult } = useApplozicClient();
  console.log({ loginResult });
  return useQuery<User | null>(['self', loginResult?.userId], async () => {
    if (loginResult?.userId) {
      const response = await client?.contacts.getUserDetails([
        loginResult.userId
      ]);
      const user = response && response?.length > 0 ? response[0] : undefined;
      return user ? user : null;
    } else {
      return null;
    }
  });
}

export default useGetSelfDetails;
