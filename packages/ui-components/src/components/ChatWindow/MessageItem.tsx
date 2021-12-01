import { RichTextMetaData } from '@applozic/core-sdk';
import { useWhyDidYouUpdate } from '@chakra-ui/react';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { ChatType, Message, ActiveChat } from '../../models/chat';
import { getIdFromActiveChat } from '../../models/chat/ActiveChat';
import { getFileBlobFromUrl } from '../../utils/file';
import ChatBubble from './ChatBubble';
import RichTextMessage from './RichTextMessage';

const downloadFileFromUrl = (url: string, filename: string) => {
  ({ url, filename });
  const tempLink = document.createElement('a');
  tempLink.href = url;
  tempLink.setAttribute('download', filename);
  tempLink.click();
};

function MessageItem({
  message,
  gMapsApiKey,
  sendQuickReply,
  onMessageDelete,
  activeChat,
  showTime
}: {
  message: Message;
  gMapsApiKey: string | undefined;
  sendQuickReply: (text: string) => void;
  onMessageDelete?: (
    contactId: string | undefined,
    message: Message,
    deleteForAll?: boolean
  ) => void;
  activeChat: ActiveChat;
  showTime: boolean;
}) {
  const deleteMessage = useCallback(
    (deleteForAll?: boolean) => {
      onMessageDelete &&
        onMessageDelete(getIdFromActiveChat(activeChat), message, deleteForAll);
    },
    [onMessageDelete, activeChat, message]
  );

  const isRichTextMessage = useMemo(
    () => message.metadata && message.metadata?.contentType === '300',
    [message]
  );

  const [fileUrl, setFileUrl] = useState<string>();

  useEffect(() => {
    if (message.file?.blobKey) {
      setFileUrl(
        'https://applozic.appspot.com/rest/ws/aws/file/' + message.file?.blobKey
      );
    } else {
      setFileUrl(undefined);
    }
  }, [message.file?.blobKey]);

  const onFileClick = useCallback(
    (): boolean | void =>
      !!message.file &&
      !!fileUrl &&
      downloadFileFromUrl(fileUrl, message.file.name),
    [message.file, fileUrl]
  );

  useWhyDidYouUpdate('MessageItem', {
    message,
    gMapsApiKey,
    sendQuickReply,
    onMessageDelete,
    activeChat,
    showTime
  });

  useEffect(() => {
    fileUrl && getFileBlobFromUrl(fileUrl);
  }, [fileUrl]);
  return isRichTextMessage ? (
    <RichTextMessage
      key={message.key}
      metadata={message.metadata as RichTextMetaData}
      onFileClick={onFileClick}
      sendQuickReply={sendQuickReply}
      isReply={message.isReply}
    />
  ) : (
    <ChatBubble
      gMapsApiKey={gMapsApiKey}
      chatType={activeChat.user ? ChatType.USER : ChatType.GROUP}
      showTime={showTime}
      message={message}
      showUserInfo={false}
      onMessageDelete={deleteMessage}
      fileUrl={fileUrl}
      onFileClick={onFileClick}
    />
  );
}

export default MessageItem;
