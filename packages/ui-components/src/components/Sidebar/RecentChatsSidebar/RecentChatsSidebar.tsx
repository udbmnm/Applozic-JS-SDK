import React, { useEffect } from "react";
import { VStack } from "@chakra-ui/react";
import { useSidebar } from "../../../providers/useSidebar";
import { ChatType } from "../../../models/chat";
import { RecentChat } from "../../../models/chat";
import RecentChatItem from "./RecentChatItem";
import { useInView } from "react-intersection-observer";
import { useQueryClient } from "react-query";
import {
  User,
  Group,
  getNameFromGroup,
  getNameFromUser,
} from "@applozic/core-sdk";
import ActiveChat from "../../../models/chat/ActiveChat";

export interface IRecentChats {
  recentChats: RecentChat[] | undefined;
  onClickContact: (type: ChatType, contactId: string) => void | Promise<void>;
  onClickAddContact: () => void | Promise<void>;
  onClearConversation: (activeChat: ActiveChat) => void | Promise<void>;
}

const hasSubString = (a: string, b: string) =>
  a.toLowerCase().indexOf(b.toLowerCase()) >= 0;

const findSearchTermInGroup = (query: string, group: Group) => {
  return (
    hasSubString(getNameFromGroup(group), query) ||
    hasSubString(group.clientGroupId, query)
  );
};
const findSearchTermInUser = (query: string, user: User) => {
  return (
    hasSubString(getNameFromUser(user), query) ||
    hasSubString(user.userId, query)
  );
};

const RecentChatsSidebar = ({
  recentChats,
  onClickContact,
  onClickAddContact,
  onClearConversation,
}: IRecentChats) => {
  const queryClient = useQueryClient();
  const {
    searchValue,
    controls,
    isFetchingNextRecentChatsPage,
    fetchNextRecentChats,
  } = useSidebar();

  const handleClick = (type: ChatType, contactId: string) => () => {
    if (onClickContact) {
      onClickContact(type, contactId);
    }
  };

  if (searchValue) {
    // RecentChat[]
    recentChats = recentChats?.filter((recentChat) => {
      let name = undefined;
      if (recentChat.chatType == ChatType.USER) {
        const user = queryClient.getQueryData<User>([
          "user",
          recentChat.contactId,
          true,
        ]);
        return user && findSearchTermInUser(searchValue, user);
      } else {
        const group = queryClient.getQueryData<Group>([
          "group",
          recentChat.contactId,
          true,
        ]);
        return group && findSearchTermInGroup(searchValue, group);
      }
    });
  }
  const { ref: oldestChat, inView } = useInView({
    threshold: 0,
    initialInView: false,
  });
  useEffect(() => {
    if (!isFetchingNextRecentChatsPage && inView && fetchNextRecentChats) {
      fetchNextRecentChats();
    }
  }, [inView]);

  return (
    <VStack width={"full"} height={"full"}>
      {recentChats &&
        recentChats?.length > 0 &&
        recentChats.map((recentChat) => (
          <RecentChatItem
            ref={oldestChat}
            recentChat={recentChat}
            controls={controls}
            onClick={handleClick(recentChat.chatType, recentChat.contactId)}
            onClearChat={() => {
              onClearConversation(recentChat.chatType, recentChat.contactId);
            }}
          />
        ))}
    </VStack>
  );
};
/** : ( // <AddContact onClick={onClickAddContact} />
      // )*/
export default RecentChatsSidebar;
