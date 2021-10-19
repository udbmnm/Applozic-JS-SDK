import { TabList, Tabs, Divider, chakra } from "@chakra-ui/react";
import React, { useMemo } from "react";
import FeatureTabEnum from "../../models/Feature";
import FeatureTab from "./FeatureTab";

export interface FeatureTabsProps {
  featureTabs: FeatureTabEnum[];
  onChange: (index: number) => void;
  userName: string;
  userImageUrl?: string;
}

function FeatureTabs({
  featureTabs,
  onChange,
  userName,
  userImageUrl,
}: FeatureTabsProps) {
  const StyledTab = chakra("button", { themeKey: "Tabs.Tab" } as any);

  const getCustomTab = (
    featureTab: FeatureTabEnum,
    userName: string,
    userImageUrl: string | undefined
  ) => {
    switch (featureTab) {
      case FeatureTabEnum.USER:
        return (
          <>
            <FeatureTab
              StyledTab={StyledTab}
              imageUrl={userImageUrl}
              title={userName}
            />
            <Divider />
          </>
        );
      case FeatureTabEnum.RECENT_CHATS:
        return <FeatureTab StyledTab={StyledTab} icon={"chat"} title="Chats" />;
      case FeatureTabEnum.CONTACTS:
        return (
          <FeatureTab StyledTab={StyledTab} icon={"user"} title="Contacts" />
        );
      case FeatureTabEnum.GROUPS:
        return (
          <FeatureTab StyledTab={StyledTab} icon={"group"} title="Groups" />
        );
    }
  };
  return (
    <Tabs
      orientation="vertical"
      onChange={(index) => onChange(index)}
      overflowY="auto"
      height="full"
      defaultIndex={1}
    >
      <TabList
        borderWidth={0}
        overflowY="auto"
        height="full"
        width="64px"
        alignItems="center"
      >
        {featureTabs.map((tab) =>
          useMemo(() => getCustomTab(tab, userName, userImageUrl), [])
        )}
      </TabList>
    </Tabs>
  );
}

export default FeatureTabs;
