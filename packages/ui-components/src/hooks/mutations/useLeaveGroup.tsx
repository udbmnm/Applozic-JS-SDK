import { useMutation, useQueryClient } from "react-query";
import { RecentChat } from "../../models/chat";
import { useApplozicClient } from "../../providers/useApplozicClient";

function useLeaveGroup() {
  const { client, loginResult } = useApplozicClient();
  const queryClient = useQueryClient();
  return useMutation(
    async (clientGroupId: string) => {
      if (loginResult?.userId) {
        const response = await client?.groups.leaveGroup({
          clientGroupId,
          resetCount: true,
        });
        return response;
      }
    },
    {
      onMutate: (clientGroupId) => {
        queryClient.setQueryData<RecentChat[] | undefined>(
          ["recent-chats-local"],
          (oldChats) => {
            if (oldChats) {
              return oldChats?.filter(
                (oldChat) => oldChat.contactId !== clientGroupId
              );
            } else {
              return undefined;
            }
          }
        );
      },
      // Always refetch after error or success:
      onSettled: (data, response, newMessage) => {},
    }
  );
}

export default useLeaveGroup;
