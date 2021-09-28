import path from 'path';

import dotenv from 'dotenv';
const ENV = dotenv.config({
  path: path.join(__dirname, '../../../../.env')
}).parsed;

import { upload } from './uploader';
import {
  listObjectsByPrefix,
  deleteObjectsByPrefix,
  uploadFileToS3
} from './s3';
import { invalidateCloudfront } from './cloudfront';
import { getStorybookHash } from '../utils/storybook';

const uiComponentsPath = path.join(__dirname, '../../../ui-components');

const uploadConfig = {
  bucket: ENV?.S3_BUCKET ?? '',
  prefix: ENV?.DOCS_PREFIX ?? ''
};

const deployStorybook = async () => {
  console.log({ prefix: uploadConfig.prefix, bucket: uploadConfig.bucket });
  const keys = await deleteObjectsByPrefix(
    uploadConfig.bucket,
    uploadConfig.prefix
  );
  if (keys) {
    const keysToInvalidate = keys.map(key => `/${key.replace('js/', '')}`);
    console.log({ keysToInvalidate });
    await invalidateCloudfront(ENV?.WEBSDK_CF_DIST_ID ?? '', keysToInvalidate);
  }
  process.exit(0);
};

deployStorybook();
