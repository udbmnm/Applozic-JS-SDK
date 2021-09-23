import { useMutation, useQueryClient } from "react-query";
import { BaseSendMessageReq, Group, User } from "@applozic/core-sdk";
import { useApplozicClient } from "../../providers/useApplozicClient";
import { INewMessage, getUIMessageFromNewMessage } from "../../utils/parser";
import { v4 } from "uuid";
import { ChatType, Message, RecentChat } from "../../models/chat";
import { mergeMessages } from "../../utils/messagesMerger";
import { mergeRecentChats } from "../../utils/recentChatsMerger";

function useSendUserMessage() {
  const { client } = useApplozicClient();
  const queryClient = useQueryClient();
  return useMutation(
    async ({
      to,
      clientGroupId,
      message,
      fileMeta,
      metadata,
      contentType,
    }: INewMessage) => {
      const baseMessage: BaseSendMessageReq = {
        message,
        fileMeta,
        metadata,
        contentType,
      };
      if (to) {
        const response = await client?.messages.send({
          to,
          message,
          fileMeta,
          metadata,
          contentType,
        });
        return response?.messageKey;
      } else if (clientGroupId) {
        const response = await client?.messages.send({
          clientGroupId,
          message,
          fileMeta,
          metadata,
          contentType,
        });
        return response?.messageKey;
      }
    },
    {
      onMutate: async (newMessage) => {
        // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
        const contactId = newMessage.clientGroupId ?? newMessage.to ?? v4();
        const type = newMessage.clientGroupId ? ChatType.GROUP : ChatType.USER;
        await queryClient.cancelQueries(["messages", type, contactId]);

        // Snapshot the previous value
        const previousMessages = queryClient.getQueryData([
          "messages-local",
          contactId,
        ]);

        const uiMessage = getUIMessageFromNewMessage(
          newMessage,
          newMessage.metadata.webUiKey
        );
        // Optimistically update to the new value
        queryClient.setQueryData<Message[]>(
          ["messages-local", contactId],
          (old) => {
            if (!old) {
              return [uiMessage];
            }
            return mergeMessages(old, [uiMessage]);
          }
        );

        let currentRecentChats =
          queryClient.getQueryData<RecentChat[]>([
            "recent-chats-local",
            client?.loginResult?.userId,
          ]) ?? [];

        let imageUrl = "";
        if (newMessage.clientGroupId) {
          const group = queryClient.getQueryData<Group>([
            "group",
            newMessage.clientGroupId,
            true,
          ]);
          if (group) {
            imageUrl = group.imageUrl ?? "";
          }
        } else {
          const user = queryClient.getQueryData<User>([
            "user",
            newMessage.to,
            true,
          ]);
          if (user) {
            imageUrl = user.imageLink ?? "";
          }
        }

        currentRecentChats = mergeRecentChats(currentRecentChats, [
          {
            contactId: newMessage.clientGroupId ?? newMessage.to ?? v4(),
            chatType: newMessage.clientGroupId ? ChatType.GROUP : ChatType.USER,
            imageUrl,
            lastMessageKey: newMessage.metadata.webUiKey,
            lastMessageTime: Date.now(),
          },
        ]);
        queryClient.setQueryData<RecentChat[]>(
          ["recent-chats-local", client?.loginResult?.userId],
          currentRecentChats
        );

        // Return a context object with the snapshotted value
        return { previousMessages };
      },
      // If the mutation fails, use the context returned from onMutate to roll back
      onError: (err, newMessage, context) => {
        console.error("Send Message Error", err);
        queryClient.setQueryData(
          ["messages", newMessage.to],
          (context as any).previousMessages
        );
      },
      // TODO: Check if this is needed at all
      // onSettled: (data, response, newMessage) => {
      //   queryClient.invalidateQueries([
      //     "messages",
      //     newMessage.clientGroupId ? ChatType.GROUP : ChatType.USER,
      //     newMessage.clientGroupId ? newMessage.clientGroupId : newMessage.to,
      //   ]);
      // },
    }
  );
}

export default useSendUserMessage;
