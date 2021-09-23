import { chakra, HTMLChakraProps } from "@chakra-ui/react";
import { HTMLMotionProps, motion } from "framer-motion";

export type MotionListItemProps = HTMLChakraProps<"li"> & HTMLMotionProps<"li">;
const MotionListItem = motion<MotionListItemProps>(chakra.li);

export default MotionListItem;
