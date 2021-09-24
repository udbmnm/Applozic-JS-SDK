const path = require('path');

const dotenv = require('dotenv');
const ENV = dotenv.config({
  path: path.join(__dirname, '../.env')
}).parsed;

const defaultE = require('./sync-s3');

const uploadWebsdk = async () => {
  const buildDir = path.join(__dirname, '../../core/dist_web');
  const bucket = ENV.S3_BUCKET;
  const prefix = ENV.WEBSDK_PREFIX;
  console.log('Uploading websdk to s3', buildDir);
  await defaultE.syncS3(bucket, buildDir, prefix);
  //   await defaultE.invalidateCloudfront(ENV.WEBSDK_CF_DIST_ID, keys);
};

const deleteStorybook = async () => {
  const bucket = ENV.S3_BUCKET;
  const prefix = ENV.STORYBOOK_PREFIX;
  console.log('Deleting storybook from s3', bucket, prefix);
  await defaultE.deleteS3(bucket, prefix);
};

const uploadStorybook = async () => {
  const buildDir = path.join(__dirname, '../../ui-components/storybook-build');
  const bucket = ENV.S3_BUCKET;
  const prefix = ENV.STORYBOOK_PREFIX;
  console.log('Uploading storybook to s3', buildDir);
  await defaultE.syncS3(bucket, buildDir, prefix);
  //   await defaultE.invalidateCloudfront(ENV.WEBSDK_CF_DIST_ID, keys);
};

const main = async () => {
  await uploadWebsdk();
  await deleteStorybook();
  await uploadStorybook();
};

try {
  main();
} catch (e) {
  console.log(e);
}
