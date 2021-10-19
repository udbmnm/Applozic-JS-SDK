import {
  Center,
  Spinner,
  Avatar,
  IconButton,
  Box,
  Flex
} from '@chakra-ui/react';
import React, { useEffect, useRef, useState } from 'react';
import ApplozicClient from '@applozic/core-sdk';
import FileMeta from '../../models/FileMeta';
import { useApplozicClient } from '../../providers/useApplozicClient';
import Icon from '../Icon';

function EditableImage({
  isEditable = true,
  previewImage,
  onFileUploaded
}: {
  isEditable: boolean;
  previewImage?: string;
  onFileUploaded: (fileMeta: FileMeta) => void | Promise<void>;
}) {
  const [loading, setLoading] = useState(false);
  const [file, setfile] = useState<File | null>(null);
  const [fileMeta, setFileMeta] = useState<FileMeta | null>(null);
  const inputFile = useRef<HTMLInputElement>(null);
  const { client } = useApplozicClient();

  useEffect(() => {
    if (fileMeta) {
      onFileUploaded(fileMeta);
    }
  }, [fileMeta]);
  useEffect(() => {
    const uploadFile = async (client: ApplozicClient, file: File) => {
      const uploadResult = await client.files.upload(file);
      setLoading(false);
      setFileMeta(uploadResult);
    };
    if (client && file) {
      setLoading(true);
      uploadFile(client, file);
    }
  }, [file]);
  // Show file picker on clicking attachmentIcon
  const onButtonClick = () => inputFile?.current && inputFile.current.click();

  return (
    <Center>
      <input
        disabled={!isEditable}
        type="file"
        id="file"
        ref={inputFile}
        style={{ display: 'none' }}
        onChange={e => {
          if (e.target.files && e.target.files.length > 0) {
            setfile(e.target.files[0]);
          }
        }}
      />
      {loading ? (
        <Flex size={'2xl'}>
          <Spinner />
        </Flex>
      ) : (
        <Flex>
          <Avatar
            cursor="pointer"
            loading={'eager'}
            size={'2xl'}
            src={fileMeta?.thumbnailUrl ?? previewImage}
            backgroundColor={'#EBECEC'}
            onClick={isEditable ? onButtonClick : undefined}
          />
          {isEditable && (
            <IconButton
              alignSelf="flex-end"
              justifySelf="flex-end"
              variant="unstyled"
              ml={-4}
              onClick={onButtonClick}
              aria-label="edit image"
              icon={<Icon icon="edit-contact" size={16} />}
            />
          )}
        </Flex>
      )}
    </Center>
  );
}

export default EditableImage;
