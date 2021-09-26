import path from 'path';

import dotenv from 'dotenv';
const ENV = dotenv.config({
  path: path.join(__dirname, '../../../../../.env')
}).parsed;

import UploadConfig from '../models/UploadConfig';
import { upload } from '../lib/uploader';

const uploadConfig: UploadConfig = {
  name: 'storybook',
  path: path.join(__dirname, '../../../../ui-components/storybook-build'),
  bucket: ENV?.S3_BUCKET ?? '',
  cfDistributionId: ENV?.STORYBOOK_DIST_ID ?? '',
  prefix: ENV?.STORYBOOK_PREFIX ?? ''
};

const deployStorybook = async () => {
  // Check file hash
  await upload(uploadConfig);
  process.exit(0);
};

deployStorybook();
