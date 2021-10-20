import React from 'react';
import IcoMoon from 'react-icomoon';
import icoMoonConfig from './selection';

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
  return <IcoMoon size={11} {...props} iconSet={icoMoonConfig} />;
};

export default Icon;
