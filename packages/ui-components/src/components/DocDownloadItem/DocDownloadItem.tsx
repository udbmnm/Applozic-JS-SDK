import React from 'react';
import {
  Center,
  Square,
  Text,
  Image,
  VStack,
  Box,
  HStack,
  Spacer
} from '@chakra-ui/react';
import { FileMeta } from '@applozic/core-sdk';
import Icon from '../Icon';

const bytesToSize = (bytes: number) => {
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  if (bytes == 0) return '0 Byte';
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return (bytes / Math.pow(1024, i)).toFixed(1) + ' ' + sizes[i];
};

export enum VARIANTS {
  DEFAULT = 'default',
  ACCENTED = 'accented'
}

export interface DocDownloadItem {
  variant: VARIANTS;
  doc: FileMeta;
  width?: number;
  icon?: React.ReactNode;
}

const DocDownloadItem = ({ doc, variant, width, icon }: DocDownloadItem) => {
  return (
    <HStack
      bg={variant === VARIANTS.ACCENTED ? 'accent.700' : '#E3DFE8'}
      style={{
        borderRadius: '5px',
        paddingRight: '8px'
      }}
      width="100%"
    >
      <Square size="48px" roundedTopLeft="10px" roundedBottomLeft="10px">
        <Center roundedTopLeft="10px" roundedBottomLeft="10px">
          <Icon
            color={VARIANTS.ACCENTED ? 'textLight.900' : 'textMain.500'}
            style={{ opacity: 0.7 }}
            icon={'fill-document'}
            size={24}
          />
        </Center>
      </Square>

      <VStack
        align="stretch"
        maxW="62%"
        spacing={0}
        style={{ maxHeight: '92px' }}
      >
        <Text
          maxWidth={'100%'}
          fontSize="14px"
          lineHeight="20px"
          color={
            variant === VARIANTS.ACCENTED ? 'textLight.900' : 'textMain.500'
          }
          isTruncated={true}
          noOfLines={1}
          wordBreak="break-all"
        >
          {doc.name}
        </Text>
        <Text
          fontSize="12px"
          lineHeight="20px"
          color="textLight.500"
          isTruncated={true}
          noOfLines={1}
        >
          {bytesToSize(doc.size)}
        </Text>
      </VStack>

      <Spacer />

      <Square size="30px">
        {/* TODO comlplete the whole icon */}
        {icon && icon}
        {!icon && (
          <Icon
            icon="back-arrow"
            color="white"
            style={{ transform: 'rotate(-0.25turn)' }}
            h="8px"
          />
        )}
      </Square>
    </HStack>
  );
};

export default DocDownloadItem;
