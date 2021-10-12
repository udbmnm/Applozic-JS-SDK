import React from "react";
import { ProvideApplozicClient } from "../../providers/useApplozicClient";
import FullViewAppWithLogin, {
  FullViewWithLoginProps,
} from "./FullViewWithLogin";

export interface FullViewProps extends FullViewWithLoginProps {
  /**
   * The Applozic Application ID as provided after onboarding
   */
  applicationId: string;
  /**
   * The colorMode of the UI Application
   */
  colorMode?: "light" | "dark";
  /**
   * Decide if the user's system color mode is being used fo the Application UI
   */
  useSystemColorMode?: boolean;
  /** GIPHY API Key */
  giphyApiKey?: string;
  /** Google Maps API Key */
  gMapsApiKey?: string;
}

const FullView = ({
  applicationId,
  colorMode = "light",
  useSystemColorMode = false,
  giphyApiKey,
  gMapsApiKey,
  ...rest
}: FullViewProps) => {
  return (
    <ProvideApplozicClient
      applicationId={applicationId}
      colorMode={colorMode}
      useSystemColorMode={useSystemColorMode}
      giphyApiKey={giphyApiKey}
      gMapsApiKey={gMapsApiKey}
    >
      <FullViewAppWithLogin {...rest} />
    </ProvideApplozicClient>
  );
};

export default FullView;
