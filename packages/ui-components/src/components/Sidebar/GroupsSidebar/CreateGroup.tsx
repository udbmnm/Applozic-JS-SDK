import { CloseIcon } from '@chakra-ui/icons';
import { HStack, VStack, Text, Divider, useRadioGroup } from '@chakra-ui/react';
import React, { useState } from 'react';
import Button from '../../Button';
import Icon from '../../Icon';
import Input from '../../Input';
import EditableImage from '../../EditableImage';
import MemberList from '../../ChatDetails/GroupMembers/MemberList';
import { GroupTypes, User } from '@applozic/core-sdk';
import ScrollArea from '../../ScrollArea';
import GroupTypeCard from './GroupTypeCard';

export const GroupTypeDetails = [
  { id: GroupTypes.PUBLIC, name: 'Public', icon: 'Language' },
  { id: GroupTypes.PRIVATE, name: 'Private', icon: 'password-lock' },
  { id: GroupTypes.OPEN, name: 'Open', icon: 'group-1' }
];

interface ICreateGroup {
  contacts?: User[];
  onClickCloseCreateGroup: () => void;
  onClickCreateGroup?: (
    groupName: string,
    groupType: GroupTypes,
    imageUrl?: string,
    memberIds?: string[]
  ) => void | Promise<void>;
}

function CreateGroup({
  contacts,
  onClickCloseCreateGroup,
  onClickCreateGroup
}: ICreateGroup) {
  const [groupName, setGroupName] = useState<string | undefined>(undefined);
  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);
  const [selectedUsers, setSelectedUsers] = useState<string[] | undefined>(
    undefined
  );
  const [groupType, setGroupType] = useState<string>(
    GroupTypes.PRIVATE.toString()
  );

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: 'group-type',
    defaultValue: GroupTypes.PRIVATE.toString(),
    onChange: setGroupType
  });

  const group = getRootProps();

  return (
    <ScrollArea height="full" width="full">
      <VStack height="full" width="full">
        <HStack
          justifyContent="space-between"
          display={'flex'}
          width={'100%'}
          boxShadow={'0px 4px 4px rgba(0, 0, 0, 0.08)'}
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
            onFileUploaded={fileMeta => setImageUrl(fileMeta.thumbnailUrl)}
          />
          <Input
            placeholder={'Enter Group Name'}
            onChange={e => setGroupName(e.target.value)}
          />
          <HStack {...group}>
            {GroupTypeDetails.map(value => {
              const radio = getRadioProps({ value: value.id.toString() });
              return (
                <GroupTypeCard key={value.id.toString()} {...radio}>
                  <HStack>
                    <Icon
                      icon={value.icon}
                      color={
                        groupType.toString() === value.id.toString()
                          ? 'white'
                          : 'text.500'
                      }
                    />
                    <Text
                      color={
                        groupType.toString() === value.id.toString()
                          ? 'white'
                          : 'text.500'
                      }
                    >
                      {value.name}
                    </Text>
                  </HStack>
                </GroupTypeCard>
              );
            })}
          </HStack>
          <Divider />
        </VStack>
        <MemberList contacts={contacts} onSelectMembers={setSelectedUsers} />
        <Button
          pos={'absolute'}
          bottom={0}
          w="full"
          borderTopRadius={0}
          bgColor={'brand.primary'}
          color={'white'}
          disabled={!groupName}
          label={'Create Group'}
          onClick={() => {
            if (onClickCreateGroup && groupName) {
              onClickCreateGroup(
                groupName,
                parseInt(groupType, 10) as GroupTypes,
                imageUrl,
                selectedUsers
              );
            }
          }}
        />
      </VStack>
    </ScrollArea>
  );
}

export default CreateGroup;
