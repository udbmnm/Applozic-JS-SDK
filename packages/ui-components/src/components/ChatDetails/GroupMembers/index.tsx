import React from 'react';
import { getNameFromUser, Group, GroupTypes, User } from '@applozic/core-sdk';
import { Avatar, HStack, Input, Tag, Text, VStack } from '@chakra-ui/react';
import { SmallAddIcon } from '@chakra-ui/icons';

const GroupMemberItem = ({
  isAdmin,
  user
}: {
  isAdmin: boolean;
  user: User;
}) => {
  // const { data: user } = useGetUserInfo(memberId, true);
  return (
    <HStack width="full">
      <Avatar src={user?.imageLink} name={user ? getNameFromUser(user) : ''} />
      <Text>{user ? getNameFromUser(user) : ''}</Text>
      {isAdmin && <Tag>Admin</Tag>}
    </HStack>
  );
};

function GroupMembers({
  isAdmin,
  group,
  members,
  addNewMember
}: {
  isAdmin: boolean;
  group?: Group;
  members?: User[];
  addNewMember: () => void | Promise<void>;
}) {
  let showAddMember = false;
  group?.type === GroupTypes.PUBLIC && isAdmin && (showAddMember = true);
  group?.type === GroupTypes.PRIVATE && (showAddMember = false);
  group?.type === GroupTypes.OPEN && (showAddMember = true);
  return (
    <VStack width="full">
      <HStack width="full" justifyContent="space-between">
        <Text color="textHeader.500" fontWeight="400" fontSize="14px">
          {group?.userCount as number} Members
        </Text>
        {showAddMember && (
          <SmallAddIcon
            color="brand.primary"
            fontWeight="400"
            fontSize="14px"
            onClick={addNewMember}
          >
            Add Member
          </SmallAddIcon>
        )}
      </HStack>
      <VStack width="full">
        {members &&
          members?.map((member, key) => (
            <GroupMemberItem
              key={key}
              isAdmin={member?.userId === group?.adminId}
              user={member}
            />
          ))}
      </VStack>
    </VStack>
  );
}

export default GroupMembers;
