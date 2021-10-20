import { CloseIcon } from '@chakra-ui/icons';
import {
  HStack,
  VStack,
  Text,
  Avatar,
  Center,
  Divider,
  Box,
  Spinner
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { useApplozicClient } from '../../../providers/useApplozicClient';
import Button from '../../Button';
import Input from '../../Input';

interface ICreateContact {
  onClickCloseCreateContact: () => void;
  onClickCreateContact?: (contactName: string) => void | Promise<void>;
}

function CreateContact({
  onClickCloseCreateContact,
  onClickCreateContact
}: ICreateContact) {
  const [contactName, setContactName] = useState<string | undefined>(undefined);

  return (
    <VStack>
      <HStack
        justifyContent="space-between"
        display={'flex'}
        width={'100%'}
        flex={1}
        boxShadow={'0px 4px 4px rgba(0, 0, 0, 0.08)'}
        pt={3}
        pb={3}
        pl={6}
        pr={6}
      >
        <Text color="textMain.500">New Contact</Text>
        <CloseIcon onClick={() => onClickCloseCreateContact()} />
      </HStack>
      <Box p={3}>
        <Input
          width={'full'}
          placeholder={'Enter Contact Name'}
          onChange={e => setContactName(e.target.value)}
        />
      </Box>
      <Button
        pos={'absolute'}
        bottom={0}
        w="full"
        borderTopRadius={0}
        borderBottomRadius={10}
        bgColor={'primary.500'}
        color={'white'}
        disabled={!contactName}
        label={'Create Contact'}
        onClick={() => {
          if (onClickCreateContact && contactName) {
            onClickCreateContact(contactName);
          }
        }}
      />
    </VStack>
  );
}

export default CreateContact;
