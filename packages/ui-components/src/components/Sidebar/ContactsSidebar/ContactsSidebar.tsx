import React from 'react';
import { VStack } from '@chakra-ui/react';
import { User } from '@applozic/core-sdk';
import ContactItem from './ContactItem';
import { AnimationControls } from 'framer-motion';

export interface IRecentChats {
  users?: User[];
  onClickContact: (contactId: string) => void | Promise<void>;
  onClickAddContact: () => void | Promise<void>;
  controls?: AnimationControls;
}

const ContactsSidebar = ({
  users,
  onClickContact,
  onClickAddContact,
  controls
}: IRecentChats) => {
  const handleClick = (contactId: string) => () => {
    if (onClickContact) {
      onClickContact(contactId);
    }
  };

  return (
    <VStack width={'full'} height="full">
      {/* <AddContact onClick={onClickAddContact} /> */}
      {users?.map((user, key) => (
        <ContactItem
          key={key}
          user={user}
          controls={controls}
          onClick={handleClick(user.userId)}
        />
      ))}
    </VStack>
  );
};

export default ContactsSidebar;
