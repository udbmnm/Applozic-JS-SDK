import { TabList, Tabs, Divider, chakra, Box } from '@chakra-ui/react';
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
  const StyledTab = useMemo(
    () => chakra('button', { themeKey: 'Tabs.Tab' } as any),
    []
  );

  const getCustomTab = (
    featureTab: FeatureTabEnum,
    userName: string,
    userImageUrl: string | undefined
  ) => {
    switch (featureTab) {
      case FeatureTabEnum.USER:
        return (
          <Box key={userName}>
            <FeatureTab
              StyledTab={StyledTab}
              imageUrl={userImageUrl}
              title={userName}
            />
            <Divider />
          </Box>
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
      height={orientation === 'horizontal' ? 'auto' : 'full'}
      defaultIndex={1}
    >
      <TabList
        borderWidth={0}
        overflowY={orientation === 'horizontal' ? 'hidden' : 'auto'}
        overflowX={orientation === 'horizontal' ? 'auto' : 'hidden'}
        height={orientation !== 'horizontal' ? 'full' : 'auto'}
        width={orientation === 'horizontal' ? 'full' : '64px'}
        alignItems="center"
      >
        {featureTabs.map(tab => getCustomTab(tab, userName, userImageUrl))}
      </TabList>
    </Tabs>
  );
}

export default FeatureTabs;
