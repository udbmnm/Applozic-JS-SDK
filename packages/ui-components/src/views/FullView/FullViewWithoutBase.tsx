import React from 'react';
import { ProvideApplozicClient } from '../../providers/useApplozicClient';
import { ViewProps } from '../ViewProps';
import FullViewAppWithLogin from './FullViewWithLogin';

const FullViewWithoutBase = ({
  applicationId,
  giphyApiKey,
  gMapsApiKey,
  ...rest
}: ViewProps) => {
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
