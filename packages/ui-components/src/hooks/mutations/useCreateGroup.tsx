import { useMutation, useQueryClient } from 'react-query';
import { useApplozicClient } from '../../providers/useApplozicClient';
import { INewGroup, getRecentChatFromGroup } from '../../utils/parser';
import { RecentChat } from '../../models/chat';
import { mergeRecentChats } from '../../utils/recentChatsMerger';

function useCreateGroup() {
  const { client, loginResult } = useApplozicClient();
  const queryClient = useQueryClient();
  // const { updateRecentChatsFromMessage } = useRecentChats();
  return useMutation(
    async ({ groupName, imageUrl, type, memberIds }: INewGroup) => {
      if (loginResult?.userId) {
        const response = await client?.groups.createGroup({
          groupName,
          groupMemberList: memberIds
            ? [loginResult.userId, ...memberIds]
            : [loginResult.userId],
          imageUrl,
          type
        });
        return response;
      }
    },
    {
      // Always refetch after error or success:
      onSettled: data => {
        let currentRecentChats =
          queryClient.getQueryData<RecentChat[]>([
            'recent-chats-local',
            client?.loginResult?.userId
          ]) ?? [];
        if (data) {
          const recentChat = data && getRecentChatFromGroup(data);
          currentRecentChats = mergeRecentChats(currentRecentChats, [
            recentChat
          ]);
          queryClient.setQueryData<RecentChat[]>(
            ['recent-chats-local', loginResult?.userId],
            currentRecentChats
          );
        }
        queryClient.setQueryData(['group', data?.clientGroupId, true], data);
      }
    }
  );
}

export default useCreateGroup;
