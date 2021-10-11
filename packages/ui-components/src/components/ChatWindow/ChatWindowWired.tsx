import { Box } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useApplozicClient } from "../../providers/useApplozicClient";
import NoChatSelected from "./NoChatSelected";

import ChatDetailsWired from "../ChatDetails/ChatDetailsWired";
import ChatTabHeadStripWired from "../ChatTabHeadStrip/ChatTabHeadStripWired";
import { AnimatePresence } from "framer-motion";
import { useSidebar } from "../../providers/useSidebar";
import MotionBox from "../MotionBox";
import useActiveChats from "../../hooks/useActiveChats";
import ChatPanel from "../ChatPanel";
import ChatPanelWired from "../ChatPanel/ChatPanelWired";

function ChatWindowWired() {
  const { activeChats, openIndex, detailOpenIndex } = useActiveChats();
  const { isCollapsed, showUserDetails, setShowUserDetails } = useSidebar();
  const fullyOpen = isCollapsed && detailOpenIndex < 0 && !showUserDetails;
  const onlyDetailOpen =
    isCollapsed && (detailOpenIndex >= 0 || showUserDetails);
  const onlySidebarOpen =
    !isCollapsed && detailOpenIndex < 0 && !showUserDetails;

  useEffect(() => {
    if (detailOpenIndex > -1) {
      setShowUserDetails && setShowUserDetails(false);
    }
  }, [detailOpenIndex]);

  return (
    <MotionBox
      display="flex"
      flex={1}
      height="full"
      flexDirection="row"
      w={`calc(100% - ${
        fullyOpen
          ? "200px"
          : onlySidebarOpen
          ? "420px"
          : onlyDetailOpen
          ? "200px"
          : "460px"
      })`}
    >
      {activeChats.length === 0 || openIndex < 0 ? (
        <NoChatSelected />
      ) : (
        <Box>
          <ChatTabHeadStripWired />
          <ChatPanelWired />
        </Box>
      )}
      <AnimatePresence>
        {detailOpenIndex > -1 && (
          <ChatDetailsWired activeChat={activeChats[detailOpenIndex]} />
        )}
      </AnimatePresence>
    </MotionBox>
  );
}

export default ChatWindowWired;
