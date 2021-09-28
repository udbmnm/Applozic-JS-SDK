import { syncS3, UploadConfig } from './s3';

export const upload = (uploadConfig: UploadConfig) => {
  if (!uploadConfig.bucket) {
    throw new Error('Bucket name not found in .env file');
  }
  if (!uploadConfig.prefix) {
    throw new Error(
      `Prefix not found in .env file for package: ${uploadConfig.name}`
    );
  }
  return syncS3(uploadConfig);
};
