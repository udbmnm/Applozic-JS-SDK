import { useInfiniteQuery, useQuery, useQueryClient } from "react-query";
import { useApplozicClient } from "../../providers/useApplozicClient";
import { ChatType, RecentChat } from "../../models/chat";
import { Message as UIMessage } from "../../models/chat";
import { mergeMessages } from "../../utils/messagesMerger";
import { getUIMessageFromClientMessage } from "../../utils/parser";
import { mergeRecentChats } from "../../utils/recentChatsMerger";

import { User, Group } from "@applozic/core-sdk";
// import { updateLastMessage } from "./useGetRecentChats";

const PAGE_SIZE = 50;

function useGetMessages(type: ChatType, contactId: string) {
  const { client, loginResult } = useApplozicClient();

  const queryClient = useQueryClient();
  return useInfiniteQuery(
    ["messages", contactId],
    async ({ pageParam = Date.now() }) => {
      const response = await client?.messages.list({
        userId: type === ChatType.USER ? contactId : undefined,
        groupId: type === ChatType.GROUP ? contactId : undefined,
        endTime: pageParam,
        mainPageSize: 50,
        pageSize: PAGE_SIZE,
        // startIndex: 0,
      });
      const messageResponse = response?.message.reverse() ?? [];
      const messagesLocal =
        queryClient.getQueryData<UIMessage[]>(["messages-local", contactId]) ??
        [];

      const messages = mergeMessages(
        messageResponse.map(getUIMessageFromClientMessage),
        messagesLocal
      );

      queryClient.setQueryData<UIMessage[]>(
        ["messages-local", contactId],
        messages
      );
      const recentChatsLocal = queryClient.getQueryData<RecentChat[]>([
        "recent-chats-local",
        loginResult?.userId,
      ]);
      let imageUrl: string | undefined;
      if (type === ChatType.USER) {
        const user = queryClient.getQueryData<User>(["user", contactId, true]);
        imageUrl = user?.imageLink;
      } else {
        const groupInfo = queryClient.getQueryData<Group>([
          "group",
          contactId,
          true,
        ]);
        imageUrl = groupInfo?.imageUrl;
      }
      queryClient.setQueryData<RecentChat[]>(
        ["recent-chats-local", loginResult?.userId],
        mergeRecentChats(
          [
            {
              contactId,
              chatType: type,
              imageUrl,
              lastMessageKey: "randomase123ase",
              lastMessageTime: messages[0].timeStamp.getTime(),
            },
          ],
          recentChatsLocal ?? []
        )
      );
      return {
        messages: messages ?? [],
        // messagesLocal: mergedMessagesLocal,
        hasNext: !(
          response?.message?.length && response?.message?.length < PAGE_SIZE
        ),
        nextCursor: response?.message[0].createdAtTime,
      };
    },
    {
      getNextPageParam: (lastPage) =>
        lastPage.hasNext ? lastPage.nextCursor : undefined,
    }
  );
}

export default useGetMessages;
