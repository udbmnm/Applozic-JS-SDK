import React from 'react';
import useGetSelfDetails from '../../hooks/queries/useGetSelfDetails';
import useSidebar from '../../hooks/useSidebar';
import FeatureTab from '../../models/Feature';
import FeatureTabs from './FeatureTabs';

function FeatureTabsWired({
  orientation = 'vertical'
}: {
  orientation?: 'horizontal' | 'vertical' | undefined;
}) {
  const { data: user } = useGetSelfDetails();
  const ActiveFeatures = [
    FeatureTab.USER,
    FeatureTab.RECENT_CHATS,
    FeatureTab.CONTACTS,
    FeatureTab.GROUPS
  ];
  const { setActiveTab } = useSidebar();
  return (
    <FeatureTabs
      orientation={orientation}
      featureTabs={ActiveFeatures}
      onChange={index => setActiveTab(ActiveFeatures[index])}
      userName={user?.displayName ?? user?.email ?? user?.userId ?? ''}
      userImageUrl={user?.imageLink}
    />
  );
}

export default FeatureTabsWired;
