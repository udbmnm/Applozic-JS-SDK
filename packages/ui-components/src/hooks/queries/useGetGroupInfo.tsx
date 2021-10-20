import { useInfiniteQuery, useQuery, useQueryClient } from 'react-query';
import { Group } from '@applozic/core-sdk';
import { useApplozicClient } from '../../providers/useApplozicClient';

function useGetGroupInfo(clientGroupId: string, shouldFetch: boolean) {
  const { client } = useApplozicClient();
  return useQuery<Group | undefined>(
    ['group', clientGroupId, shouldFetch],
    async () => {
      if (shouldFetch) {
        const groupInfo = await client?.groups.groupInfo(clientGroupId);
        return groupInfo;
      }
      return undefined;
    }
  );
}

export default useGetGroupInfo;
