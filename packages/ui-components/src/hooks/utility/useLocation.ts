import { useState } from 'react';

interface IUseLocation {
  position: GeolocationPosition | undefined;
  positionError: GeolocationPositionError | undefined;
  getCurrentPosition: () => void;
  clearPositionError: () => void;
}

const useLocation = (): IUseLocation => {
  const [positionError, setPositionError] = useState<
    GeolocationPositionError | undefined
  >();
  const [position, setPosition] = useState<GeolocationPosition | undefined>();

  const getCurrentPosition = () => {
    navigator.geolocation.getCurrentPosition(setPosition, error => {
      console.error(error);
      setPositionError(error);
    });
  };

  return {
    position,
    positionError,
    clearPositionError: () => setPositionError(undefined),
    getCurrentPosition
  };
};

export default useLocation;
