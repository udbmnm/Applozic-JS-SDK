import { useInfiniteQuery, useQuery, useQueryClient } from "react-query";
import { useApplozicClient } from "../../providers/useApplozicClient";
import { ChatType, RecentChat } from "../../models/chat";
import { Message as UIMessage } from "../../models/chat";
import { mergeMessages } from "../../utils/messagesMerger";
import { getUIMessageFromClientMessage } from "../../utils/parser";
import { mergeRecentChats } from "../../utils/recentChatsMerger";

import { User, Group } from "@applozic/core-sdk";
import ActiveChat, {
  getChatTypeFromActiveChat,
  getIdFromActiveChat,
} from "../../models/chat/ActiveChat";
// import { updateLastMessage } from "./useGetRecentChats";

const PAGE_SIZE = 50;

function useGetMessages(activeChat: ActiveChat) {
  const { client, loginResult } = useApplozicClient();

  const queryClient = useQueryClient();
  const activeChatId = getIdFromActiveChat(activeChat);
  return useInfiniteQuery(
    ["messages", activeChatId],
    async ({ pageParam = Date.now() }) => {
      if (activeChatId) {
        const response = await client?.messages.list({
          userId: activeChat.user ? activeChat.user.userId : undefined,
          groupId: activeChat.group
            ? activeChat.group.clientGroupId
            : undefined,
          endTime: pageParam,
          mainPageSize: 50,
          pageSize: PAGE_SIZE,
          // startIndex: 0,
        });
        const messageResponse = response?.message.reverse() ?? [];
        const messagesLocal =
          queryClient.getQueryData<UIMessage[]>([
            "messages-local",
            activeChatId,
          ]) ?? [];

        const messages = mergeMessages(
          messageResponse.map(getUIMessageFromClientMessage),
          messagesLocal
        );

        queryClient.setQueryData<UIMessage[]>(
          ["messages-local", activeChatId],
          messages
        );
        const recentChatsLocal = queryClient.getQueryData<RecentChat[]>([
          "recent-chats-local",
        ]);
        let imageUrl: string | undefined;
        if (activeChat.user) {
          const user = queryClient.getQueryData<User>([
            "user",
            activeChatId,
            true,
          ]);
          imageUrl = user?.imageLink;
        }
        if (activeChat.group) {
          const groupInfo = queryClient.getQueryData<Group>([
            "group",
            activeChatId,
            true,
          ]);
          imageUrl = groupInfo?.imageUrl;
        }
        queryClient.setQueryData<RecentChat[]>(
          ["recent-chats-local"],
          mergeRecentChats(
            [
              {
                contactId: activeChatId,
                chatType: getChatTypeFromActiveChat(activeChat),
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
      } else {
        return {
          messages: [],
          hasNext: false,
          nextCursor: undefined,
        };
      }
    },
    {
      getNextPageParam: (lastPage) =>
        lastPage.hasNext ? lastPage.nextCursor : undefined,
    }
  );
}

export default useGetMessages;
