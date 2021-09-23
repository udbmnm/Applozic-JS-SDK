import React from "react";
import { Flex, VStack } from "@chakra-ui/react";
import { useSidebar } from "../../../providers/useSidebar";
import { ChatType } from "../../../models/chat";
import { RecentChat } from "../../../models/chat";
import RecentChatItem from "../RecentChatsSidebar/RecentChatItem";
import AddGroup from "./AddGroup";
import { useQueryClient } from "react-query";
import { getNameFromGroup, Group } from "@applozic/core-sdk";
import ScrollArea from "../../ScrollArea";

export interface IGroups {
  recentChats: RecentChat[];
  onClickRecentChat: (
    type: ChatType,
    contactId: string
  ) => void | Promise<void>;
  onClickAddGroup: () => void;
}

const GroupsSidebar = ({
  recentChats,
  onClickRecentChat,
  onClickAddGroup,
}: IGroups) => {
  const queryClient = useQueryClient();
  const { searchValue, controls } = useSidebar();

  const handleClick = (type: ChatType, contactId: string) => () => {
    if (onClickRecentChat) {
      onClickRecentChat(type, contactId);
    }
  };

  if (searchValue) {
    // TODO see if we can filter messages as well
    recentChats = recentChats.filter((recentChat) => {
      const group = queryClient.getQueryData<Group>([
        "group",
        recentChat.contactId,
      ]);
      if (!group) {
        return false;
      }
      return (
        getNameFromGroup(group)
          .toLowerCase()
          .indexOf(searchValue.toLowerCase()) >= 0
      );
    });
  }

  return (
    <VStack height="full" width={"full"}>
      <AddGroup onClick={onClickAddGroup} />
      {recentChats.map((recentChat) => (
        <RecentChatItem
          onClearChat={() => console.log("{ object }")}
          recentChat={recentChat}
          controls={controls}
          onClick={handleClick(recentChat.chatType, recentChat.contactId)}
        />
      ))}
    </VStack>
  );
};

export default GroupsSidebar;
