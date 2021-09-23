import { useMutation, useQueryClient } from "react-query";
import { User } from "@applozic/core-sdk";
import { useApplozicClient } from "../../providers/useApplozicClient";
import { getRecentChatFromNewContact } from "../../utils/parser";
import { RecentChat } from "../../models/chat";
import { mergeRecentChats } from "../../utils/recentChatsMerger";

interface INewContact {
  name: string;
  email?: string;
  number?: string;
  imageUrl?: string;
}

function useCreateNewContact() {
  const { loginResult } = useApplozicClient();
  const queryClient = useQueryClient();
  return useMutation(
    async (contact: string) => {
      return contact;
    },
    {
      onMutate: async (newContact) => {
        // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
        await queryClient.cancelQueries(["recent-chats", loginResult?.userId]);

        // Snapshot the previous value
        const previousChats = queryClient.getQueryData<RecentChat[]>([
          "recent-chats-local",
          loginResult?.userId,
        ]);
        const recentChat = getRecentChatFromNewContact(newContact);

        let currentRecentChats =
          queryClient.getQueryData<RecentChat[]>([
            "recent-chats-local",
            loginResult?.userId,
          ]) ?? [];

        currentRecentChats = mergeRecentChats(currentRecentChats, [recentChat]);
        // Optimistically update to the new value
        queryClient.setQueryData<RecentChat[]>(
          ["recent-chats-local", loginResult?.userId],
          currentRecentChats
        );
        queryClient.setQueryData<Partial<User>>(["user", newContact, true], {
          userName: newContact,
          userId: newContact,
        });

        // Return a context object with the snapshotted value
        return previousChats;
      },
      // If the mutation fails, use the context returned from onMutate to roll back
      onError: (err, newContact, context) => {
        console.error("Send Message Error", err);
        queryClient.setQueryData(
          ["recent-chats", loginResult?.userId],
          (context as any).previousMessages
        );
      },
      // Always refetch after error or success:
      onSettled: (data, response, newMessage) => {
        // queryClient.invalidateQueries(["recent-chats", loginResult?.userId]);
      },
    }
  );
}

export default useCreateNewContact;
