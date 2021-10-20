import React, { CSSProperties } from 'react';
import {
  Flex,
  Box,
  Spacer,
  Grid,
  Center,
  Image,
  Link,
  VStack,
  GridItem,
  Text,
  HStack,
  Tabs,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  useStyles,
  useTab,
  chakra,
  TabProps
} from '@chakra-ui/react';
import Photos, { PhotosProps } from './Photos';
import Links, { LinksProps } from './Links';
import Docs, { DocsProps } from './Docs';
import ScrollArea from '../ScrollArea';
import Icon from '../Icon';
import { AnimatePresence } from 'framer-motion';

export interface ISharedMedia {
  defaultTab?: TABS;
  photosProps?: PhotosProps;
  docsProps?: DocsProps;
  linksProps?: LinksProps;
}

export interface ISharedMediaView extends ISharedMedia {
  isFullView: boolean;
  toggleFullView?: () => void;
}

export enum TABS {
  PHOTOS = 'photos',
  LINKS = 'links',
  DOCS = 'docs'
}

interface IMediaTab extends TabProps {
  title: string;
}

const SharedMedia = ({
  defaultTab,
  photosProps,
  // linksProps,
  docsProps,
  isFullView,
  toggleFullView,
  ...rest
}: ISharedMediaView) => {
  const empty =
    photosProps?.photosList &&
    photosProps?.photosList?.length > 0 &&
    docsProps?.docs &&
    docsProps.docs.length > 0;
  return (
    <VStack width="full">
      <AnimatePresence>
        {isFullView ? (
          <HStack
            justifyContent="space-between"
            width={'full'}
            boxShadow={'0px 4px 4px rgba(0, 0, 0, 0.08)'}
            pt={3}
            pb={3}
            pl={6}
            pr={6}
          >
            <Text color="textMain.500">Shared Media</Text>
            <Icon icon="close" onClick={toggleFullView} />
          </HStack>
        ) : (
          <HStack width="full" justifyContent="space-between">
            <Text color="textHeader.500" fontWeight="400" fontSize="14px">
              Shared Media
            </Text>
            {empty && (
              <Text
                color="textAccent.500"
                fontWeight="400"
                fontSize="14px"
                onClick={toggleFullView}
              >
                View All
              </Text>
            )}
          </HStack>
        )}
      </AnimatePresence>

      <Tabs variant="unstyled" width={'full'}>
        <TabList
          backgroundColor={'#ebebec'}
          padding="4px"
          borderRadius="5px"
          justifyContent="space-between"
        >
          <Tab
            borderRadius="5px"
            flex={1}
            fontWeight={'400'}
            bg="transparent"
            color={'textMain.300'}
            padding={1}
            fontSize={'13px'}
            _selected={{
              color: 'textMain.500',
              bg: 'white',
              fontWeight: '500'
            }}
          >
            Photos
          </Tab>
          <Tab
            borderRadius="5px"
            fontWeight={'400'}
            flex={1}
            bg="transparent"
            color={'textMain.300'}
            padding={1}
            fontSize={'13px'}
            _selected={{
              color: 'textMain.500',
              bg: 'white',
              fontWeight: '500'
            }}
          >
            Documents
          </Tab>
        </TabList>
        <ScrollArea width="full">
          <TabPanels maxHeight={isFullView ? 'full' : '250px'} minW="300px">
            <TabPanel>
              <Photos
                photosList={photosProps?.photosList}
                onPhotoClick={photosProps?.onPhotoClick}
              />
            </TabPanel>
            <TabPanel>
              <Docs docs={docsProps?.docs} />
            </TabPanel>
          </TabPanels>
        </ScrollArea>
      </Tabs>
    </VStack>
  );
};

export default SharedMedia;
