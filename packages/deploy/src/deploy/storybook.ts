import path from 'path';

import dotenv from 'dotenv';
const ENV = dotenv.config({
  path: path.join(__dirname, '../../../../.env')
}).parsed;

import UploadConfig from '../models/UploadConfig';
import { upload } from '../lib/uploader';
import { listObjectsByPrefix, deleteObjects, uploadFileToS3 } from '../lib/s3';
import { invalidateCloudfront } from '../lib/cloudfront';
import { getStorybookHash } from '../utils/storybook';

const uiComponentsPath = path.join(__dirname, '../../../ui-components');

const uploadConfig: UploadConfig = {
  name: 'storybook',
  path: path.join(uiComponentsPath, 'storybook-build'),
  bucket: ENV?.S3_BUCKET ?? '',
  cfDistributionId: ENV?.STORYBOOK_DIST_ID ?? '',
  prefix: ENV?.STORYBOOK_PREFIX ?? ''
};

const deployStorybook = async () => {
  const hash = await getStorybookHash();
  console.log('\n\nUploading versioned storybook:', hash);
  await upload({
    ...uploadConfig,
    prefix: `${uploadConfig.prefix}/versioned/${hash}/`
  });

  await uploadFileToS3({
    filepath: path.join(uploadConfig.path, 'index.html'),
    bucket: uploadConfig.bucket,
    key: `${uploadConfig.prefix}/versioned/${hash}/`,
    invalidateCF: false
  });
  await uploadFileToS3({
    filepath: path.join(uploadConfig.path, 'index.html'),
    bucket: uploadConfig.bucket,
    key: `${uploadConfig.prefix}/versioned/${hash}`,
    invalidateCF: false
  });

  console.log('Removing old storybook release...');
  const objects = await listObjectsByPrefix(
    uploadConfig.bucket,
    uploadConfig.prefix
  );

  if (objects && objects.Contents) {
    const keys = objects.Contents.map(item => `/${item.Key}`).filter(
      key => !key.startsWith(`/${uploadConfig.prefix}/versioned`)
    );
    if (keys && keys.length) {
      await deleteObjects(uploadConfig.bucket, keys);
      await invalidateCloudfront(uploadConfig.cfDistributionId, keys);
    }
  }

  console.log('Creating new storybook release');
  await upload(uploadConfig);

  process.exit(0);
};

deployStorybook();
