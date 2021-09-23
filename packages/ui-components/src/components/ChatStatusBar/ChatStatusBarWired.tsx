import React from "react";
import { usePresence } from "../../hooks/usePresence";
import ChatStatusBar from "./ChatStatusBar";

const ChatStatusBarWithPresence = ({ userId }: { userId: string }) => {
  const presenceData = usePresence(userId);

  return (
    <ChatStatusBar
      isOnline={presenceData?.isOnline ?? false}
      lastSeen={presenceData?.lastSeen}
      isTyping={presenceData?.isTyping}
    />
  );
};

export default ChatStatusBarWithPresence;
