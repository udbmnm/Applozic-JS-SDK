import { AnimationControls, useAnimation } from "framer-motion";
import React, { createContext, useContext, useEffect, useState } from "react";
import { FetchNextPageOptions, InfiniteQueryObserverResult } from "react-query";
import { User, Group } from "@applozic/core-sdk";
import useGetUserContacts from "../hooks/queries/useGetContacts";
import useGetRecentChats from "../hooks/queries/useGetRecentChats";
import { RecentChat } from "../models/chat";
import Tabs from "../models/Feature";

export interface ISidebar {
  searchValue: string;
  setSearchValue?: React.Dispatch<React.SetStateAction<string>>;
  isCollapsed: boolean;
  setCollapsed?: React.Dispatch<React.SetStateAction<boolean>>;
  controls?: AnimationControls;
  activeFeature: Tabs;
  setActiveFeature?: React.Dispatch<React.SetStateAction<Tabs>>;
  showUserDetails: boolean;
  setShowUserDetails?: React.Dispatch<React.SetStateAction<boolean>>;
  isFetchingNextContactsPage: boolean;
  fetchNextContacts?: (
    options?: FetchNextPageOptions | undefined
  ) => Promise<
    InfiniteQueryObserverResult<
      {
        users: User[] | undefined;
        groups: Group[] | undefined;
        hasNext: boolean;
        nextCursor: number | undefined;
      },
      unknown
    >
  >;
  isFetchingNextRecentChatsPage: boolean;
  fetchNextRecentChats?: (
    options?: FetchNextPageOptions | undefined
  ) => Promise<
    InfiniteQueryObserverResult<
      {
        recentChats: RecentChat[];
        hasNext: boolean;
        nextCursor: number;
      },
      unknown
    >
  >;
}

const SidebarContext = createContext<ISidebar>({
  searchValue: "",
  isCollapsed: false,
  activeFeature: Tabs.RECENT_CHATS,
  isFetchingNextContactsPage: false,
  isFetchingNextRecentChatsPage: false,
  showUserDetails: false,
});

const getSidebar = (defaultCollapsed: boolean) => {
  const [searchValue, setSearchValue] = useState("");
  const [activeFeature, setActiveFeature] = useState<Tabs>(Tabs.RECENT_CHATS);

  const [showUserDetails, setShowUserDetails] = useState(false);

  const {
    fetchNextPage: fetchNextContacts,
    isFetchingNextPage: isFetchingNextContactsPage,
  } = useGetUserContacts();
  const {
    fetchNextPage: fetchNextRecentChats,
    isFetchingNextPage: isFetchingNextRecentChatsPage,
  } = useGetRecentChats();
  const [isCollapsed, setCollapsed] = useState(!!defaultCollapsed);
  const controls = useAnimation();

  useEffect(() => {
    controls.start(isCollapsed ? "closed" : "open");
  }, [isCollapsed, controls]);

  useEffect(() => {
    setCollapsed(false);
  }, [activeFeature]);

  return {
    searchValue,
    setSearchValue,
    isCollapsed,
    setCollapsed,
    controls,
    activeFeature,
    setActiveFeature,
    isFetchingNextContactsPage,
    fetchNextContacts,
    isFetchingNextRecentChatsPage,
    fetchNextRecentChats,
    showUserDetails,
    setShowUserDetails,
  };
};

export function ProvideSidebar({
  defaultCollapsed,
  children,
}: {
  defaultCollapsed: boolean;
  children: React.ReactNode;
}) {
  return (
    <SidebarContext.Provider value={getSidebar(defaultCollapsed)}>
      {children}
    </SidebarContext.Provider>
  );
}

export const useSidebar = () => useContext(SidebarContext);
