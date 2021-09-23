import React, { CSSProperties } from 'react';
import {
  Center,
  GridItem,
  Grid,
  Flex,
  Square,
  Text,
  SimpleGrid,
  Image,
  VStack,
  StackDivider,
  Box,
  HStack
} from '@chakra-ui/react';

interface LinkItem {
  metaImage?: string;
  metaTitle?: string;
  metaDescription?: string;
  metaUrl: string;
  url: string;
}

export interface LinksProps {
  links?: LinkItem[];
}

const Links = ({ links }: LinksProps) => {
  const linksList = (links ?? []).map((link, key) => {
    return (
      <VStack
        key={key}
        align="stretch"
        w="100%"
        bg="accent.500"
        spacing={0}
        style={{
          borderRadius: '8px',
          color: '#fff',
          padding: '6px'
        }}
      >
        <HStack
          bg="accent.700"
          style={{
            borderRadius: '5px',
            padding: link.metaImage ? '0' : '8px'
          }}
        >
          {link.metaImage && (
            <Square size="92px" roundedTopLeft="10px" roundedBottomLeft="10px">
              <Image borderRadius="5px" boxSize="92px" src={link.metaImage} />
            </Square>
          )}
          <VStack
            align="stretch"
            w="auto"
            spacing={0}
            style={{ maxHeight: '92px', width: '200px' }}
          >
            {link.metaTitle && (
              <Box>
                <Text
                  fontSize="14px"
                  fontWeight="400"
                  lineHeight="16px"
                  color="textLight.900"
                >
                  {link.metaTitle.length > 58 && (
                    <>{link.metaTitle.substr(0, 55)}...</>
                  )}
                  {link.metaTitle.length <= 58 && <>{link.metaTitle}</>}
                </Text>
              </Box>
            )}
            {link.metaDescription && (
              <Box style={{ marginTop: '4px' }}>
                <Text fontSize="11px" lineHeight="13px" color="textLight.500">
                  {link.metaDescription.length > 75 && (
                    <>{link.metaDescription.substr(0, 72)}...</>
                  )}
                  {link.metaDescription.length <= 75 && (
                    <>{link.metaDescription}</>
                  )}
                </Text>
              </Box>
            )}
            <Box style={{ marginTop: '4px' }}>
              <Text
                fontSize="11px"
                fontWeight="400"
                lineHeight="13px"
                color="textLight.900"
              >
                {link.metaUrl}
              </Text>
            </Box>
          </VStack>
        </HStack>
        <Box style={{ marginTop: '3px' }}>
          <Text fontSize="14px" fontWeight="400" color="textLight.900">
            {link.url}
          </Text>
        </Box>
      </VStack>
    );
  });
  return <VStack w="100%">{linksList}</VStack>;
};
export default Links;
