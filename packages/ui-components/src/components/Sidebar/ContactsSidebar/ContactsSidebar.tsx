import React, { useEffect } from 'react';
import { List, ListIcon, ListItem, Spinner, Text } from '@chakra-ui/react';
import { User } from '@applozic/core-sdk';
import ContactItem from './ContactItem';
import { AnimationControls } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { BaseSidebarProps } from '..';

export interface IRecentChats extends BaseSidebarProps {
  users?: User[];
  onClickContact: (contactId: string) => void | Promise<void>;
  onClickAddContact: () => void | Promise<void>;
  controls?: AnimationControls;
}

const ContactsSidebar = ({
  users,
  onClickContact,
  onClickAddContact,
  controls,
  fetchNextPage,
  isFetchingNextPage,
  isFiltered,
  hasMorePages
}: IRecentChats) => {
  const handleClick = (contactId: string) => () => {
    if (onClickContact) {
      onClickContact(contactId);
    }
  };
  const { ref: bottom, inView } = useInView({
    threshold: 0,
    initialInView: false
  });

  useEffect(() => {
    if (
      inView &&
      fetchNextPage &&
      !isFetchingNextPage &&
      hasMorePages &&
      !isFiltered
    ) {
      fetchNextPage();
    }
  }, [inView]);

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
      {isFetchingNextPage && (
        <ListItem>
          <ListIcon>
            <Spinner color="brand.primary" />
          </ListIcon>
          <Text>Fetching more contacts...</Text>
        </ListItem>
      )}
      <ListItem key={'contactsBottom'} ref={bottom} h={2} />
    </List>
  );
};

export default ContactsSidebar;
