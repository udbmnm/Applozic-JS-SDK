import React from 'react';
import { ProvideBase } from '../..';
import { BaseProps } from '../../providers/useBase';

import PluginViewWithoutBase, {
  PluginViewWithoutBaseProps
} from './PluginViewWithoutBase';

export interface PluginViewProps
  extends PluginViewWithoutBaseProps,
    BaseProps {}

const PluginView = ({
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

export default PluginView;
