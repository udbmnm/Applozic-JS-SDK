import React from "react";
import { VStack } from "@chakra-ui/react";
import { User } from "@applozic/core-sdk";
import { useSidebar } from "../../../providers/useSidebar";
import ContactItem from "./ContactItem";

export interface IRecentChats {
  users?: User[];
  onClickContact: (contactId: string) => void | Promise<void>;
  onClickAddContact: () => void | Promise<void>;
}

const ContactsSidebar = ({
  users,
  onClickContact,
  onClickAddContact,
}: IRecentChats) => {
  const { searchValue, controls } = useSidebar();

  const handleClick = (contactId: string) => () => {
    if (onClickContact) {
      onClickContact(contactId);
    }
  };

  if (searchValue) {
    // TODO see if we can filter messages as well
    users = users?.filter(
      (user) =>
        (user?.userName ?? user?.email ?? user?.userId)
          .toLowerCase()
          .indexOf(searchValue.toLowerCase()) >= 0
    );
  }

  return (
    <VStack width={"full"} height="full">
      {/* <AddContact onClick={onClickAddContact} /> */}
      {users?.map((user) => (
        <ContactItem
          user={user}
          controls={controls}
          onClick={handleClick(user.userId)}
        />
      ))}
    </VStack>
  );
};

export default ContactsSidebar;
