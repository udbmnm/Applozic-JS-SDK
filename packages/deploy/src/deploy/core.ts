import path from 'path';

import dotenv from 'dotenv';
const ENV = dotenv.config({
  path: path.join(__dirname, '../../../../.env')
}).parsed;

console.log({ ENV, pa: path.join(__dirname, '../../../.env') });

import {
  uploadFileToS3,
  uploadStringAsFileToS3,
  UploadConfig
} from '../lib/s3';
import { getCurrentPackageVersion } from '../lib/git';
import { upload } from '../lib/uploader';
import { readFileString } from '../lib/file';
import ejs from 'ejs';
import { invalidateCloudfront } from '../lib/cloudfront';
import { replaceAll } from '../utils/string-helper';

const version = getCurrentPackageVersion('core');

const uploadConfig: UploadConfig = {
  name: 'core-sdk',
  bucket: ENV?.S3_BUCKET ?? '',
  prefix: ENV?.WEBSDK_PREFIX ?? '',
  cfDistributionId: ENV?.WEBSDK_CF_DIST_ID ?? '',
  directory: path.join(__dirname, '../../../core/dist_web')
};

const uploadDocsConfig: UploadConfig = {
  name: 'core-sdk-docs',
  bucket: ENV?.S3_BUCKET ?? '',
  prefix: `${ENV?.DOCS_PREFIX ?? ''}/latest`,
  cfPrefix: `${ENV?.DOCS_CF_PREFIX ?? ''}/latest`,
  cfDistributionId: ENV?.WEBSDK_CF_DIST_ID ?? '',
  directory: path.join(__dirname, '../../../core/docs')
};

const uploadDocsVersionedConfig: UploadConfig = {
  name: 'core-sdk-docs',
  bucket: ENV?.S3_BUCKET ?? '',
  prefix: `${ENV?.DOCS_PREFIX ?? ''}/v${version}`,
  cfPrefix: `${ENV?.DOCS_CF_PREFIX ?? ''}/v${version}`,
  cfDistributionId: ENV?.WEBSDK_CF_DIST_ID ?? '',
  directory: path.join(__dirname, '../../../core/docs')
};

const coreSDKVersionedUploader = async () => {
  if (!uploadConfig.bucket) {
    throw new Error('Bucket name not found in .env file');
  }

  const file = path.join(__dirname, '../../../core/dist_web/sdk.js');
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
  await upload(uploadDocsConfig);
  await upload(uploadDocsVersionedConfig);
  const redirectPage = await readFileString(
    path.join(__dirname, '../lib/redirect.ejs')
  );
  await uploadStringAsFileToS3({
    body: ejs.render(redirectPage, {
      redirectUrlPath: `${uploadDocsConfig.cfPrefix}/`
    }),
    bucket: uploadConfig.bucket,
    key: `${uploadDocsConfig.prefix}`,
    ACL: 'public-read',
    contentType: 'text/html'
  });

  await uploadStringAsFileToS3({
    body: ejs.render(redirectPage, {
      redirectUrlPath: `${uploadDocsVersionedConfig.cfPrefix}}/`
    }),
    bucket: uploadDocsVersionedConfig.bucket,
    key: `${uploadDocsVersionedConfig.prefix}`,
    ACL: 'public-read',
    contentType: 'text/html'
  });
  if (uploadConfig.cfDistributionId) {
    await invalidateCloudfront(uploadConfig.cfDistributionId, [
      `${uploadDocsConfig.cfPrefix}/`,
      `${uploadDocsConfig.cfPrefix}`,
      `${uploadDocsVersionedConfig.cfPrefix}/`,
      `${uploadDocsVersionedConfig.cfPrefix}`
    ]);
  }
  process.exit(0);
};

deployCoreSDK();
