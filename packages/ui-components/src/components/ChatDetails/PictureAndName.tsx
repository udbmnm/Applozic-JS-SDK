import { GroupTypes } from '@applozic/core-sdk';
import { Center, Tag, VStack, TagLabel, TagLeftIcon } from '@chakra-ui/react';
import React from 'react';
import EditableImage from '../EditableImage';
import { EditableText } from './EditableText';
import Icon from '../Icon';

export interface GroupType {
  id: GroupTypes;
  name: string;
  icon: string;
}

export interface PictureAndNameProps {
  photoKey: string;
  nameKey: string;
  photoUrl?: string;
  name: string;
  isBlocked?: boolean;
  onUpdateValue: (
    key: string,
    value: string | undefined
  ) => void | Promise<void>;
  isEditable: boolean;
  groupType?: GroupType | undefined;
}

const PictureAndName = ({
  photoKey,
  nameKey,
  photoUrl,
  name,
  isBlocked,
  onUpdateValue,
  isEditable,
  groupType
}: PictureAndNameProps) => {
  return (
    <Center width="100%" minWidth="200px" mt={3} align="stretch">
      <VStack width="100%" spacing={4}>
        <EditableImage
          isEditable={isEditable}
          previewImage={photoUrl}
          onFileUploaded={fileMeta =>
            onUpdateValue(photoKey, fileMeta.thumbnailUrl)
          }
        />
        <EditableText
          disabled={!isEditable}
          defaultValue={name}
          onSubmit={nextValue => {
            onUpdateValue(nameKey, nextValue);
          }}
        />
        {isBlocked && (
          <Tag size={'md'} variant="solid" colorScheme="red">
            Blocked by you
          </Tag>
        )}
        {groupType && (
          <Tag size={'sm'} variant="subtle" backgroundColor="brand.secondary">
            <TagLeftIcon>
              <Icon icon={groupType.icon} color="white" />
            </TagLeftIcon>
            <TagLabel color="white">{groupType.name} Group</TagLabel>
          </Tag>
        )}
      </VStack>
    </Center>
  );
};

export default PictureAndName;
