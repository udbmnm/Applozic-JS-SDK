import { useRadio, UseRadioProps, Box } from '@chakra-ui/react';
import React, { PropsWithChildren } from 'react';

function GroupTypeCard(props: PropsWithChildren<UseRadioProps>) {
  const { getInputProps, getCheckboxProps } = useRadio(props);

  const input = getInputProps();
  const checkbox = getCheckboxProps();

  return (
    <Box as="label">
      <input {...input} />
      <Box
        {...checkbox}
        cursor="pointer"
        borderRadius="md"
        borderWidth="1px"
        _checked={{
          bg: 'brand.primary',
          color: 'white',
          borderColor: 'brand.secondary'
        }}
        _focus={{
          boxShadow: 'outline'
        }}
        px={3}
        py={2}
      >
        {props.children}
      </Box>
    </Box>
  );
}
export default GroupTypeCard;
