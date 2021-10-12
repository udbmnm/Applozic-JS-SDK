import { useQuery, useQueryClient } from "react-query";
import FeatureTab from "../models/Feature";

function useSidebar() {
  const queryClient = useQueryClient();
  const { data: activeTab } = useQuery<FeatureTab>(["active_tab"]);
  const { data: searchQuery } = useQuery<string>(["search_query"]);
  const { data: sidebarCollapsed } = useQuery<boolean>(["sidebar_collapsed"]);

  const setSidebarCollapsed = (state: boolean) => {
    queryClient.setQueryData<boolean>(["sidebar_collapsed"], state);
  };

  const setSearchQuery = (query: string) => {
    queryClient.setQueryData<string>(["search_query"], query);
  };

  const setActiveTab = (tab: FeatureTab) => {
    queryClient.setQueryData<FeatureTab>(["active_tab"], tab);
  };

  return {
    activeTab: activeTab ?? FeatureTab.RECENT_CHATS,
    searchQuery,
    sidebarCollapsed: sidebarCollapsed ?? false,
    setSidebarCollapsed,
    setSearchQuery,
    setActiveTab,
  };
}

export default useSidebar;
