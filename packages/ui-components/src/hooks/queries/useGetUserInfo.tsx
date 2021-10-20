import { useInfiniteQuery, useQuery, useQueryClient } from 'react-query';
import { User } from '@applozic/core-sdk';
import { useApplozicClient } from '../../providers/useApplozicClient';

function useGetUserInfo(userId: string, shouldFetch: boolean) {
  const { client } = useApplozicClient();
  return useQuery<User | undefined>(['user', userId, shouldFetch], async () => {
    if (shouldFetch) {
      const response = await client?.contacts.getUserDetails([userId]);
      return response && response?.length > 0 ? response[0] : undefined;
    }
    return undefined;
  });
}

export default useGetUserInfo;
