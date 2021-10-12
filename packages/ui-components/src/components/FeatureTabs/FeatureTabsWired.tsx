import React from "react";
import { ActiveFeatures } from "../../config";
import useGetSelfDetails from "../../hooks/queries/useGetSelfDetails";
import useSidebar from "../../hooks/useSidebar";
import FeatureSidebar from "./FeatureTabs";

function FeatureSidebarWired() {
  const user = useGetSelfDetails();
  const { setActiveTab } = useSidebar();
  console.log("something changed", { user });
  return (
    <FeatureSidebar
      featureTabs={ActiveFeatures}
      onChange={(index) => setActiveTab(ActiveFeatures[index])}
      userName={user?.displayName ?? user?.email ?? user?.userId ?? ""}
      userImageUrl={user?.imageLink}
    />
  );
}

export default FeatureSidebarWired;
