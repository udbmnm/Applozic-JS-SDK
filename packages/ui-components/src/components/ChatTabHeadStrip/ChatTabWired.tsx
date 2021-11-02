import React from 'react';
import useActiveChats from '../../hooks/useActiveChats';
import ChatTab from './ChatTab';

export interface ChatTabWiredProps {
  /** unique identifier */
  key: string;
  /** Show the back icon instead of the cross to handle plugin view */
  showBack?: boolean;
}

function ChatTabWired({ key, showBack }: ChatTabWiredProps) {
  const {
    activeChats,
    openIndex,
    setActiveChat,
    removeActiveChat: removeContact,
    showChatDetail
  } = useActiveChats();
  return (
    <ChatTab
      showBack={!!showBack}
      onItemClick={index => {
        activeChats && setActiveChat(activeChats[index]);
      }}
      onCloseClick={index => {
        activeChats && removeContact(activeChats[index]);
      }}
      onDetailsClick={index => {
        showChatDetail(index);
      }}
      key={key}
      activeChat={activeChats[openIndex]}
      index={openIndex}
      isSelected={true}
      isLast={false}
    />
  );
}

export default ChatTabWired;
