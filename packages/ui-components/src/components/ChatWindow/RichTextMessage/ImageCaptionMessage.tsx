import React from 'react';
import { RichTextMetaData } from '@applozic/core-sdk';
import { VStack, Image, Text, SimpleGrid } from '@chakra-ui/react';

import {
  ImageWithCaption,
  getRichTextContentFromMetaData
} from '@applozic/core-sdk';

function ImageCaptionMessage({
  metadata,
  onFileClick
}: {
  metadata: RichTextMetaData;
  onFileClick: () => void;
}) {
  try {
    const { payload } =
      getRichTextContentFromMetaData<ImageWithCaption[]>(metadata);
    return (
      <SimpleGrid columns={payload.length > 1 ? 2 : 1} spacing={2} padding={1}>
        {payload.map(image => (
          <VStack key={image.caption}>
            <Image
              src={image.url}
              width="280px"
              onClick={onFileClick}
              cursor="pointer"
            />
            <Text>{image.caption}</Text>
          </VStack>
        ))}
      </SimpleGrid>
    );
  } catch (e) {
    console.log(e);
    return <div />;
  }
}

export default ImageCaptionMessage;
