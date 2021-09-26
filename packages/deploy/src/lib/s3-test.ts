import path from 'path';

import dotenv from 'dotenv';
const ENV = dotenv.config({
  path: path.join(__dirname, '../../../../.env')
}).parsed;

import { upload } from './uploader';
import { listObjectsByPrefix, deleteObjectsByPrefix, uploadFileToS3 } from './s3';
import { invalidateCloudfront } from './cloudfront';
import { getStorybookHash } from '../utils/storybook';

const uiComponentsPath = path.join(__dirname, '../../../ui-components');

const uploadConfig = {
  bucket: ENV?.S3_BUCKET ?? '',
  prefix: ENV?.STORYBOOK_PREFIX ?? ''
};

const deployStorybook = async () => {
  await deleteObjectsByPrefix(uploadConfig.bucket, uploadConfig.prefix);
  process.exit(0);
};

deployStorybook();
