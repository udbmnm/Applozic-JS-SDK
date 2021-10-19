import Icon from './Icon';
import { MessageStatus } from '../../models/chat';
import React from 'react';

const MessageStatusIcon = ({
  status,
  color = '#fff'
}: {
  status: MessageStatus;
  color?: string;
}) => {
  // (Error as any).stackTraceLimit = undefined;
  // console.error(new Error('fffee'));
  switch (status) {
    case MessageStatus.PENDING:
      return (
        <Icon
          color={color}
          style={{ opacity: 0.7 }}
          icon={'fill-sent'}
          size={12}
        />
      );
    case MessageStatus.SENT:
      return (
        <Icon
          color={color}
          style={{ opacity: 1 }}
          icon={'fill-sent'}
          size={12}
        />
      );
    case MessageStatus.DELIVERED:
      return (
        <Icon
          color={color}
          style={{ opacity: 0.7 }}
          icon={'fill-received'}
          size={12}
        />
      );
    case MessageStatus.READ:
      return (
        <Icon
          color={color}
          style={{ opacity: 1 }}
          icon={'fill-received'}
          size={12}
        />
      );
  }
  return <></>;
};

export default MessageStatusIcon;
