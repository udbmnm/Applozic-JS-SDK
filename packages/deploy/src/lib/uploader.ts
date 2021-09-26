import { syncS3 } from './s3';
import UploadConfig from '../models/UploadConfig';

export const upload = (uploadConfig: UploadConfig) => {
  if (!uploadConfig.bucket) {
    throw new Error('Bucket name not found in .env file');
  }
  if (!uploadConfig.prefix) {
    throw new Error(
      `Prefix not found in .env file for package: ${uploadConfig.name}`
    );
  }
  return syncS3(
    uploadConfig.bucket,
    uploadConfig.path,
    uploadConfig.prefix,
    uploadConfig.cfDistributionId
  );
};
