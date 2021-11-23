import { getNameFromUser, getNameFromGroup } from '@applozic/core-sdk';
import { ArrowBackIcon, CloseIcon } from '@chakra-ui/icons';
import {
  HStack,
  Avatar,
  TabProps,
  Text,
  useColorModeValue as mode,
  useStyleConfig,
  Flex
} from '@chakra-ui/react';
import React from 'react';
import { ActiveChat } from '../..';

interface IChatTab extends TabProps {
  activeTab?: React.MutableRefObject<HTMLDivElement | null>;
  activeChat: ActiveChat;
  index: number;
  onItemClick?: (index: number) => void;
  onCloseClick?: (index: number) => void;
  onDetailsClick?: (index: number) => void;
  showBack: boolean;
  isSelected: boolean;
  isLast: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  tabProps?: any;
}
const ChatTab = ({
  activeTab,
  activeChat,
  index,
  showBack,
  onItemClick,
  onCloseClick,
  onDetailsClick,
  isSelected,
  isLast,
  tabProps
}: IChatTab) => {
  const activeBg = mode('card.light', 'pane.dark');
  const inactiveBg = mode('pane.light', 'pane.dark');

  const styles = useStyleConfig('Tab');
  let text = '';
  let imageUrl: string | undefined = undefined;
  if (activeChat?.user) {
    text = activeChat?.user
      ? getNameFromUser(activeChat?.user)
      : activeChat?.user.userId;
    imageUrl = activeChat?.user?.imageLink;
  } else {
    text = activeChat?.group ? getNameFromGroup(activeChat?.group) : '';
    imageUrl = activeChat?.group?.imageUrl;
  }
  return (
    <Flex
      sx={styles}
      {...tabProps}
      h={12}
      minW={48}
      px={2}
      cursor='pointer'
      borderTopLeftRadius={15}
      borderTopRightRadius={15}
      borderColor="pane.light"
      borderWidth={mode(1, 0)}
      borderBottom={0}
      ref={isSelected ? activeTab : undefined}
      mr={isLast ? 1 : 0}
      bg={isSelected ? activeBg : inactiveBg}
      opacity={isSelected ? 1 : 0.6}
      onClick={() => onItemClick && onItemClick(index)}
    >
      <HStack
        display="flex"
        h={'full'}
        width="full"
        justifyContent="space-between"
      >
        <HStack flex={'1 1 0'} display="flex">
          {showBack && (
            <ArrowBackIcon
              h={'max'}
              color={'textMain.700'}
              zIndex={2}
              onClick={e => {
                onCloseClick && onCloseClick(index);
                if (e.stopPropagation) e.stopPropagation();
              }}
              opacity={isSelected ? 1 : 0.6}
            />
          )}
          <Avatar
            src={imageUrl}
            name={text}
            size={'xs'}
            mr={1}
            zIndex={2}
            onClick={e => {
              onDetailsClick && onDetailsClick(index);
              if (e.stopPropagation) e.stopPropagation();
            }}
          />
          <Text
            textOverflow="ellipsis"
            color={'textMain.700'}
            fontSize={'16px'}
            fontWeight="400"
            noOfLines={1}
            opacity={isSelected ? 1 : 0.6}
          >
            {text}
          </Text>
        </HStack>
        {!showBack && (
          <CloseIcon
            h={2.5}
            color={'textMain.700'}
            zIndex={2}
            onClick={e => {
              onCloseClick && onCloseClick(index);
              if (e.stopPropagation) e.stopPropagation();
            }}
            opacity={isSelected ? 1 : 0.6}
          />
        )}
      </HStack>
    </Flex>
  );
};

export default ChatTab;
