import { Box, BoxProps, useColorModeValue as mode } from '@chakra-ui/react';
import * as React from 'react';

interface ScrollProps extends BoxProps {
  hideScrollbar?: boolean;
}

const ScrollArea = ({ hideScrollbar, ...rest }: ScrollProps) => (
  <Box
    overflowY="auto"
    // minH="px"
    maxH="full"
    width="100%"
    {...rest}
    sx={{
      '&::-webkit-scrollbar-track': {
        bg: 'transparent'
      },
      '&::-webkit-scrollbar': {
        width: hideScrollbar ? 0 : '4px'
      },
      '&::-webkit-scrollbar-thumb': {
        bg: mode('pane.light', 'pane.dark'),
        borderRadius: '20px'
      }
    }}
  />
);
export default ScrollArea;
