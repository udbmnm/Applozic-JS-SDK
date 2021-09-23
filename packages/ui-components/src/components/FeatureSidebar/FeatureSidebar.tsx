import {
  chakra,
  Box,
  TabList,
  TabProps,
  Tabs,
  useStyles,
  useTab,
  VStack,
  Text,
  Divider,
  Avatar,
  useColorModeValue as mode,
} from "@chakra-ui/react";
import React from "react";
import Icon from "../Icon";

export interface IFeatureSidebar {
  onChange: ((index: number) => void) | undefined;
  userName: string;
  userImageUrl?: string;
}

interface IFeatureTab extends TabProps {
  icon?: string;
  imageUrl?: string;
  title: string;
}

function FeatureSidebar({ onChange, userName, userImageUrl }: IFeatureSidebar) {
  const StyledTab = chakra("button", { themeKey: "Tabs.Tab" } as any);
  const CustomTab = ({ icon, title, imageUrl, ...rest }: IFeatureTab) => {
    const tabProps = useTab(rest);
    const isSelected = !!tabProps["aria-selected"];
    const styles = useStyles();
    const activeColor = mode("#FFF", "#FFF");
    const inActiveColor = mode("#6B6776", "#ABABAD");
    return (
      <StyledTab __css={styles.tab} {...tabProps} borderWidth={0}>
        <VStack spacing={0}>
          {icon ? (
            <Box
              backgroundColor={
                isSelected ? "#6139C0" : mode("#E6E4EC", "#4A484B")
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
              size="s"
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
  return (
    <Tabs
      orientation="vertical"
      onChange={onChange}
      overflowY="auto"
      height="full"
      defaultIndex={1}
    >
      <TabList borderWidth={0} overflowY="auto" height="full" width="64px">
        <CustomTab imageUrl={userImageUrl} title={userName} />
        <Divider />
        <CustomTab icon={"chat"} title="Chats" />
        <CustomTab icon={"user"} title="Contacts" />
        <CustomTab icon={"group"} title="Groups" />
      </TabList>
    </Tabs>
  );
}

export default FeatureSidebar;
