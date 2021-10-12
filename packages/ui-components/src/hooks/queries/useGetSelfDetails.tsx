import { LoginResult, User } from "@applozic/core-sdk";
import { useQuery } from "react-query";
import { useApplozicClient } from "../../providers/useApplozicClient";

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
    roleKey: "1",
    roleType: loginResult?.roleType,
    status: 1,
    unreadCount: loginResult?.totalUnreadCount,
    userId: loginResult?.userId,
    userName: loginResult?.displayName,
    displayName: loginResult?.displayName,
    connectedLastSeenTime: new Date().getTime(),
  } as User;
};

function useGetSelfDetails() {
  const { loginResult } = useApplozicClient();
  return useQuery<User | null>(["self"], {
    placeholderData: getUserFromLoginResult(loginResult),
  }).data;
}

export default useGetSelfDetails;
