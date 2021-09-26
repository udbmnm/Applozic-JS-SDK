// import md5File from 'md5-file';
import { createAndPushTags, checkIfTagExists } from '../lib/git';

const getReadableString = (value: number) => {
  if (value < 10) {
    return `0${value}`;
  }
  return `${value}`;
};

export const releaseStorybook = async () => {
  // Check file hash
  const now = new Date();
  const items = [
    `${now.getFullYear()}`,
    getReadableString(now.getMonth() + 1),
    getReadableString(now.getDate()),
    getReadableString(now.getHours()),
    getReadableString(now.getMinutes()),
    getReadableString(now.getSeconds())
  ];
  const dateString = items.join('');
  const releaseName = `release-storybook-${dateString}`;

  if (await checkIfTagExists(releaseName)) {
    console.log('Storybook with current changes already released');
    process.exit(1);
  }

  const annotation = `storybook release: ${dateString}`;
  await createAndPushTags(releaseName, annotation);
  process.exit(0);
};
