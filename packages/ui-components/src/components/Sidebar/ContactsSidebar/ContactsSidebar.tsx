import React from 'react';
import { List, ListItem } from '@chakra-ui/react';
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
    <List height="full" width={'full'}>
      {/* <ListItem key={'add_contact'}> */}
      {/* <AddContact onClick={onClickAddContact} /> */}
      {/* </ListItem> */}
      {users?.map((user, key) => (
        <ListItem key={key}>
          <ContactItem
            user={user}
            controls={controls}
            onClick={handleClick(user.userId)}
          />
        </ListItem>
      ))}
    </List>
  );
};

export default ContactsSidebar;
