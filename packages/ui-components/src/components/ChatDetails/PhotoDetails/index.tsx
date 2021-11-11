import React from 'react';
import { User } from '@applozic/core-sdk';
import { Avatar, HStack, Input, Tag, Text, VStack } from '@chakra-ui/react';
import { SmallAddIcon } from '@chakra-ui/icons';

function GroupMembers({
  adminId,
  members,
  numberOfMembers,
  addNewMember
}: {
  adminId?: string;
  numberOfMembers?: number;
  members?: User[];
  addNewMember: () => void | Promise<void>;
}) {
  return (
    <VStack width="full">
      <HStack width="full" justifyContent="space-between">
        <Text color="textHeader.500" fontWeight="400" fontSize="14px">
          {(numberOfMembers as number) + 1} Members
        </Text>
        <SmallAddIcon
          color="brand.primary"
          fontWeight="400"
          fontSize="14px"
          onClick={addNewMember}
        >
          Add Member
        </SmallAddIcon>
      </HStack>
      <VStack width="full">
        {members &&
          members?.map((member, key) => (
            <HStack key={key} justifyContent="space-between" width="full">
              <Avatar
                src={member.imageLink}
                name={member.userName ?? member.email}
              />
              <Text>{member.userName ?? member.email}</Text>
              {adminId === member.userId && <Tag>Admin</Tag>}
            </HStack>
          ))}
      </VStack>
    </VStack>
  );
}

export default GroupMembers;
