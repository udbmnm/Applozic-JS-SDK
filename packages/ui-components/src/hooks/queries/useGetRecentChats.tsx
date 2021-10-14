import { useInfiniteQuery, useQuery, useQueryClient } from "react-query";
import { Message } from "@applozic/core-sdk";
import { useApplozicClient } from "../../providers/useApplozicClient";
import { ChatType, RecentChat, Message as UIMessage } from "../../models/chat";
import { mergeRecentChats } from "../../utils/recentChatsMerger";
import { mergeMessages } from "../../utils/messagesMerger";
import { getUIMessageFromClientMessage } from "../../utils/parser";
import { IUnreadCount } from "./useGetUnreadCount";

const PAGE_SIZE = 50;

function useGetRecentChats() {
  const { client } = useApplozicClient();
  const queryClient = useQueryClient();
  return useInfiniteQuery(
    ["recent-chats", client?.loginResult?.userId],
    async ({ pageParam = Date.now() }) => {
      const response = await client?.messages.list({
        endTime: pageParam,
        mainPageSize: 50,
        pageSize: PAGE_SIZE,
      });
      const userMessageMap = new Map<string, Message>();
      const groupMessageMap = new Map<string, Message>();

      response?.message.forEach((m) => {
        if (m.clientGroupId) {
          groupMessageMap.set(m.clientGroupId, m);
        } else {
          userMessageMap.set(m.contactIds, m);
        }
        const messagesLocal =
          queryClient.getQueryData<UIMessage[]>([
            "messages-local",
            m.clientGroupId ?? m.contactIds,
          ]) ?? [];

        const messages = mergeMessages(
          [getUIMessageFromClientMessage(m)],
          messagesLocal
        );

        queryClient.setQueryData<UIMessage[]>(
          ["messages-local", m.clientGroupId ?? m.contactIds],
          messages
        );
      });

      let recentChats: RecentChat[] = [];
      response?.groupFeeds?.forEach((group) => {
        queryClient.setQueryData<IUnreadCount>(
          ["unread-count", group.clientGroupId],
          {
            unreadCount: group.unreadCount,
          }
        );
        queryClient.setQueryData(["group", group.clientGroupId, true], group);
        recentChats.push({
          contactId: group.clientGroupId,
          chatType: ChatType.GROUP,
          lastMessageKey: groupMessageMap.get(group.clientGroupId)
            ?.key as string,
          imageUrl: group.imageUrl,
          lastMessageTime: groupMessageMap.get(group.clientGroupId)
            ?.createdAtTime as number,
        });
      });
      response?.userDetails?.forEach((user) => {
        queryClient.setQueryData<IUnreadCount>(["unread-count", user.userId], {
          unreadCount: user.unreadCount,
        });
        queryClient.setQueryData(["user", user.userId, true], user);
        recentChats.push({
          contactId: user.userId,
          chatType: ChatType.USER,
          imageUrl: user.imageLink,
          lastMessageKey: userMessageMap.get(user.userId)?.key as string,
          lastMessageTime: userMessageMap.get(user.userId)
            ?.createdAtTime as number,
        });
      });
      const messages = response?.message ?? [];
      recentChats = recentChats.sort(
        (a, b) => b?.lastMessageTime - a?.lastMessageTime
      );

      let currentRecentChats =
        queryClient.getQueryData<RecentChat[]>(["recent-chats-local"]) ?? [];

      currentRecentChats = mergeRecentChats(currentRecentChats, recentChats);
      queryClient.setQueryData<RecentChat[]>(
        ["recent-chats-local"],
        currentRecentChats
      );
      return {
        recentChats: currentRecentChats,
        hasNext: !(messages.length < PAGE_SIZE),
        nextCursor: messages[0].createdAtTime,
      };
    },
    {
      getNextPageParam: (lastPage) =>
        lastPage.hasNext ? lastPage.nextCursor : undefined,
    }
  );
}

export default useGetRecentChats;
