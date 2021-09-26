import { createRelease } from '../lib/git';

const release = async () => {
  await createRelease('ui-components');
  process.exit(0);
};

release();
