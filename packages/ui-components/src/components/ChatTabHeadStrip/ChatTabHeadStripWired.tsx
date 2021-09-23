import React, { useEffect, useRef, useState } from "react";
import { useActiveChats } from "../../providers/useActiveChats";
import { ChatType } from "../../models/chat";
import RecentChat from "../../models/chat/RecentChat";
import ChatTabHeadStrip, { ChatTabHeadStripItem } from "./ChatTabHeadStrip";
import { useQueryClient } from "react-query";

const ChatTabHeadStripWired = () => {
  const {
    chats,
    openIndex,
    setActiveContactInfo,
    removeContact,
  } = useActiveChats();
  const activeTab = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    activeTab?.current && activeTab?.current.scrollIntoView();
  }, [chats]);

  return (
    <ChatTabHeadStrip
      ref={activeTab}
      chats={chats}
      openIndex={openIndex}
      onItemClick={(index) => {
        setActiveContactInfo(chats[index].type, chats[index].contactId);
      }}
      onCloseClick={(index) => {
        removeContact(chats[index].contactId);
      }}
      onDetailsClick={(index) => {
        setActiveContactInfo(chats[index].type, chats[index].contactId, true);
      }}
    />
  );
};

export default ChatTabHeadStripWired;
