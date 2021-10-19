import React from "react";
import { ProvideBase } from "../..";
import { BaseProps } from "../../providers/useBase";

import FullViewWithoutBase, {
  FullViewWithoutBaseProps,
} from "./FullViewWithoutBase";

export interface FullViewProps extends FullViewWithoutBaseProps, BaseProps {}

const FullView = ({
  colorMode,
  useSystemColorMode,
  environment,
  ...rest
}: FullViewProps) => {
  return (
    <ProvideBase
      colorMode={colorMode}
      useSystemColorMode={useSystemColorMode}
      environment={environment}
    >
      <FullViewWithoutBase {...rest} />
    </ProvideBase>
  );
};

export default FullView;
