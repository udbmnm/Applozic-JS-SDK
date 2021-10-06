import { useQuery, useQueryClient } from "react-query";
import ActiveChat, { isSameActiveChat } from "../models/chat/ActiveChat";

function useActiveChats() {
  const queryClient = useQueryClient();
  const { data: activeChats } = useQuery<ActiveChat[]>(["active_chats"]);
  const { data: openIndex } = useQuery<number>(["open_index"]);
  const { data: detailOpenIndex } = useQuery<number>(["detail_open_index"]);

  const setActiveChat = (activeChat: ActiveChat) => {
    const index = (activeChats ?? []).findIndex((chat) =>
      isSameActiveChat(chat, activeChat)
    );
    if (index > -1) {
      queryClient.setQueryData<number>(["open_index"], index);
    } else {
      queryClient.setQueryData<ActiveChat[]>(
        ["active_chats"],
        [...(activeChats ?? []), activeChat]
      );
      queryClient.setQueryData<number>(
        ["open_index"],
        (activeChats ?? []).length
      );
    }
  };

  const showChatDetail = (index: number) => {
    queryClient.setQueryData<number>(["detail_open_index"], index);
  };

  const hideChatDetail = () => {
    queryClient.setQueryData<number>(["detail_open_index"], -1);
  };

  const removeActiveChat = (activeChat: ActiveChat) => {
    const currentLength = (activeChats ?? []).length;
    const removeIndex = (activeChats ?? []).findIndex((chat) =>
      isSameActiveChat(chat, activeChat)
    );

    // no active chats
    //  do nothing
    // active chats exists
    //  chat not found
    //      do nothing
    //  chat found
    //      filter active chats
    //      found index =< open index
    //          decrease open by 1

    if (currentLength > 0 && openIndex) {
      if (removeIndex > -1) {
        queryClient.setQueryData<ActiveChat[]>(
          ["active_chats"],
          [
            ...(activeChats ?? []).filter(
              (chat) => !isSameActiveChat(chat, activeChat)
            ),
            activeChat,
          ]
        );
        if (removeIndex <= openIndex) {
          queryClient.setQueryData<number>(["open_index"], openIndex - 1);
        }
      }
    }
  };

  return {
    activeChats: activeChats ?? [],
    openIndex: openIndex ?? -1,
    detailOpenIndex: detailOpenIndex ?? -1,
    setActiveChat,
    removeActiveChat: removeActiveChat,
    showChatDetail,
    hideChatDetail,
  };
}

export default useActiveChats;
