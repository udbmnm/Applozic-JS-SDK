import React from 'react';
import {
  Box,
  Popover,
  Text,
  PopoverContent,
  PopoverTrigger,
  Center
} from '@chakra-ui/react';
import Icon from '../Icon';
import MotionBox from '../MotionBox';

interface ChevronItem {
  label: string;
  onClick: () => void;
  textColor?: string;
}

export interface ChevronHoverProps {
  color?: string;
  items?: ChevronItem[];
  hovered?: boolean;
}

const ChevronHover = ({
  hovered = true,
  color,
  items = []
}: ChevronHoverProps) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const close = () => setIsOpen(false);

  const chevronOptions = items.map((item, index) => {
    return (
      <Box key={index} style={{ padding: '10px 12px 10px 12px' }}>
        <Text
          color={item.textColor ?? 'textMain.500'}
          size="14px"
          width="100%"
          fontWeight="400"
          lineHeight="18px"
          cursor="pointer"
          onClick={() => {
            item.onClick();
            close();
          }}
          // p="20px"
          // pl="24px"
          // pr="24px"
        >
          {item.label}
        </Text>
      </Box>
    );
  });

  return (
    <Center width="20px" h="20x">
      <Popover
        placement="bottom-start"
        isOpen={isOpen}
        onClose={close}
        returnFocusOnClose={false}
        closeOnBlur={false}
      >
        <PopoverTrigger>
          <Box onClick={toggle} h="20px" cursor="pointer">
            <MotionBox
              h="20px"
              initial="hidden"
              animate={hovered || isOpen ? 'visible' : 'hidden'}
              variants={{
                visible: { visibility: 'visible' },
                hidden: { visibility: 'hidden' }
              }}
            >
              <Icon
                icon={'fill-back-arrow'}
                color={color ?? 'black'}
                size={'11'}
                h="16px"
                style={{ transform: 'rotate(-0.25turn)' }}
                // onClick={() => setViewingInfo(true)}
              />
            </MotionBox>
          </Box>
        </PopoverTrigger>
        <PopoverContent width="auto">
          <Box p="10px" pl="12px" pr="12px">
            {/* <PopoverArrow /> */}
            {chevronOptions}
          </Box>
        </PopoverContent>
      </Popover>
    </Center>
  );
};

export default ChevronHover;
