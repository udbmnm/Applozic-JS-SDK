import path from 'path';
import { getDirHash } from '../lib/file';

const uiComponentsPath = path.join(__dirname, '../../../ui-components');

export const getStorybookHash = async () => {
  const excludeFilesAndDirs = [
    'node_modules',
    'dist',
    'storybook-build',
    '.DS_Store'
  ];
  return getDirHash(uiComponentsPath, excludeFilesAndDirs);
};
