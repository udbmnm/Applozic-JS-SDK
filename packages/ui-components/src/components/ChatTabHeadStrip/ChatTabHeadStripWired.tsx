import React from 'react';
import ChatTabHeadStrip from './ChatTabHeadStrip';
import useActiveChats from '../../hooks/useActiveChats';

const ChatTabHeadStripWired = () => {
  const {
    activeChats,
    openIndex,
    setActiveChat,
    removeActiveChat: removeContact,
    showChatDetail
  } = useActiveChats();

  return (
    <ChatTabHeadStrip
      activeChats={activeChats}
      openIndex={openIndex}
      onItemClick={index => {
        activeChats && setActiveChat(activeChats[index]);
      }}
      onCloseClick={index => {
        activeChats && removeContact(activeChats[index]);
      }}
      onDetailsClick={index => {
        showChatDetail(index);
      }}
    />
  );
};

export default ChatTabHeadStripWired;
