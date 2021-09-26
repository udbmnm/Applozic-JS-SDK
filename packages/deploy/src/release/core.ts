import { createRelease } from '../lib/git';

const release = async () => {
  await createRelease('core');
  process.exit(0);
};

release();
