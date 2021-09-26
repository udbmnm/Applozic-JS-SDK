import path from 'path';

import dotenv from 'dotenv';
const ENV = dotenv.config({
  path: path.join(__dirname, '../../../.env')
}).parsed;

import { uploadFileToS3 } from '../lib/s3';
import { getCurrentPackageVersion } from '../lib/git';
import UploadConfig from '../models/UploadConfig';
import { upload } from '../lib/uploader';

const uploadConfig: UploadConfig = {
  name: 'core-sdk',
  bucket: ENV?.S3_BUCKET ?? '',
  prefix: ENV?.WEBSDK_PREFIX ?? '',
  cfDistributionId: ENV?.WEBSDK_CF_DIST_ID ?? '',
  path: path.join(__dirname, '../../core/dist_web')
};

const coreSDKVersionedUploader = async () => {
  if (!uploadConfig.bucket) {
    throw new Error('Bucket name not found in .env file');
  }
  const version = await getCurrentPackageVersion('core');
  const file = path.join(__dirname, '../../core/dist_web/sdk.js');
  const key = `${uploadConfig.prefix}/versioned/sdk-${version}.js`;
  await uploadFileToS3({
    filepath: file,
    bucket: uploadConfig.bucket,
    key: key,
    invalidateCF: false
  });
  console.log(`\n\nUploaded Versioned file: versioned/sdk-${version}.js\n`);
};

/**
 * Uploads the core-sdk to S3
 * Uploads a versioned file to S3
 */
const deployCoreSDK = async () => {
  await upload(uploadConfig);
  await coreSDKVersionedUploader();
  process.exit(0);
};

deployCoreSDK();
