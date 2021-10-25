import React from 'react';
import { ProvideBase } from '../..';
import { BaseProps } from '../../providers/useBase';
import { ViewProps } from '../ViewProps';

import PluginViewWithoutBase from './PluginViewWithoutBase';

export interface PluginViewProps extends ViewProps, BaseProps {}

const FullView = ({
  colorMode,
  useSystemColorMode,
  environment,
  ...rest
}: PluginViewProps) => {
  return (
    <ProvideBase
      colorMode={colorMode}
      useSystemColorMode={useSystemColorMode}
      environment={environment}
    >
      <PluginViewWithoutBase {...rest} />
    </ProvideBase>
  );
};

export default FullView;
