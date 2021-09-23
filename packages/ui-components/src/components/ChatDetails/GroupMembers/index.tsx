import React from "react";
import { getNameFromUser, User } from "@applozic/core-sdk";
import { Avatar, HStack, Input, Tag, Text, VStack } from "@chakra-ui/react";
import { SmallAddIcon } from "@chakra-ui/icons";

const GroupMemberItem = ({
  isAdmin,
  user,
}: {
  isAdmin: boolean;
  user: User;
}) => {
  // const { data: user } = useGetUserInfo(memberId, true);
  return (
    <HStack width="full">
      <Avatar src={user?.imageLink} name={user ? getNameFromUser(user) : ""} />
      <Text>{user ? getNameFromUser(user) : ""}</Text>
      {isAdmin && <Tag>Admin</Tag>}
    </HStack>
  );
};

function GroupMembers({
  adminId,
  members,
  numberOfMembers,
  addNewMember,
}: {
  adminId?: string;
  numberOfMembers?: number;
  members?: User[];
  addNewMember: () => void | Promise<void>;
}) {
  console.log({ members });
  return (
    <VStack width="full">
      <HStack width="full" justifyContent="space-between">
        <Text color="textHeader.500" fontWeight="400" fontSize="14px">
          {numberOfMembers as number} Members
        </Text>
        <SmallAddIcon
          color="textAccent.500"
          fontWeight="400"
          fontSize="14px"
          onClick={addNewMember}
        >
          Add Member
        </SmallAddIcon>
      </HStack>
      <VStack width="full">
        {members &&
          members?.map((member) => (
            <GroupMemberItem
              isAdmin={member?.userId === adminId}
              user={member}
            />
          ))}
      </VStack>
    </VStack>
  );
}

export default GroupMembers;
