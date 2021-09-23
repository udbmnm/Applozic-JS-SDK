import { useState } from 'react';

const globalFetchPromiseMap = new Map<string, Promise<void>>();

export const useFetchThrottle = () => {
  const [fetchPromiseMap, setFetchPromiseMap] = useState(globalFetchPromiseMap);

  const updateFetchPromiseMap = (id: string, promise: Promise<void>) => {
    setFetchPromiseMap(new Map(globalFetchPromiseMap.set(id, promise)));
  };

  const removeFetchPromiseMap = (id: string) => {
    globalFetchPromiseMap.delete(id);
    setFetchPromiseMap(new Map(globalFetchPromiseMap));
  };

  return {
    fetchPromiseMap,
    updateFetchPromiseMap,
    removeFetchPromiseMap
  };
};
