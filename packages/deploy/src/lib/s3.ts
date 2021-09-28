import path from 'path';
import fs from 'fs';

import ejs from 'ejs';
import dotenv from 'dotenv';
const ENV = dotenv.config({
  path: path.join(__dirname, '../../../.env')
}).parsed;

import AWS from 'aws-sdk';
import { getFiles, readFileString, readFileBuffer, MIME_TYPES } from './file';
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

export const uploadStringAsFileToS3 = async ({
  bucket,
  key,
  body,
  contentType,
  ACL
}: {
  bucket: string;
  key: string;
  body: string;
  contentType: string;
  ACL?: string;
}) => {
  const params = {
    Bucket: bucket,
    Key: key,
    Body: body,
    ContentType: contentType,
    CacheControl: 'max-age=86400',
    ACL: ACL || 'public-read'
  };
  try {
    return await s3.putObject({ ...params }).promise();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const uploadBufferAsFileToS3 = async ({
  bucket,
  key,
  body,
  contentType,
  ACL
}: {
  bucket: string;
  key: string;
  body: Buffer;
  contentType: string;
  ACL?: string;
}) => {
  const params = {
    Bucket: bucket,
    Key: key,
    Body: body,
    ContentType: contentType,
    CacheControl: 'max-age=86400',
    ACL: ACL || 'public-read'
  };
  try {
    return await s3.putObject({ ...params }).promise();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export interface UploadConfig {
  name: string;
  bucket: string;
  directory: string;
  prefix: string;
  cfDistributionId?: string;
  cfPrefix?: string;
}

export const uploadFileToS3 = async ({
  bucket,
  key,
  filepath,
  ACL,
  invalidateCF,
  cfDistributionId
}: UploadOptions) => {
  const extension = filepath.split('.').pop();
  const contentType = extension
    ? MIME_TYPES[extension] ?? 'text/plain'
    : 'text/plain';

  if (contentType.indexOf('image/') >= 0) {
    const file = await readFileBuffer(filepath);
    await uploadBufferAsFileToS3({
      bucket,
      key,
      body: file,
      contentType: contentType
    });
  } else {
    const file = await readFileString(filepath);
    await uploadStringAsFileToS3({
      bucket,
      key,
      body: file,
      contentType: contentType
    });
  }

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
      await deleteObjects(bucket, keys);
      return keys;
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
export const syncS3 = async ({
  bucket,
  directory,
  prefix,
  cfDistributionId,
  cfPrefix
}: UploadConfig) => {
  // Get list of files
  const files = (await getFiles(directory)).filter(file =>
    fs.lstatSync(file).isFile()
  );

  let count = 1;
  console.log(`Uploading ${directory} to S3...`);
  await Promise.all(
    files.map(async filepath => {
      let key = path.join(prefix, filepath.replace(directory, ''));

      const check = setTimeout(() => {
        console.log({ filepath });
      }, 5000);
      await uploadFileToS3({
        filepath,
        bucket,
        key,
        invalidateCF: false,
        ACL: 'public-read'
      });
      clearTimeout(check);
      console.log(`\t${count}/${files.length}`, filepath);
      count += 1;
    })
  );
  if (fs.existsSync(path.join(directory, 'index.html'))) {
    await uploadFileToS3({
      filepath: path.join(directory, 'index.html'),
      bucket,
      key: `${prefix}/`,
      invalidateCF: false,
      ACL: 'public-read'
    });
  }

  console.log(`Uploading ${directory} to S3...  done!`);

  // console.log(`\nSynced to S3\n\tDirectory:\t\t${directory}\n`);
  if (cfDistributionId) {
    const paths = files.map(file => file.replace(directory, ''));
    await invalidateCloudfront(cfDistributionId, [
      ...paths.map(path => `${cfPrefix ?? ''}${path}`),
      `/${prefix}/`,
      `/${prefix}`
    ]);
  }
};
