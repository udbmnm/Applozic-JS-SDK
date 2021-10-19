import {
  Box,
  InputGroup,
  InputLeftElement,
  Input,
  Flex,
  CheckboxGroup,
  VStack,
  HStack,
  Checkbox,
  Avatar,
  Text
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { User } from '@applozic/core-sdk';
import Icon from '../../Icon';

function MemberList({
  contacts,
  currentMembers,
  onSelectMembers
}: {
  contacts?: User[];
  currentMembers?: string[];
  onSelectMembers: (members: string[]) => void | Promise<void>;
}) {
  const [searchValue, setSearchValue] = useState('');
  return (
    <Flex
      flex={1}
      flexShrink={1}
      width="full"
      padding={3}
      flexDirection={'column'}
      overflowX={'clip'}
    >
      <Box padding={2} width="full">
        <InputGroup width="full">
          <InputLeftElement pointerEvents="none">
            <Icon icon="search" color="gray.300" />
          </InputLeftElement>
          <Input
            type="text"
            placeholder="Search"
            value={searchValue}
            onChange={e => setSearchValue(e.target.value.toString())}
          />
        </InputGroup>
      </Box>
      <CheckboxGroup
        colorScheme="purple"
        defaultValue={currentMembers}
        onChange={onSelectMembers}
      >
        <VStack alignItems="align-start" width="full">
          {contacts
            ?.filter(
              user =>
                (user?.userName ?? user?.email ?? user?.userId)
                  .toLowerCase()
                  .indexOf(searchValue.toLowerCase()) >= 0
            )
            .map((user, key) => (
              <HStack key={key} alignItems="center">
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
  );
}

export default MemberList;
