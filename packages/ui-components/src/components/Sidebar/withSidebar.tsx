import {
  Divider,
  useColorModeValue as mode,
} from "@chakra-ui/react";
import { AnimatePresence } from "framer-motion";
import React from "react";
import { useSidebar } from "../../providers/useSidebar";
import MotionBox from "../MotionBox";
import ScrollArea from "../ScrollArea";
import Search from "./Search";

export interface WithSidebarProps {
  showOverlay?: boolean;
  OverlayComponent?: React.ReactNode;
}

const withSidebar = <P extends object>(
  Component: React.ComponentType<P>
): React.FC<P & WithSidebarProps> => ({
  showOverlay,
  OverlayComponent,
  ...props
}: WithSidebarProps) => {
  const { controls } = useSidebar();
  return (
    <MotionBox
      borderWidth={mode(1, 0)}
      width={"350px"}
      m="0"
      borderColor="#E9E9E9"
      borderRadius={15}
      height="full"
      animate={controls}
      initial="open"
      variants={{ open: { width: "350px" }, closed: { width: "100px" } }}
      transition={{ type: "tween" }}
      backgroundColor={mode("#FFFFFF", "#1B191D")}
    >
      <AnimatePresence>
        {showOverlay && (
          <MotionBox
            width={"full"}
            height="full"
            initial={{ y: "101%", opacity: 0 }}
            transition={{ type: "tween" }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "101%", opacity: 0 }}
          >
            {OverlayComponent}
          </MotionBox>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {!showOverlay && (
          <MotionBox
            paddingX={6}
            paddingTop={6}
            flexFlow="column"
            display={"flex"}
            flex={1}
            height="full"
            width="full"
            initial={{ x: "101%", opacity: 0 }}
            transition={{ type: "tween" }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "101%", opacity: 0 }}
          >
            <Search />
            <Divider mt={1.5} mb={1.5} />

            <ScrollArea width={"full"} hideScrollbar={true} overflowX="hidden">
              <Component {...(props as P)} />
            </ScrollArea>
          </MotionBox>
        )}
      </AnimatePresence>
    </MotionBox>
  );
};

export default withSidebar;
