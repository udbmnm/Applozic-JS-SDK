import path from 'path';

import dotenv from 'dotenv';
const ENV = dotenv.config({
  path: path.join(__dirname, '../../../.env')
}).parsed;

import AWS from 'aws-sdk';
import { getFiles, readFile, MIME_TYPES } from './file';
import { invalidateCloudfront } from './cloudfront';

const credentials = new AWS.SharedIniFileCredentials({ profile: 'applozic' });
AWS.config.credentials = credentials;
const s3 = new AWS.S3({ region: ENV?.REGION });

interface UploadOptions {
  bucket: string;
  key: string;
  filepath: string;
  invalidateCF: boolean;
  cfDistributionId?: string;
  ACL?: string;
}

export const uploadFileToS3 = async ({
  bucket,
  key,
  filepath,
  ACL,
  invalidateCF,
  cfDistributionId
}: UploadOptions) => {
  const file = await readFile(filepath);
  const extension = filepath.split('.').pop();

  const params = {
    Bucket: bucket,
    Key: key,
    Body: file,
    ContentType: extension
      ? MIME_TYPES[extension] ?? 'text/plain'
      : 'text/plain',
    CacheControl: 'max-age=86400',
    ACL: ACL || 'public-read'
  };
  await s3.putObject(params).promise();
  if (invalidateCF) {
    if (!cfDistributionId) {
      throw new Error('cfDistributionId is required');
    }
    const paths = [`/${key}`];
    await invalidateCloudfront(cfDistributionId, paths);
  }
};

export const listObjectsByPrefix = async (bucket: string, prefix: string) => {
  return s3
    .listObjectsV2({
      Bucket: bucket,
      Prefix: prefix
    })
    .promise();
};

// Delete files with prefix in s3
export const deleteObjectsByPrefix = async (bucket: string, prefix: string) => {
  const data = await listObjectsByPrefix(bucket, prefix);
  if (data && data.Contents) {
    const keys = data.Contents.map(item => item.Key as string);
    if (keys && keys.length) {
      return deleteObjects(bucket, keys);
    }
  }
};

export const deleteObjects = async (bucket: string, keys: string[]) => {
  const deleteParams = {
    Bucket: bucket,
    Delete: {
      Objects: keys.map(key => ({ Key: key }))
    }
  };
  return s3.deleteObjects(deleteParams).promise();
};

// Upload directory to S3
export const syncS3 = async (
  bucket: string,
  directory: string,
  prefix: string,
  cfDistributionId?: string
) => {
  // Get list of files
  const files = await getFiles(directory);

  let count = 1;
  console.log(`Uploading ${directory} to S3...`);
  await Promise.all(
    files.map(async filepath => {
      const key = path.join(prefix, filepath.replace(directory, ''));
      await uploadFileToS3({
        filepath,
        bucket,
        key,
        invalidateCF: false,
        ACL: 'public-read'
      });
      console.log(`\t${count}/${files.length}`, filepath);
      count += 1;
    })
  );

  console.log(`Uploading ${directory} to S3...  done!`);

  // console.log(`\nSynced to S3\n\tDirectory:\t\t${directory}\n`);
  if (cfDistributionId) {
    const paths = files.map(file => file.replace(directory, ''));
    await invalidateCloudfront(cfDistributionId, [
      ...paths,
      '/'
    ]);
  }
};
