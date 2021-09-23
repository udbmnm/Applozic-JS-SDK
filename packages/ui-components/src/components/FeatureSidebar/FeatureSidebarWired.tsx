import React from "react";
import useGetSelfDetails from "../../hooks/queries/useGetSelfDetails";
import { useSidebar } from "../../providers/useSidebar";
import { ActiveFeatures } from "../../views/FullView/FullView";
import FeatureSidebar from "./FeatureSidebar";

function FeatureSidebarWired() {
  const user = useGetSelfDetails();
  const { setActiveFeature, setShowUserDetails } = useSidebar();
  return (
    <FeatureSidebar
      onChange={(index) =>
        index == 0
          ? setShowUserDetails && setShowUserDetails(true)
          : setActiveFeature && setActiveFeature(ActiveFeatures[index - 1])
      }
      userName={user?.displayName ?? user?.email ?? user?.userId ?? ""}
      userImageUrl={user?.imageLink}
    />
  );
}

export default FeatureSidebarWired;
