import React from "react";
import { ProvideApplozicClient } from "../../providers/useApplozicClient";
import FullViewAppWithLogin, {
  FullViewWithLoginProps,
} from "./FullViewWithLogin";

export interface FullViewWithoutBaseProps extends FullViewWithLoginProps {
  /**
   * The Applozic Application ID as provided after onboarding
   */
  applicationId: string;
  /** GIPHY API Key */
  giphyApiKey?: string;
  /** Google Maps API Key */
  gMapsApiKey?: string;
}

const FullViewWithoutBase = ({
  applicationId,
  giphyApiKey,
  gMapsApiKey,
  ...rest
}: FullViewWithoutBaseProps) => {
  return (
    <ProvideApplozicClient
      applicationId={applicationId}
      giphyApiKey={giphyApiKey}
      gMapsApiKey={gMapsApiKey}
    >
      <FullViewAppWithLogin {...rest} />
    </ProvideApplozicClient>
  );
};

export default FullViewWithoutBase;
