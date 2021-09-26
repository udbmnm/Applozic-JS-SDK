import { createRelease } from '../lib/git';
import { releaseStorybook } from './helpers';

const release = async () => {
  await createRelease('ui-components');
  await releaseStorybook();
  process.exit(0);
};

release();
