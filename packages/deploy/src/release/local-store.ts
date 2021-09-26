import { createRelease } from '../lib/git';

const release = async () => {
  await createRelease('local-store');
  process.exit(0);
};

release();
