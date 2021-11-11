import { Box, Center, Flex, Image, Text } from '@chakra-ui/react';
import React from 'react';
import Icon from '../Icon';

export enum BOTTOM_CATEGORIES {
  RECENT = 'recent',
  SMILEYS = 'smileys',
  GIF = 'gif'
}

type BOTTOM_CATEGORY_TYPE =
  | BOTTOM_CATEGORIES.RECENT
  | BOTTOM_CATEGORIES.SMILEYS
  | BOTTOM_CATEGORIES.GIF;

interface BottomCategeoryTabsProps {
  categories: BOTTOM_CATEGORIES[];
  activeCategory: BOTTOM_CATEGORY_TYPE;
  onCategoryClick: (category: BOTTOM_CATEGORY_TYPE) => void | Promise<void>;
}

const GetCategoryBox = ({
  category,
  activeCategory,
  onClick
}: {
  category: BOTTOM_CATEGORY_TYPE;
  activeCategory: BOTTOM_CATEGORY_TYPE;
  onClick: (category: BOTTOM_CATEGORY_TYPE) => void | Promise<void>;
}) => {
  const isActive = category === activeCategory;
  const icon =
    category === BOTTOM_CATEGORIES.RECENT
      ? 'time'
      : category === BOTTOM_CATEGORIES.GIF
      ? 'gif'
      : 'emoji';
  return (
    <Box
      flex="1"
      borderRadius="4px"
      cursor="pointer"
      bg={isActive ? 'brand.primary' : 'white'}
      onClick={() => onClick(category)}
      style={{ height: '32px' }}
    >
      <Center h="100%">
        <Icon
          icon={icon}
          size={category === BOTTOM_CATEGORIES.GIF ? 22 : 18}
          color={isActive ? 'white' : 'textMain.400'}
        />
      </Center>
    </Box>
  );
};

const BottomCategoryTabs = ({
  categories,
  activeCategory,
  onCategoryClick
}: BottomCategeoryTabsProps) => {
  const categoryBoxes = categories.map((category, key) => {
    return (
      <GetCategoryBox
        key={key}
        category={category}
        activeCategory={activeCategory}
        onClick={onCategoryClick}
      />
    );
  });
  return (
    <Flex width="100%" height="35px">
      {categoryBoxes}
    </Flex>
  );
};

export default BottomCategoryTabs;
