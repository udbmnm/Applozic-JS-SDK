import React, { useEffect, useState } from "react";
import {
  Avatar,
  useColorModeValue as mode,
  HStack,
  Text,
  TabList,
  Tab,
  forwardRef,
  chakra,
  Box,
  useStyles,
  useTab,
  VStack,
  TabProps,
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import { ActiveChat } from "../../providers/useActiveChats";
import { ChatType } from "../../models/chat";
import useGetUserInfo from "../../hooks/queries/useGetUserInfo";
import useGetGroupInfo from "../../hooks/queries/useGetGroupInfo";
import { getNameFromUser, getNameFromGroup } from "@applozic/core-sdk";

export interface ChatTabHeadStripItem {
  text: string;
  imageUrl?: string;
}

export interface ChatTabHeadStripProps {
  chats: ActiveChat[];
  openIndex: number;
  onItemClick?: (index: number) => void;
  onCloseClick?: (index: number) => void;
  onDetailsClick?: (index: number) => void;
}

interface IChatTab extends TabProps {
  chat: ActiveChat;
  index: number;
}

const ChatTabHeadStrip = forwardRef<ChatTabHeadStripProps, any>(
  ({ chats, openIndex, onItemClick, onCloseClick, onDetailsClick }, ref) => {
    const handleClick = (index: number) => {
      if (onItemClick) {
        onItemClick(index);
      }
    };

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

    const ChatTab = ({ chat, index, ...rest }: IChatTab) => {
      const tabProps = useTab(rest);
      const styles = useStyles();
      const { data: user } = useGetUserInfo(
        chat.contactId,
        chat.type === ChatType.USER
      );
      const { data: group } = useGetGroupInfo(
        chat.contactId,
        chat.type === ChatType.GROUP
      );
      let text = "";
      let imageUrl: string | undefined = undefined;
      if (user) {
        text = user ? getNameFromUser(user) : chat.contactId;
        imageUrl = user?.imageLink;
      } else {
        text = group ? getNameFromGroup(group) : "";
        imageUrl = group?.imageUrl;
      }
      return (
        <StyledTab
          __css={styles.tab}
          {...tabProps}
          ref={openIndex == index ? ref : undefined}
          // borderRadius={15}
          borderWidth={mode(1, 0)}
          borderColor="#E9E9E9"
          h={12}
          mr={index !== chats.length - 1 ? 1 : 0}
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
        {chats.map((chat, index) => {
          return (
            <ChatTab
              borderTopLeftRadius={15}
              borderTopRightRadius={15}
              borderColor="#E9E9E9"
              chat={chat}
              index={index}
              isSelected={openIndex === index}
            />
          );
        })}
      </TabList>
    );
  }
);

export default ChatTabHeadStrip;
