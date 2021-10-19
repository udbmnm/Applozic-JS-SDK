import { useMutation, useQueryClient } from 'react-query';
import { useApplozicClient } from '../../providers/useApplozicClient';
import { Message, RecentChat } from '../../models/chat';

function useDeleteMesssage() {
  const { client } = useApplozicClient();
  const queryClient = useQueryClient();
  return useMutation(
    async ({
      messageKey,
      contactId,
      deleteForAll
    }: {
      messageKey: string;
      contactId: string;
      deleteForAll?: boolean;
    }) => {
      return { messageKey, contactId, deleteForAll };
    },
    {
      onMutate: async ({ messageKey, contactId, deleteForAll }) => {
        // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
        if (client) {
          await client.messages.delete(messageKey, deleteForAll);
          const currentMessages = queryClient.getQueryData<Message[]>([
            'messages-local',
            contactId
          ]);
          if (currentMessages) {
            const newMessages = currentMessages.filter(
              m => m.key !== messageKey
            );
            queryClient.setQueryData<Message[]>(
              ['messages-local', contactId],
              newMessages
            );
            // queryClient.invalidateQueries(['messages', chatItem.contactId]);
            if (newMessages.length > 0) {
              const currentLastMessage = newMessages[0];
              const currentRecentChats = queryClient.getQueryData<RecentChat[]>(
                ['recent-chats-local']
              );
              if (currentRecentChats) {
                const newRecentChats = currentRecentChats
                  .map(rc => {
                    if (rc.contactId === contactId) {
                      return {
                        ...rc,
                        lastMessageKey: currentLastMessage.key,
                        lastMessageTime: currentLastMessage.timeStamp.getTime()
                      };
                    }
                    return rc;
                  })
                  .sort((a, b) => b.lastMessageTime - a.lastMessageTime);
                queryClient.setQueryData<RecentChat[]>(
                  ['recent-chats-local'],
                  newRecentChats
                );
              }
            }
          }
        }
      }
    }
  );
}

export default useDeleteMesssage;
