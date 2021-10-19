import React, { useEffect, useRef } from "react";
import {
  Avatar,
  useColorModeValue as mode,
  HStack,
  Text,
  TabList,
  chakra,
  useStyles,
  useTab,
  TabProps,
  Tabs,
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import { getNameFromUser, getNameFromGroup } from "@applozic/core-sdk";
import ActiveChat from "../../models/chat/ActiveChat";

export interface ChatTabHeadStripItem {
  text: string;
  imageUrl?: string;
}

export interface ChatTabHeadStripProps {
  activeChats: ActiveChat[] | undefined;
  openIndex: number | undefined;
  onItemClick?: (index: number) => void;
  onCloseClick?: (index: number) => void;
  onDetailsClick?: (index: number) => void;
  detailOpenIndex: number;
}

interface IChatTab extends TabProps {
  activeChat: ActiveChat;
  index: number;
}

const ChatTabHeadStrip = ({
  activeChats,
  openIndex,
  onItemClick,
  onCloseClick,
  onDetailsClick,
  detailOpenIndex,
}: ChatTabHeadStripProps) => {
  const handleClick = (index: number) => {
    if (onItemClick) {
      onItemClick(index);
    }
  };

  const activeTab = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    activeTab?.current && activeTab?.current.scrollIntoView();
  }, [openIndex]);

  const handleClose = (index: number) => {
    if (onCloseClick) {
      onCloseClick(index);
    }
  };

  const handleDetails = (index: number) => {
    if (onDetailsClick) {
      onDetailsClick(index);
    }
  };
  const activeBg = mode("#FFFFFF", "#1B191D");
  const inactiveBg = mode("#efefef", "#1B191D");
  const StyledTab = chakra("button", { themeKey: "Tabs.Tab" } as any);

  const ChatTab = ({ activeChat, index, ...rest }: IChatTab) => {
    const tabProps = useTab(rest);
    const styles = useStyles();
    let text = "";
    let imageUrl: string | undefined = undefined;
    if (activeChat?.user) {
      text = activeChat?.user
        ? getNameFromUser(activeChat?.user)
        : activeChat?.user.userId;
      imageUrl = activeChat?.user?.imageLink;
    } else {
      text = activeChat?.group ? getNameFromGroup(activeChat?.group) : "";
      imageUrl = activeChat?.group?.imageUrl;
    }
    return (
      <StyledTab
        __css={styles.tab}
        {...tabProps}
        ref={openIndex == index ? activeTab : undefined}
        borderWidth={mode(1, 0)}
        borderColor="#E9E9E9"
        h={12}
        mr={activeChats && index !== activeChats.length - 1 ? 1 : 0}
        bg={openIndex == index ? activeBg : inactiveBg}
        opacity={openIndex == index ? 1 : 0.6}
        onClick={(e) => handleClick(index)}
      >
        <HStack
          display="flex"
          h={"full"}
          width="full"
          justifyContent="space-between"
        >
          <HStack flex={"1 1 0"} display="flex">
            <Avatar
              src={imageUrl}
              name={text}
              size={"xs"}
              mr={1}
              zIndex={2}
              onClick={(e) => {
                handleDetails(index);
                if (e.stopPropagation) e.stopPropagation();
              }}
            />
            <Text
              textOverflow="ellipsis"
              color={"textMain.700"}
              fontSize={"16px"}
              fontWeight="400"
              opacity={openIndex === index ? 1 : 0.6}
            >
              {text}
            </Text>
          </HStack>
          <CloseIcon
            height={11}
            color={"textMain.700"}
            zIndex={2}
            onClick={(e) => {
              handleClose(index);
              if (e.stopPropagation) e.stopPropagation();
            }}
            opacity={openIndex === index ? 1 : 0.6}
          />
        </HStack>
      </StyledTab>
    );
  };

  return (
    <TabList
      w={"full"}
      overflowX="auto"
      border="none"
      sx={{
        "&::-webkit-scrollbar": {
          display: "none",
        },
      }}
    >
      {activeChats?.map((chat, index) => {
        return (
          <ChatTab
            borderTopLeftRadius={15}
            borderTopRightRadius={15}
            borderColor="#E9E9E9"
            activeChat={chat}
            index={index}
            isSelected={openIndex === index}
          />
        );
      })}
    </TabList>
  );
};

export default ChatTabHeadStrip;
