import { CloseIcon } from '@chakra-ui/icons';
import {
  VStack,
  HStack,
  Text,
  Checkbox,
  CheckboxGroup,
  Flex,
  Avatar,
  Input
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { User } from '@applozic/core-sdk';
import ScrollArea from '../../ScrollArea';
import Button from '../../Button';

function AddMembers({
  onClickCloseAddMembers,
  userContacts,
  currentMembers,
  updateMemberList
}: {
  onClickCloseAddMembers: () => void;
  userContacts?: User[];
  currentMembers?: string[];
  updateMemberList: (userIds: string[]) => void | Promise<void>;
}) {
  const [selectedUsers, setSelectedUsers] = useState<(string | number)[]>([]);
  const [searchValue, setSearchValue] = React.useState('');

  return (
    <ScrollArea height="full" width="full" bg="white">
      <VStack height="full" width="full">
        <HStack
          justifyContent="space-between"
          width={'full'}
          boxShadow={'0px 4px 4px rgba(0, 0, 0, 0.08)'}
          pt={3}
          pb={3}
          pl={6}
          pr={6}
        >
          <Text color="textMain.500">Add Members</Text>
          <CloseIcon onClick={onClickCloseAddMembers} />
        </HStack>
        <Button
          width="full"
          minH="48px"
          label={'Add Members'}
          onClick={() => updateMemberList(selectedUsers.map(a => a.toString()))}
        />
        <Input
          width="full"
          minH="48px"
          value={searchValue}
          onChange={e => setSearchValue(e.target.value.toString())}
        />
        <Flex flexGrow={1} flexShrink={1} flexBasis={12} width="full">
          <CheckboxGroup
            colorScheme="green"
            defaultValue={currentMembers}
            onChange={setSelectedUsers}
            // width="full"
          >
            <VStack alignItems="align-start" width="full" padding={4}>
              {userContacts
                ?.filter(
                  user =>
                    (user?.userName ?? user?.email ?? user?.userId)
                      .toLowerCase()
                      .indexOf(searchValue.toLowerCase()) >= 0
                )
                .map(user => (
                  <HStack alignItems="center">
                    <Checkbox value={user.userId} />
                    <Avatar
                      src={user.imageLink}
                      name={user.userName ?? user.email ?? user.userId}
                    />
                    <VStack>
                      <Text>{user.userName ?? user.email ?? user.userId}</Text>
                    </VStack>
                  </HStack>
                ))}
            </VStack>
          </CheckboxGroup>
        </Flex>
      </VStack>
    </ScrollArea>
  );
}

export default AddMembers;
