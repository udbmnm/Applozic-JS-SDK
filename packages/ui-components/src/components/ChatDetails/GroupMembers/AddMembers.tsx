import { CloseIcon } from '@chakra-ui/icons';
import {
  VStack,
  HStack,
  Text,
  Checkbox,
  CheckboxGroup,
  Flex,
  Avatar,
  Input,
  InputGroup,
  InputLeftElement,
  Box
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { User } from '@applozic/core-sdk';
import ScrollArea from '../../ScrollArea';
import Button from '../../Button';
import Icon from '../../Icon';
import MemberList from './MemberList';

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

  return (
    <ScrollArea height="full" width="full" bg="white">
      <VStack height="full" width="full">
        <HStack
          position="absolute"
          top={'0'}
          zIndex="1"
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
        <Box py={12} px={2} width="full">
          <MemberList
            contacts={userContacts}
            currentMembers={currentMembers}
            onSelectMembers={setSelectedUsers}
          />
        </Box>
        <Button
          width="full"
          position="absolute"
          bottom={'0'}
          flexGrow={0}
          borderRadius={0}
          flexShrink={0}
          h={12}
          bgColor="brand.primary"
          color="white"
          label={'Add Members'}
          onClick={() => updateMemberList(selectedUsers.map(a => a.toString()))}
        />
      </VStack>
    </ScrollArea>
  );
}

export default AddMembers;
