import { Center, Tag, VStack } from '@chakra-ui/react';
import React from 'react';
import EditableImage from '../EditableImage';
import { EditableText } from './EditableText';

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
}

const PictureAndName = ({
  photoKey,
  nameKey,
  photoUrl,
  name,
  isBlocked,
  onUpdateValue,
  isEditable
}: PictureAndNameProps) => {
  return (
    <VStack width="100%" minWidth="200px" spacing={4} align="stretch">
      <EditableImage
        isEditable={isEditable}
        previewImage={photoUrl}
        onFileUploaded={fileMeta =>
          onUpdateValue(photoKey, fileMeta.thumbnailUrl)
        }
      />
      <Center width="100%" style={{ marginTop: '20px' }}>
        <EditableText
          disabled={!isEditable}
          defaultValue={name}
          onSubmit={nextValue => {
            onUpdateValue(nameKey, nextValue);
          }}
        />
      </Center>
      {isBlocked && (
        <Center width="100%" mt={3}>
          <Tag size={'md'} variant="solid" colorScheme="red">
            Blocked by you
          </Tag>
        </Center>
      )}
    </VStack>
  );
};

export default PictureAndName;
