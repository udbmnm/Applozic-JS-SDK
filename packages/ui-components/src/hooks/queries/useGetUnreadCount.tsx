import { useQuery } from 'react-query';
import { User } from '@applozic/core-sdk';

export interface IUnreadCount {
  unreadCount: number;
}

export const useUnreadCount = (userId: string) => {
  const { data: unreadCount } = useQuery<IUnreadCount>([
    'unread-count',
    userId
  ]);

  return {
    unreadCount: unreadCount?.unreadCount ?? 0
  };
};
