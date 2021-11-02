import { useQuery } from 'react-query';
import useGetUserInfo from './queries/useGetUserInfo';

export interface IPresence {
  isTyping: boolean;
}

export const usePresence = (userId: string) => {
  const { data: userData } = useGetUserInfo(userId, true);
  const { data: presenceData } = useQuery<IPresence>(['user-presence', userId]);

  return {
    isOnline: userData?.connected ?? false,
    isTyping: presenceData?.isTyping ?? false,
    lastSeen: userData?.lastSeenAtTime
      ? new Date(userData?.lastSeenAtTime)
      : undefined
  };
};
