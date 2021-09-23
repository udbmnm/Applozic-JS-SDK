import { CloseIcon } from "@chakra-ui/icons";
import {
  HStack,
  VStack,
  Text,
  Avatar,
  Center,
  Divider,
  Box,
  Spinner,
  Spacer,
  Flex,
} from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import Button from "../../Button";
import Input from "../../Input";
import EditableImage from "../../EditableImage";
import MemberList from "../../ChatDetails/GroupMembers/MemberList";
import { User } from "@applozic/core-sdk";
import ScrollArea from "../../ScrollArea";

interface ICreateGroup {
  contacts?: User[];
  onClickCloseCreateGroup: () => void;
  onClickCreateGroup?: (
    groupName: string,
    imageUrl?: string,
    memberIds?: string[]
  ) => void | Promise<void>;
}

function CreateGroup({
  contacts,
  onClickCloseCreateGroup,
  onClickCreateGroup,
}: ICreateGroup) {
  const [groupName, setGroupName] = useState<string | undefined>(undefined);
  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);
  const [selectedUsers, setSelectedUsers] = useState<string[] | undefined>(
    undefined
  );

  return (
    <ScrollArea height="full" width="full" bg="white">
      <VStack height="full" width="full">
        <HStack
          justifyContent="space-between"
          display={"flex"}
          width={"100%"}
          boxShadow={"0px 4px 4px rgba(0, 0, 0, 0.08)"}
          pt={3}
          pb={3}
          pl={6}
          pr={6}
        >
          <Text color="textMain.500">New Group</Text>
          <CloseIcon onClick={() => onClickCloseCreateGroup()} />
        </HStack>
        <VStack spacing={4}>
          <EditableImage
            isEditable={true}
            onFileUploaded={(fileMeta) => setImageUrl(fileMeta.thumbnailUrl)}
          />
          <Input
            placeholder={"Enter Group Name"}
            onChange={(e) => setGroupName(e.target.value)}
          />
          <Divider />
        </VStack>
        <MemberList contacts={contacts} onSelectMembers={setSelectedUsers} />
        <Button
          pos={"absolute"}
          bottom={0}
          w="full"
          borderTopRadius={0}
          bgColor={"primary.500"}
          color={"white"}
          disabled={!groupName}
          label={"Create Group"}
          onClick={() => {
            if (onClickCreateGroup && groupName) {
              onClickCreateGroup(groupName, imageUrl, selectedUsers);
            }
          }}
        />
      </VStack>
    </ScrollArea>
  );
}

export default CreateGroup;
