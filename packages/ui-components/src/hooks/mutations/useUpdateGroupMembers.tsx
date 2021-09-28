import { useMutation, useQueryClient } from 'react-query';
import { ChatType } from '../../models/chat';
import { useApplozicClient } from '../../providers/useApplozicClient';

export interface ModifyGroupMembers {
  userIds: string[];
  clientGroupId: string;
}

function useUpdateGroupMembers() {
  const { client, loginResult } = useApplozicClient();
  const queryClient = useQueryClient();
  return useMutation(
    async ({ userIds, clientGroupId }: ModifyGroupMembers) => {
      if (loginResult?.userId) {
        const response = await client?.groups.addUsersToGroups({
          userIds,
          clientGroupIds: [clientGroupId]
        });
        return response;
      }
    },
    {
      // Always refetch after error or success:
      onSettled: (data, response, newMessage) => {
        //TODO: Move to setQueryData to avoid refetch
        queryClient.invalidateQueries(['messages', newMessage?.clientGroupId]);
        queryClient.invalidateQueries([
          'group',
          newMessage?.clientGroupId,
          true
        ]);
      }
    }
  );
}

export default useUpdateGroupMembers;
