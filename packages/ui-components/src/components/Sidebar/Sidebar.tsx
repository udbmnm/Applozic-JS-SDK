import React, { useState } from "react";
import { useActiveChats } from "../../providers/useActiveChats";
import { ChatType, RecentChat } from "../../models/chat";
import withSidebar from "./withSidebar";
import RecentChatsSidebar from "./RecentChatsSidebar";
import { Box } from "@chakra-ui/react";
import Feature from "../../models/Feature";
import GroupsSidebar from "./GroupsSidebar";
import CreateGroup from "./GroupsSidebar/CreateGroup";
import { GroupTypes } from "@applozic/core-sdk";
import { INewGroup } from "../../utils/parser";
import CreateContact from "./RecentChatsSidebar/CreateContact";
import ContactsSidebar from "./ContactsSidebar/ContactsSidebar";
import { User } from "@applozic/core-sdk";

export interface ISidebar {
  type: Feature;
  recentChats: RecentChat[] | undefined;
  users: User[] | undefined;
  onCreateGroup: (newGroup: INewGroup) => void | Promise<void>;
  onCreateContact: (contactName: string) => void | Promise<void>;
  onClearConversation: (
    type: ChatType,
    contactId: string
  ) => void | Promise<void>;
}

function Sidebar({
  type,
  recentChats,
  users,
  onCreateGroup: onClickCreateGroup,
  onCreateContact: onClickCreateContact,
  onClearConversation: onClickClearConversation,
}: ISidebar) {
  const { setActiveContactInfo } = useActiveChats();
  const [showAddGroup, setShowAddGroup] = useState(false);
  const [showAddContact, setShowAddContact] = useState(false);
  const handleClick = (type: ChatType, contactId: string) => {
    setActiveContactInfo(type, contactId);
  };

  const handleClickContact = (contactId: string) => {
    setActiveContactInfo(ChatType.USER, contactId);
  };

  switch (type) {
    case Feature.RECENT_CHATS:
      return withSidebar(RecentChatsSidebar)({
        recentChats,
        onClickContact: handleClick,
        showOverlay: showAddContact,
        OverlayComponent: (
          <CreateContact
            onClickCloseCreateContact={() => setShowAddContact(false)}
            onClickCreateContact={(contactName) => {
              setShowAddContact(false);
              onClickCreateContact(contactName);
            }}
          />
        ),
        onClickAddContact: () => setShowAddContact(true),
        onClearConversation: onClickClearConversation,
      });

    case Feature.GROUPS:
      return withSidebar(GroupsSidebar)({
        showOverlay: showAddGroup,
        OverlayComponent: (
          <CreateGroup
            contacts={users}
            onClickCloseCreateGroup={() => setShowAddGroup(false)}
            onClickCreateGroup={(groupName, imageUrl, memberIds) => {
              setShowAddGroup(false);
              onClickCreateGroup({
                groupName,
                imageUrl,
                type: GroupTypes.PRIVATE,
                memberIds,
              });
            }}
          />
        ),
        recentChats:
          recentChats?.filter((chat) => chat.chatType == ChatType.GROUP) ?? [],
        onClickRecentChat: handleClick,
        onClickAddGroup: () => setShowAddGroup(true),
      });
    case Feature.CONTACTS:
      return withSidebar(ContactsSidebar)({
        users,
        onClickContact: handleClickContact,
        showOverlay: showAddContact,
        OverlayComponent: (
          <CreateContact
            onClickCloseCreateContact={() => setShowAddContact(false)}
            onClickCreateContact={(contactName) => {
              setShowAddContact(false);
              onClickCreateContact(contactName);
            }}
          />
        ),
        onClickAddContact: () => setShowAddContact(true),
      });
    default:
      return <Box />;
  }
}

export default Sidebar;
