import React from 'react';
import IcoMoon from 'react-icomoon';
import icoMoonConfig from './selection';
import { useColorModeValue as mode } from '@chakra-ui/color-mode';

export interface IconProps {
  [name: string]: any;
  iconSet?: any;
  icon: string;
  color?: string | undefined;
  size?: string | number | undefined;
  className?: string | undefined;
  style?: React.CSSProperties | undefined;
}

const Icon = ({ ...props }: IconProps) => {
  return (
    <IcoMoon
      size={11}
      color={mode('icon.light', 'icon.dark')}
      {...props}
      iconSet={icoMoonConfig}
    />
  );
};

export default Icon;
