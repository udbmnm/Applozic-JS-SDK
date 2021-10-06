import React from "react";
import { ProvideApplozicClient } from "../../providers/useApplozicClient";
import FullViewAppWithLogin, {
  FullViewWithLoginProps,
} from "./FullViewWithLogin";

export interface FullViewProps extends FullViewWithLoginProps {
  /**
   * The colorMode of the UI Application
   */
  colorMode?: "light" | "dark";
  /**
   * Decide if the user's system color mode is being used fo the Application UI
   */
  useSystemColorMode?: boolean;
}

const FullView = ({
  applicationId,
  colorMode = "light",
  useSystemColorMode = false,
  ...rest
}: FullViewProps) => {
  return (
    <ProvideApplozicClient
      applicationId={applicationId}
      colorMode={colorMode}
      useSystemColorMode={useSystemColorMode}
    >
      <FullViewAppWithLogin applicationId={applicationId} {...rest} />
    </ProvideApplozicClient>
  );
};

export default FullView;
