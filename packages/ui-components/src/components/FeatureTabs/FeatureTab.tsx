import {
  chakra,
  Box,
  TabProps,
  useStyles,
  useTab,
  VStack,
  Text,
  Avatar,
  useColorModeValue as mode,
  ChakraComponent
} from '@chakra-ui/react';
import React from 'react';
import Icon from '../Icon';

interface FeatureTabProps extends TabProps {
  StyledTab: ChakraComponent<'button', any>;
  icon?: string;
  imageUrl?: string;
  title: string;
}

const FeatureTab = ({
  StyledTab,
  icon,
  title,
  imageUrl,
  ...rest
}: FeatureTabProps) => {
  const tabProps = useTab(rest);
  const isSelected = !!tabProps['aria-selected'];
  const styles = useStyles();
  const activeColor = mode('#FFF', '#FFF');
  const inActiveColor = mode('#6B6776', '#ABABAD');
  return (
    <StyledTab
      key={title}
      __css={styles.tab}
      {...tabProps}
      borderWidth={0}
      style={{ width: 64 }}
    >
      <VStack spacing={0}>
        {icon ? (
          <Box
            backgroundColor={
              isSelected ? 'brand.primary' : mode('#E6E4EC', '#4A484B')
            }
            pt={2}
            pb={2}
            pl={3}
            pr={3}
            borderRadius={12}
          >
            <Icon
              icon={icon}
              size={16}
              color={isSelected ? activeColor : inActiveColor}
            />
          </Box>
        ) : (
          <Avatar
            h="40px"
            w="40px"
            borderRadius={12}
            src={imageUrl}
            name={title}
            color={isSelected ? activeColor : inActiveColor}
            bgColor="transparent"
          />
        )}
        <Text
          fontSize="10px"
          lineHeight="20px"
          color="textMain.500"
          mt={0}
          noOfLines={1}
          width={16}
        >
          {title}
        </Text>
      </VStack>
    </StyledTab>
  );
};

export default FeatureTab;
