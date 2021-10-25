import { TabList, Tabs, Divider, chakra } from '@chakra-ui/react';
import React, { useMemo } from 'react';
import FeatureTabEnum from '../../models/Feature';
import FeatureTab from './FeatureTab';

export interface FeatureTabsProps {
  /** the orientation in which the tabs will be placed */
  orientation: 'horizontal' | 'vertical';
  /** List of Features to enable this decides which of the sidebars will be accessible by the user */
  featureTabs: FeatureTabEnum[];
  /** Callback to handle the change of index in the tabs */
  onChange: (index: number) => void;
  /** the name of the logged in use to show in the tabs */
  userName: string;
  /** the image url of the logged in user to show in the tabs */
  userImageUrl?: string;
}

function FeatureTabs({
  orientation = 'vertical',
  featureTabs,
  onChange,
  userName,
  userImageUrl
}: FeatureTabsProps) {
  const StyledTab = chakra('button', { themeKey: 'Tabs.Tab' } as any);

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
        return <FeatureTab StyledTab={StyledTab} icon={'chat'} title="Chats" />;
      case FeatureTabEnum.CONTACTS:
        return (
          <FeatureTab StyledTab={StyledTab} icon={'user'} title="Contacts" />
        );
      case FeatureTabEnum.GROUPS:
        return (
          <FeatureTab StyledTab={StyledTab} icon={'group'} title="Groups" />
        );
    }
  };
  return (
    <Tabs
      orientation={orientation}
      onChange={index => onChange(index)}
      overflowY="auto"
      height="full"
      defaultIndex={1}
    >
      <TabList
        borderWidth={0}
        overflowY="auto"
        overflowX="auto"
        height={orientation === 'horizontal' ? '64px' : 'full'}
        width={orientation === 'horizontal' ? 'full' : '64px'}
        alignItems="center"
      >
        {featureTabs.map(tab =>
          useMemo(() => getCustomTab(tab, userName, userImageUrl), [])
        )}
      </TabList>
    </Tabs>
  );
}

export default FeatureTabs;
