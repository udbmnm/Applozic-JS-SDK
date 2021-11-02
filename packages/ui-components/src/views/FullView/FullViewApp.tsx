import { HStack } from '@chakra-ui/react';
import React from 'react';
import ChatWindowWired from '../../components/ChatWindow/ChatWindowWired';
import SidebarWired from '../../components/Sidebar/SidebarWired';
import FeatureTabsWired from '../../components/FeatureTabs/FeatureTabsWired';

const FullViewApp = () => {
  return (
    <HStack w="full" h="full" display="flex" flexDirection="row">
      <FeatureTabsWired />
      <SidebarWired />
      <ChatWindowWired />
    </HStack>
  );
};

export default FullViewApp;
