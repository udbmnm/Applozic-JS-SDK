import React from 'react';
import { createIcon } from '@chakra-ui/react';

export const StopIcon = createIcon({
  displayName: 'StopIcon',
  viewBox: '0 0 16 16',
  path: (
    <>
      <path
        fill="currentColor"
        d="M8 1.455a6.545 6.545 0 100 13.09 6.545 6.545 0 000-13.09zM0 8a8 8 0 1116 0A8 8 0 010 8z"
      />
      <path
        fill="currentColor"
        d="M2.545 12.546l10-10 1.029 1.028-10 10-1.029-1.028z"
      />
    </>
  )
});
