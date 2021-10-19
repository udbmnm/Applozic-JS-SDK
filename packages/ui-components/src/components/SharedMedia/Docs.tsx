import React from 'react';
import { FileMeta } from '@applozic/core-sdk';
import { Text, VStack, Box } from '@chakra-ui/react';
import DocDownloadItem, { VARIANTS } from '../DocDownloadItem';
import { contentTypeToFileType } from '../../utils/file';
export interface DocsProps {
  docs?: FileMeta[];
}

const Docs = ({ docs }: DocsProps) => {
  const docsList = (docs ?? []).map((doc, key) => {
    return (
      <VStack
        key={key}
        align="stretch"
        w="100%"
        bg="accent.500"
        borderRadius="8px"
        padding="6px"
        spacing={0}
      >
        <DocDownloadItem doc={doc} variant={VARIANTS.ACCENTED} />

        <Box style={{ marginLeft: '20px' }} w={'full'}>
          {contentTypeToFileType[doc.contentType] && (
            <Text
              fontSize="10px"
              marginTop="6px"
              fontWeight="300"
              lineHeight="12px"
              w="full"
              wordBreak="break-all"
              color="textLight.900"
            >
              {contentTypeToFileType[doc.contentType]}_file
            </Text>
          )}
        </Box>
      </VStack>
    );
  });
  return <VStack w="100%">{docsList}</VStack>;
};
export default Docs;
