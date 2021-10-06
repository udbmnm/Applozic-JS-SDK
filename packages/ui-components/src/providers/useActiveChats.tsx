import React, { createContext, useContext, useState } from "react";
import { ChatType } from "../models/chat";

export interface ActiveChat {
  contactId: string;
  type: ChatType;
}

export interface ActiveChatInfo {
  chats: ActiveChat[];
  openIndex: number;
  detailIndex: number;
  setActiveContactInfo: (
    type: ChatType,
    contactId: string,
    showDetail?: boolean
  ) => void;
  removeContact: (contactId: string) => void;
}

const defaultChatInfo = {
  chats: [],
  openIndex: -1,
  detailIndex: -1,
  setActiveContactInfo: () => {},
  removeContact: () => {},
};

const ActiveChatsContext = createContext<ActiveChatInfo>(defaultChatInfo);

const useGetActiveChats = (): ActiveChatInfo => {
  const [activeChats, setActiveChats] = useState<ActiveChatInfo>(
    defaultChatInfo
  );
  const setActiveContactInfo = (
    type: ChatType,
    contactId: string,
    showDetail?: boolean
  ) => {
    const index = activeChats.chats.findIndex(
      (chat) => chat.contactId === contactId
    );
    if (index > -1) {
      console.log({
        detailIndexExisting:
          showDetail == undefined
            ? activeChats.detailIndex
            : showDetail
            ? index
            : activeChats.detailIndex,
      });
      setActiveChats({
        ...activeChats,
        openIndex: index,
        detailIndex: showDetail ? index : -1,
      });
    } else {
      console.log({
        detailIndexNew:
          showDetail == undefined
            ? activeChats.detailIndex
            : showDetail
            ? activeChats.chats.length
            : activeChats.detailIndex,
      });
      setActiveChats({
        ...activeChats,
        chats: [
          ...activeChats.chats,
          {
            contactId,
            type,
          },
        ],
        openIndex: activeChats.chats.length,
        detailIndex: showDetail
          ? activeChats.chats.length
          : activeChats.detailIndex,
      });
    }
  };

  const removeContact = (contactId: string) => {
    const currentLength = activeChats.chats.length;
    const newChats = activeChats.chats.filter(
      (chat) => chat.contactId !== contactId
    );
    setActiveChats({
      ...activeChats,
      chats: activeChats.chats.filter((chat) => chat.contactId !== contactId),
      openIndex:
        currentLength === 1
          ? -1
          : Math.min(newChats.length - 1, activeChats.openIndex),
    });
  };
  console.log({ activeChats });
  return {
    chats: activeChats.chats,
    openIndex: activeChats.openIndex,
    detailIndex: activeChats.detailIndex,
    setActiveContactInfo,
    removeContact,
  };
};

export function ProvideActiveChats({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ActiveChatsContext.Provider value={useGetActiveChats()}>
      {children}
    </ActiveChatsContext.Provider>
  );
}

export const useActiveChats = () => useContext(ActiveChatsContext);
